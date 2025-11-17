import GlobalConfig from "../common/GlobalConfig";
import { Singleton } from "../common/Singleton";
import { WebSocketUtil } from "./WebSocketUtil";
import { GridManager } from "../managers/GridManager";
import proto from "./MLWZ_msg.js";
import { loginByToken, getdetailSlot } from "./request";
import { EventManager, E_GAME_EVENT } from "../managers/EventManager";
import { UItools } from "../Tools/UItools";
import { LogicTools } from "../Tools/LogicTools";

export const enum E_GAME_SCENE_TYPE {
    NORMAL = 1,
    FREE_GAME = 2,
}

export const enum E_GAME_MULTIPLE_TYPE {
    IS_MULTIPLE = 1,
    NOT_MULTIPLE = 2,
}

export class SocketManager extends Singleton {
    Successful_none = proto.newxxs.enErrType_Moro.NoneErr;
    Successful_20000 = proto.newxxs.enErrType_Moro.Successful_20000;

    public CurScene: proto.newxxs.ICurScene = null;

    /** 初始化并自动登录 */
    public async Init(username: string, password: string): Promise<void> {
        try {
            const res = await loginByToken({ username, password });
            if (res.code !== 200) throw new Error("登录失败");

            GlobalConfig.token = res.data.authorization;
            GlobalConfig.user.identify = res.data.authorization;

            const data = await getdetailSlot({
                token: GlobalConfig.token,
                roomid: GlobalConfig.roomId,
            });

            if (data.data?.state) {
                GlobalConfig.webScoketUrl = data.data.socketurl;
                GlobalConfig.ptype = data.data.ptype;
                LogicTools.myConsole("连接地址:", GlobalConfig.webScoketUrl);

                WebSocketUtil.GetInstance().Init(GlobalConfig.webScoketUrl, this.initBack.bind(this));
                this.bindEvent();
            }
        } catch (e) {
            console.error("SocketManager.Init() 失败:", e);
            UItools.GetInstance().ShowLoadErrorTips();
        }
    }

    /** WebSocket 已连接成功 */
    private initBack(): void {
        LogicTools.myConsole("WebSocket connected, start login");
        this.scoketLogin();
    }

    /** WebSocket 关闭 */
    private oncloseBack(): void {
        console.warn("WebSocket 已关闭");
        WebSocketUtil.GetInstance().stopHeart();
    }

    /** 发送心跳 */
    private sendHeart(): void {
        const req = new proto.newxxs.C2S_BeatTime_10000();
        req.identify = GlobalConfig.user.identify;
        const buffer = proto.newxxs.C2S_BeatTime_10000.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.BeatTime_10000, buffer);
        // LogicTools.myConsole("心跳发送", GlobalConfig.ptype, req.identify);
    }

    /** 启动心跳定时器 */
    private startHeart(): void {
        WebSocketUtil.GetInstance().startHeart(this.sendHeart.bind(this));
    }

    /** 登录请求 */
    public scoketLogin(): void {
        const request: proto.newxxs.C2S_LoginPlayer_11000 = new proto.newxxs.C2S_LoginPlayer_11000();
        request.token = GlobalConfig.token;
        const buffer = proto.newxxs.C2S_LoginPlayer_11000.encode(request).finish();
        LogicTools.myConsole("发送登录消息");
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.LoginPlayer_11000, buffer);
    }

    /** 获取场景 */
    public getCurScene(): void {
        const req = new proto.newxxs.C2S_CurScene_13000();
        // req.identify = GlobalConfig.identify;
        const buffer = proto.newxxs.C2S_CurScene_13000.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.CurScene_13000, buffer);
        LogicTools.myConsole("请求场景信息");
    }

    /** 设置倍数 */
    public setMultiple(isMultiple: boolean): void {
        const req = new proto.newxxs.C2S_SetMultiple_15000();
        req.isMultiple = isMultiple ? E_GAME_MULTIPLE_TYPE.IS_MULTIPLE : E_GAME_MULTIPLE_TYPE.NOT_MULTIPLE;
        const buffer = proto.newxxs.C2S_SetMultiple_15000.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.SetMultiple_15000, buffer);
        LogicTools.myConsole(`发送设置倍数:当前为${isMultiple ? "加倍" : "不加倍"}`);
    }

    /** 选择筹码 */
    public selectChips(chipIndex: number): void {
        const req = new proto.newxxs.C2S_SelectChips_14002();
        req.betChip = this.CurScene.betChips?.[chipIndex];
        const buffer = proto.newxxs.C2S_SelectChips_14002.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.SelectChips_14002, buffer);
        LogicTools.myConsole("发送选择筹码:", chipIndex);
    }

    /** 下注 */
    public curBet(isNewBet: boolean = false): void {
        const req = new proto.newxxs.C2S_CurBet_12000();
        const buffer = proto.newxxs.C2S_CurBet_12000.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.CurBet_12000, buffer);
        if (isNewBet) {
            EventManager.emit(E_GAME_EVENT.GAME_NEW_BET);
        }
    }

    /** 购买免费 */
    public curBuyFree(): void {
        const req = new proto.newxxs.C2S_CurBuyFree_12002();
        req.batchno = this.CurScene.batchno;
        req.round = 1;
        // req.identify = GlobalConfig.identify;
        const buffer = proto.newxxs.C2S_CurBuyFree_12002.encode(req).finish();
        WebSocketUtil.GetInstance().SendMsg(GlobalConfig.ptype, proto.newxxs.enSignalType_Moro.CurBuyFree_12002, buffer);
        LogicTools.myConsole("发送购买免费");
    }

    /** 绑定返回事件 */
    private bindEvent(): void {
        const ws = WebSocketUtil.GetInstance();

        ws.RegisterEvent("onclose", this.oncloseBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.LoginPlayerResult_11001, this.loginBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.CurSceneResult_13001, this.curSceneBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.CurBetResult_12001, this.curBetBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.CurBuyFreeResult_12003, this.curBuyFreeBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.CurFreeResult_12005, this.curBuyFreeBack2.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.SelectChipsResult_14003, this.selectChipsBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.BeatTimeResult_10001, this.heartBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.SetMultipleResult_15001, this.setMultipleBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.NoticeResult_66666, this.noticeBack.bind(this));

        ws.RegisterEvent(proto.newxxs.enSignalType_Moro.OfflineResult_11002, this.userOutBack.bind(this));
    }

    /** 登录返回 */
    private loginBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_LoginPlayerResult_11001.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("Login result:", res);
        if (res.error === this.Successful_20000 || res.error == this.Successful_none) {
            // GlobalConfig.agentId = res.agentId;
            // GlobalConfig.identify = res.identify;
            // GlobalConfig.nickName = res.nickName;
            // GlobalConfig.playerId = res.playerId;
            // 不需要启动心跳【心跳消息目前是直接断开websocket】
            // this.startHeart();
            LogicTools.myConsole(GlobalConfig);
            GridManager.GetInstance().parseLoginInitInfo(res);
            this.CurScene = res.curScene;
        }
    }

    /** 心跳返回 */
    private heartBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.C2S_BeatTimeResult_10001.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("心跳返回:", res);
    }

    /** 设置倍数返回 */
    private setMultipleBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_SetMultipleResult_15001.decode(new Uint8Array(messageBody));
        this.CurScene.isMultiple = res.isMultiple;
        this.CurScene.betChips = res.betChips;
        this.CurScene.curBetChips = res.curBetChips;
        EventManager.emit(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.CurScene);
        LogicTools.myConsole("设置倍数返回:", res);
    }

    /** 场景返回 */
    private curSceneBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_CurSceneResult_13001.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("场景返回:", res);
    }

    /** 下注返回 */
    private curBetBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_CurBetResult_12001.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("下注返回:", res.curScene);
        this.CurScene = res.curScene;
        const curScene = res.curScene;
        if (curScene.scene == E_GAME_SCENE_TYPE.NORMAL && !curScene.allCount) {
            GridManager.GetInstance().parseNormalLogicBetInfo(curScene);
        } else {
            GridManager.GetInstance().parseFreeGameLogicBetInfo(curScene);
        }
        // if (res.curScene.scene == 2) {
        //     this.curBet();
        // }
    }

    /** 购买免费返回 */
    private curBuyFreeBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_CurBuyFreeResult_12003.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("购买免费返回:", res);
        // GridManager.GetInstance().parseGridLogicBetInfo(res);
        // GridManager.GetInstance().parseFreeGameLogicBetInfo(res);
        this.CurScene = res.curScene;
        EventManager.emit(E_GAME_EVENT.GAME_FREE_INIT, res.curScene);
    }

    /** 免费结果返回 */
    private curBuyFreeBack2(messageBody: ArrayBuffer): void {
        // const res = proto.newxxs.S2C_CurFreeResult_12005.decode(new Uint8Array(messageBody));
        // LogicTools.myConsole("免费游戏返回:", res);
    }

    /** 选择筹码返回 */
    private selectChipsBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_SelectChipsResult_14003.decode(new Uint8Array(messageBody));
        this.CurScene.curBetChips = res.curBetChips;
        this.CurScene.buyFreeChips = res.buyFreeChips;
        this.CurScene.scopes = res.scopes;
        EventManager.emit(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.CurScene);
        LogicTools.myConsole("选择筹码返回:", res);
    }

    /** 公告通知 */
    private noticeBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_NoticeResult_66666.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("公告通知:", res);
    }

    /** 玩家下线通知 */
    private userOutBack(messageBody: ArrayBuffer): void {
        const res = proto.newxxs.S2C_OfflineResult_11002.decode(new Uint8Array(messageBody));
        LogicTools.myConsole("玩家下线:", res);
    }

    /** 可访问底层 ws 对象 */
    public get webScoketObj() {
        return WebSocketUtil.GetInstance().webScoketObj;
    }

    /** 关闭连接 */
    public closeScoket(): void {
        WebSocketUtil.GetInstance().close();
    }
}

// 调试全局
(window as any).SocketManager = SocketManager.GetInstance();

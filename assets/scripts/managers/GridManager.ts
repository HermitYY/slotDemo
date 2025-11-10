import { _decorator, Component, Node } from "cc";
import { Singleton } from "../common/Singleton";
import { EventManager, E_GAME_EVENT } from "../managers/EventManager";
import proto from "../network/MLWZ_msg.js";
import GlobalConfig from "../common/GlobalConfig";

const { ccclass, property } = _decorator;

@ccclass("GridManager")
export class GridManager extends Singleton {
    public get rows() {
        return GlobalConfig.rows;
    }
    public get cols() {
        return GlobalConfig.cols;
    }

    // 默认比例表
    public static fillRatios: [number, number][] = [
        [1, 1], // NONE
        [0.6, 0.8], // id1 9
        [0.6, 0.7], // id2 J
        [0.7, 0.7], // id3 Q
        [0.7, 0.7], // id4 K
        [0.7, 0.8], // id5 A
        [1.4, 1.4], // id6 魔王 有牙
        [1.9, 1.7], // id7 神猴
        [1.6, 1.5], // id8 鸟王
        [2.3, 2.3], // id9 希多
        [1.1, 1.1], // id10 绿宝石 倍率
        [1.1, 1.1], // 绿宝石 展翅
        [1, 1], // NONE
        [1, 1], // NONE
        [1.9, 1.8], // id14 王子
    ];

    // 登录的场景信息
    public parseLoginInitInfo(res: proto.newxxs.S2C_LoginPlayerResult_11001) {
        EventManager.emit(E_GAME_EVENT.USER_INFO_RETURN_END);
        EventManager.on(E_GAME_EVENT.GAME_ENTER_MAIN_SCENE, () => {
            EventManager.emit(E_GAME_EVENT.GAME_GRID_INIT_DATA, res.curScene);
        });
    }

    // 下注后返回的普通场景信息
    public parseNormalLogicBetInfo(curScene: proto.newxxs.ICurScene) {
        if (curScene.run > 1) {
            if (curScene.comboCount > 1) {
                // 查询返回 combo持续中
                console.log("结果:得到下落结果combo继续");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE, curScene);
            } else {
                // 刷新返回 有combo
                console.log("结果:刷新有奖励 开始查询下落");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_UPDATA_CONSECUTIVE, curScene);
            }
        } else {
            if (curScene.winChips) {
                // 查询返回 combo结束
                console.log("结果:得到下落结果combo结束");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE, curScene);
            } else {
                // 刷新返回 无奖
                console.log("结果:刷新无奖励");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_UPDATA_NO_CONSECUTIVE, curScene);
            }
        }
    }

    // 下注后返回的freeGame场景信息
    public parseFreeGameLogicBetInfo(curScene: proto.newxxs.ICurScene) {
        // if (
        //     curScene.panel
        //         .split(",")
        //         .map(Number)
        //         .filter((i) => i == 14).length > 2
        // ) {
        //     console.log("找到l");
        //     return;
        // } else {
        //     SocketManager.GetInstance().curBet();
        //     return;
        // }
        if (curScene.run > 1) {
            if (curScene.comboCount > 1) {
                // 查询返回 combo持续中
                console.log("free结果:得到下落结果combo继续");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE, curScene);
            } else {
                // 刷新返回 有combo
                console.log("free结果:刷新有奖励 开始查询下落");
                EventManager.emit(E_GAME_EVENT.GAME_FREE_REFRESH_CONSECUTIVE, curScene);
            }
        } else {
            if (curScene.free && curScene.free.index) {
                console.log("进free", curScene);
                if (curScene.winChips == 1200 || curScene.winChips == 2000 || curScene.winChips == 4000) {
                    EventManager.emit(E_GAME_EVENT.GAME_FREE_INIT, curScene);
                } else {
                    EventManager.emit(E_GAME_EVENT.GAME_NORMAL_INTER_FREE, curScene);
                }
            } else if (curScene.curChips) {
                // 查询返回 combo结束
                console.log("free结果:得到下落结果combo结束");
                EventManager.emit(E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE, curScene);
            } else {
                // 刷新返回 无奖
                console.log("free结果:刷新无奖励");
                EventManager.emit(E_GAME_EVENT.GAME_FREE_REFRESH_NO_CONSECUTIVE, curScene);
            }
        }
    }
}

(window as any).GridManager = GridManager.GetInstance();

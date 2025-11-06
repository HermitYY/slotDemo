import { _decorator, Component, Node } from "cc";
import { Singleton } from "../common/Singleton";
import { EventManager, E_GAME_EVENT } from "../managers/EventManager";
import proto from "../network/MLWZ_msg.js";
import GlobalConfig from "../common/GlobalConfig";
import { SocketManager } from "../network/SocketManager";

const { ccclass, property } = _decorator;

@ccclass("GridManager")
export class GridManager extends Singleton {
    public get rows() {
        return GlobalConfig.rows;
    }
    public get cols() {
        return GlobalConfig.cols;
    }

    // 登录的场景信息
    public parseLoginInitInfo(res: proto.newxxs.S2C_LoginPlayerResult_11001) {
        EventManager.emit(E_GAME_EVENT.USER_INFO_RETURN_END);
        EventManager.on(E_GAME_EVENT.GAME_ENTER_MAIN_SCENE, () => {
            console.log("游戏已进入主界面,发送场景信息");
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

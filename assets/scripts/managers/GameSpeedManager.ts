import { Singleton } from "../common/Singleton";
import { LocalStorageTools, StorageKey } from "../Tools/LocalStorageTools";
import { E_GAME_EVENT, EventManager } from "./EventManager";

export enum E_GAME_SPEED_TYPE {
    NORMAL = 1,
    FAST = 2,
    SUPER_FAST = 3,
}

export class GameSpeedManager extends Singleton {
    private _speed: E_GAME_SPEED_TYPE = E_GAME_SPEED_TYPE.NORMAL;
    private _hasLoadLocalStorage = false;
    /** 切换到指定游戏速度 */
    public switchToSpeed(speed: E_GAME_SPEED_TYPE) {
        if (this._speed === speed) return;
        this._speed = speed;
        LocalStorageTools.GetInstance().setItem(StorageKey.GAME_SPEED, speed);
        EventManager.emit(E_GAME_EVENT.GAME_SPEED_UPDATE);
    }

    /** 临时切换到指定游戏速度 */
    public tempSwitchToSpeed(speed: E_GAME_SPEED_TYPE) {
        if (this._speed === speed) return;
        this._speed = speed;
        EventManager.emit(E_GAME_EVENT.GAME_SPEED_UPDATE);
    }

    public get speed(): E_GAME_SPEED_TYPE {
        if (!this._hasLoadLocalStorage) {
            this._hasLoadLocalStorage = true;
            this._speed = this.getStorageGameSpeed();
        }
        return this._speed;
    }

    /** 恢复存储中的游戏速度 */
    public restoreGameSpeed() {
        this.switchToSpeed(this.getStorageGameSpeed());
    }

    /** 读取本地存储中的游戏速度 */
    public getStorageGameSpeed() {
        const saved = LocalStorageTools.GetInstance().getItem<number>(StorageKey.GAME_SPEED, E_GAME_SPEED_TYPE.NORMAL);
        // 合法判断
        if (saved === E_GAME_SPEED_TYPE.NORMAL || saved === E_GAME_SPEED_TYPE.FAST) {
            return saved;
        } else {
            return E_GAME_SPEED_TYPE.NORMAL;
        }
    }

    /** 得到特效时间缩放比例 */
    public getEffectTimeScale() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return 1;
            case E_GAME_SPEED_TYPE.FAST:
                return 1.5;
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return 3;
        }
    }

    /** 得到旧列下落时间相关配置 */
    public getOldColumnDropTimeConfig() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return { dropTime: 0.3, columnInterval: 0.1, girdInterval: 0.02 };
            case E_GAME_SPEED_TYPE.FAST:
                return { dropTime: 0.2, columnInterval: 0, girdInterval: 0.02 };
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return { dropTime: 0.1, columnInterval: 0, girdInterval: 0 };
        }
    }

    /** 得到新列下落时间相关配置 */
    public getNewColumnDropTimeConfig(useCfg?: E_GAME_SPEED_TYPE) {
        switch (useCfg ?? this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return { dropTime: 0.45, boundTime: 0.25, boundDis: 6, columnInterval: 0.12, girdInterval: 0.01, voiceDelay: 0.3 };
            case E_GAME_SPEED_TYPE.FAST:
                return { dropTime: 0.4, boundTime: 0.25, boundDis: 8, columnInterval: 0, girdInterval: 0.02, voiceDelay: 0.15 };
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return { dropTime: 0.2, boundTime: 0.15, columnInterval: 0, girdInterval: 0 };
        }
    }

    /** 得到消除后格子坍塌时间相关配置 */
    public getCollapseTimeConfig() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return { dropTime: 0.35, boundTime: 0.15, boundDis: 6, girdInterval: 0.02 };
            case E_GAME_SPEED_TYPE.FAST:
                return { dropTime: 0.25, boundTime: 0, boundDis: 0, girdInterval: 0.01 };
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return { dropTime: 0.05, boundTime: 0.03, girdInterval: 0 };
        }
    }

    /** 得到消除后补齐格子下落时间相关配置 */
    public getFillTimeConfig() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return { dropTime: 0.4, boundTime: 0.1, boundDis: 15, girdInterval: 0.015 };
            case E_GAME_SPEED_TYPE.FAST:
                return { dropTime: 0.3, boundTime: 0.08, boundDis: 8, girdInterval: 0.015 };
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return { dropTime: 0.1, boundTime: 0.08, columnInterval: 0 };
        }
    }

    /** 得到roll按钮自动旋转速率相关配置 */
    public getRollButtonRotateSpeedConfig() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return { rotateSpeed: 30, magnify: 0.15, shrink: 0.15, magnify2: 0.15, shrinkNormal: 0.1, bgEffectDuration: 1.6, bgEffectTurn: 2.2 };
            case E_GAME_SPEED_TYPE.FAST:
                return { rotateSpeed: 50, magnify: 0.15, shrink: 0.15, magnify2: 0.15, shrinkNormal: 0.1, bgEffectDuration: 0.8, bgEffectTurn: 1.5 };
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return { rotateSpeed: 80, magnify: 0.15, shrink: 0.15, magnify2: 0.15, shrinkNormal: 0.1 };

            // return { rotateSpeed: 50, magnify: 0.1, shrink: 0.1, magnify2: 0.1, shrinkNormal: 0.07 };
            // return { rotateSpeed: 80, magnify: 0.05, shrink: 0.05, magnify2: 0.05, shrinkNormal: 0.03 };
        }
    }

    /** 得到每轮结束的后摇 */
    public getRoundEndBackTime() {
        switch (this._speed) {
            case E_GAME_SPEED_TYPE.NORMAL:
                return 0.3;
            case E_GAME_SPEED_TYPE.FAST:
                return 0.6;
            // case E_GAME_SPEED_TYPE.SUPER_FAST:
            //     return 0.1;
        }
    }
}

(window as any).SpeedManager = GameSpeedManager.GetInstance();

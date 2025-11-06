import { Singleton } from "../common/Singleton";
import { SocketManager } from "../network/SocketManager";
import { E_GAME_EVENT, EventManager } from "./EventManager";

export class AutoManager extends Singleton {
    private _isAuto: boolean = false;
    public get isAutoIng() {
        return this._isAuto;
    }
    private _autoTimes: number = 0;
    public get autoTimes() {
        return this._autoTimes;
    }

    public beginAuto(autoTimes: number) {
        this._isAuto = true;
        this._autoTimes = autoTimes;
        this.continueAuto(true);
    }

    public stopAuto() {
        this._isAuto = false;
        this._autoTimes = 0;
        EventManager.emit(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE);
    }

    public continueAuto(isInit: boolean = false) {
        if (this._autoTimes <= 0) {
            this.stopAuto();
            return;
        } else {
            this.autoRoll();
        }
        this._autoTimes--;
        isInit && EventManager.emit(E_GAME_EVENT.GAME_AUTO_MODE_OPEN);
    }

    public preStopAuto() {
        this._autoTimes = 0;
    }

    private autoRoll() {
        // EventManager.emit(E_GAME_EVENT.GAME_GRID_ROLL_ANIMATION);
        SocketManager.GetInstance().curBet(true);
    }
}

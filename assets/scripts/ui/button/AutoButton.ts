import { _decorator, Component, Label, Prefab, UIOpacity } from "cc";
import { PopupManager } from "../popup/PopupManager";
import { AutoManager } from "../../managers/AutoManager";
import { SelectChipsButton } from "./SelectChipsButton";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("AutoButton")
export class AutoButton extends Component {
    @property(Prefab)
    PopupAutoBuy: Prefab = null!;

    start() {
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.BettingButtonOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_BET_END, this.BettedButtonOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE, this.BettedButtonOpacity, this);
    }

    onDestroy() {
        EventManager.removeAllByTarget(this);
    }

    update(deltaTime: number) {}

    onClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const worldPos = this.node.worldPosition.clone();
        PopupManager.show(this.PopupAutoBuy, { fromButtonPos: worldPos });
    }

    onClickCloseAuto() {
        AutoManager.GetInstance().preStopAuto();
    }

    BettingButtonOpacity() {
        const autoButtonOp = this.getComponent(UIOpacity);
        if (autoButtonOp) {
            autoButtonOp.opacity = SelectChipsButton.banOpacity;
        }
    }

    BettedButtonOpacity() {
        const autoButtonOp = this.getComponent(UIOpacity);
        if (autoButtonOp) {
            autoButtonOp.opacity = SelectChipsButton.canUseOpacity;
        }
    }
}

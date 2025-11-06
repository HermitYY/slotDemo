import { _decorator, Component, Label, Prefab, UIOpacity, Node, Button } from "cc";
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

    @property(Node)
    AutoButton: Node = null!;
    @property(Node)
    StopAutoButton: Node = null!;

    start() {
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.BettingButtonOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_BET_END, this.BettedButtonOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_OPEN, this.autoBegin, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE, this.autoClose, this);
    }

    onDestroy() {
        EventManager.removeAllByTarget(this);
    }

    onClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const worldPos = this.node.worldPosition.clone();
        PopupManager.show(this.PopupAutoBuy, { fromButtonPos: worldPos });
    }

    onClickCloseAuto() {
        AutoManager.GetInstance().preStopAuto();
        this.updateButton(false);
        this.BettedButtonOpacity();
    }

    BettingButtonOpacity() {
        if (AutoManager.GetInstance().isAutoIng) return;
        const autoButtonOp = this.AutoButton.getComponent(UIOpacity) ?? this.addComponent(UIOpacity);
        autoButtonOp.opacity = SelectChipsButton.banOpacity;
        this.AutoButton.getComponent(Button).interactable = false;
    }

    BettedButtonOpacity() {
        const autoButtonOp = this.AutoButton.getComponent(UIOpacity);
        autoButtonOp.opacity = SelectChipsButton.canUseOpacity;
        this.AutoButton.getComponent(Button).interactable = true;
    }

    autoBegin() {
        this.updateButton(true);
    }

    autoClose() {
        this.updateButton(false);
    }

    updateButton(isAutoIng: boolean) {
        this.AutoButton.active = !isAutoIng;
        this.StopAutoButton.active = isAutoIng;
    }
}

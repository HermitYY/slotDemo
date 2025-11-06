import { _decorator, Button, Component, Node, UIOpacity } from "cc";
import { BasePopup } from "./BasePopup";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
const { ccclass, property } = _decorator;

@ccclass("PopupReplay")
export class PopupReplay extends BasePopup {
    @property(Node)
    public pauseButton: Node = null;
    @property(Node)
    public continueButton: Node = null;

    public static banOpacity = 120;
    public static canUseOpacity = 255;

    private isPlayIng = true;
    override onLoad(): void {
        super.onLoad();
        EventManager.on(E_GAME_EVENT.GAME_REPLAY_STOP, this.closeWindow, this);
        this.isPlayIng = true;
        this.updateButtonBan();
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    onClickPause() {
        EventManager.emit(E_GAME_EVENT.GAME_REPLAY_PAUSE);
        this.isPlayIng = false;
        this.updateButtonBan();
    }
    onClickContinue() {
        EventManager.emit(E_GAME_EVENT.GAME_REPLAY_CONTINUE);
        this.isPlayIng = true;
        this.updateButtonBan();
    }
    onClickStop() {
        EventManager.emit(E_GAME_EVENT.GAME_REPLAY_STOP);
        this.closeWindow();
    }

    closeWindow() {
        this.close();
    }

    updateButtonBan() {
        const pauseButtonOp = this.pauseButton.getComponent(UIOpacity) ?? this.pauseButton.addComponent(UIOpacity);
        pauseButtonOp.opacity = this.isPlayIng ? PopupReplay.canUseOpacity : PopupReplay.banOpacity;
        this.pauseButton.getComponent(Button).interactable = this.isPlayIng;
        const continueButtonOp = this.continueButton.getComponent(UIOpacity) ?? this.continueButton.addComponent(UIOpacity);
        continueButtonOp.opacity = this.isPlayIng ? PopupReplay.banOpacity : PopupReplay.canUseOpacity;
        this.continueButton.getComponent(Button).interactable = !this.isPlayIng;
    }
}

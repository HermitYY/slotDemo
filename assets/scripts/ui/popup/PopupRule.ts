import { _decorator, Component, Node } from "cc";
import { BasePopup } from "./BasePopup";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("PopupRule")
export class PopupRule extends BasePopup {
    public clickCloseWindonw() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.close();
    }
}

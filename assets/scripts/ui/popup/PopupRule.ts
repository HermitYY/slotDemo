import { _decorator, Component, Node } from "cc";
import { BasePopup } from "./BasePopup";
const { ccclass, property } = _decorator;

@ccclass("PopupRule")
export class PopupRule extends BasePopup {
    public clickCloseWindonw() {
        this.close();
    }
}

import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

export const enum E_POPUP_TIPS_SHIW_TYPE {
    NORMAL_TEXT_AUTO_CLOSE = 1,
    NORMAL_TEXT_CLICK_CLOSE = 2,
    ERROR_TIPS_JUMP_TO_HOST = 3,
}

@ccclass("PopupTips")
export class PopupTips extends BarProp {
    start() {}

    update(deltaTime: number) {}
}

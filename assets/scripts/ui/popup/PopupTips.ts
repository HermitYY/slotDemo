import { _decorator, Component, Label, Node } from "cc";
import { BasePopup } from "./BasePopup";
const { ccclass, property } = _decorator;

export const enum E_POPUP_TIPS_SHIW_TYPE {
    NORMAL_TEXT_AUTO_CLOSE = 1,
    NORMAL_TEXT_CLICK_CLOSE = 2,
    ERROR_TIPS_JUMP_TO_HOST = 3,
}

@ccclass("PopupTips")
export class PopupTips extends BasePopup {
    private isCanCLickMask: boolean = false;
    private closeCallBack?: () => void;
    public SetText(text: string) {
        this.node.getComponentInChildren(Label)!.string = text;
    }

    public SetCloseCallBack(fn: () => void) {
        this.closeCallBack = fn;
    }

    override async show(): Promise<void> {
        await super.show();
        this.isCanCLickMask = true;
        return;
    }

    protected override onMaskClick(): void {
        if (!this.isCanCLickMask) return;
        if (this.closeCallBack) this.closeCallBack();
        this.close();
    }
}

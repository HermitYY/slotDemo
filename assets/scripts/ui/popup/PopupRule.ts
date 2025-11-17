import { _decorator, Component, Label, Node, UI } from "cc";
import { BasePopup } from "./BasePopup";
import { AudioControlManager } from "../../managers/AudioControlManager";
import { SocketManager } from "../../network/SocketManager";
import { UItools } from "../../Tools/UItools";
const { ccclass, property } = _decorator;

@ccclass("PopupRule")
export class PopupRule extends BasePopup {
    @property([Node])
    private scopes: Node[] = [];

    onLoad(): void {
        super.onLoad();
        const curScene = SocketManager.GetInstance().CurScene;
        curScene.scopes.forEach((item, index) => {
            if (this.scopes[index]) {
                if (item.maxCount == item.minCount) {
                    this.scopes[index].getComponent(Label).string = `    ${item.minCount}       RP ${UItools.GetInstance().formatCurrency(item.chips)}`;
                } else {
                    this.scopes[index].getComponent(Label).string = `${item.minCount < 10 ? " " : ""}${item.minCount} - ${item.maxCount} ${
                        item.maxCount < 10 ? "   " : ""
                    }  RP ${UItools.GetInstance().formatCurrency(item.chips)}`;
                }
            }
        });
    }
    public clickCloseWindonw() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.close();
    }
}

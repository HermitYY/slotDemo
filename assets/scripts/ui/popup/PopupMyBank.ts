import { _decorator, Component, Label, Node } from "cc";
import { BasePopup } from "./BasePopup";
import { SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
const { ccclass, property } = _decorator;

@ccclass("PopupMyBank")
export class PopupMyBank extends BasePopup {
    @property(Label)
    private label: Label = null;

    onLoad(): void {
        super.onLoad();
        const curScene = SocketManager.GetInstance().CurScene;
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(curScene);
        UItools.GetInstance().showCurrencyValue(chipsInfo.havenChips, this.label);
    }
}

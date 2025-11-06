import { _decorator, Component, Label, Node } from "cc";
import { BasePopup } from "./BasePopup";
import { SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
const { ccclass, property } = _decorator;

@ccclass("PopupBuyFreeGame")
export class PopupBuyFreeGame extends BasePopup {
    @property(Label)
    public needChipslabel: Label = null;
    /** 确认按钮回调 */
    public onConfirm() {
        SocketManager.GetInstance().curBuyFree();
        this.close();
    }

    /** 取消按钮回调 */
    public onCancel() {
        this.close();
    }

    start() {
        const data = SocketManager.GetInstance().CurScene;
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        this.needChipslabel.string = UItools.GetInstance().formatCurrency(chipsInfo.curBetChips * 100, false);
    }
}

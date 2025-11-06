import { _decorator, Button, Component, Label, Prefab, UIOpacity } from "cc";
import { E_GAME_MULTIPLE_TYPE, SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { PopupManager } from "../popup/PopupManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("BuyFreeButton")
export class BuyFreeButton extends Component {
    @property(Label)
    needChipslabel: Label = null;
    @property(Label)
    needChipslabelShadow: Label = null;
    @property(Prefab)
    PopupWindow: Prefab = null!;

    public static banOpacity = 180;
    public static canUseOpacity = 255;

    start() {
        EventManager.on(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.updCtrl, this);
        this.updCtrl();
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    updCtrl() {
        this.updlabel();
        this.updateOpacity();
    }

    updlabel() {
        const data = SocketManager.GetInstance().CurScene;
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        this.needChipslabel.string = UItools.GetInstance().formatCurrency(chipsInfo.buyFreeChips, false);
        this.needChipslabelShadow.string = UItools.GetInstance().formatCurrency(chipsInfo.buyFreeChips, false);
    }

    updateOpacity() {
        const data = SocketManager.GetInstance().CurScene;
        const isMultiple = data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE;
        const addChipLabelOp = this.getComponent(UIOpacity) ?? this.addComponent(UIOpacity);
        addChipLabelOp.opacity = isMultiple ? BuyFreeButton.banOpacity : BuyFreeButton.canUseOpacity;
        this.getComponent(Button).interactable = !isMultiple;
    }

    onClick() {
        const data = SocketManager.GetInstance().CurScene;
        // 高倍率不能购买free
        const isMultiple = data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE;
        if (isMultiple) return;
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const worldPos = this.node.worldPosition.clone();
        PopupManager.show(this.PopupWindow, { fromButtonPos: worldPos });
    }
}

import { _decorator, Component, Prefab, Node, UIOpacity } from "cc";
import { PopupManager } from "../popup/PopupManager";
import { SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("AddOrSubChipsButton")
export class AddOrSubChipsButton extends Component {
    public static banOpacity = 120;
    public static canUseOpacity = 255;

    @property(Node)
    AddButton: Node = null;
    @property(Node)
    SubmitButton: Node = null;
    onLoad() {
        this.updateOpacity();
        EventManager.on(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.updateOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.BettingButtonOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_BET_END, this.updateOpacity, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE, this.updateOpacity, this);
    }

    onDestroy() {
        EventManager.removeAllByTarget(this);
    }

    update(deltaTime: number) {}

    onClickAddChip() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const data = SocketManager.GetInstance().CurScene;
        const { betChipsSelects, chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        const curSelectIndex = betChipsSelects.indexOf(chipsInfo.curBetChips);
        if (curSelectIndex === betChipsSelects.length - 1) return;
        SocketManager.GetInstance().selectChips(curSelectIndex + 1);
    }

    onClickSubmitChip() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const data = SocketManager.GetInstance().CurScene;
        const { betChipsSelects, chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        const curSelectIndex = betChipsSelects.indexOf(chipsInfo.curBetChips);
        if (curSelectIndex === 0) return;
        SocketManager.GetInstance().selectChips(curSelectIndex - 1);
    }

    updateOpacity() {
        const data = SocketManager.GetInstance().CurScene;
        const { betChipsSelects, chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        const curSelectIndex = betChipsSelects.indexOf(chipsInfo.curBetChips);

        const addChipLabelOp = this.AddButton.getComponent(UIOpacity);
        addChipLabelOp.opacity = curSelectIndex === betChipsSelects.length - 1 ? AddOrSubChipsButton.banOpacity : AddOrSubChipsButton.canUseOpacity;
        const subChipLabelOp = this.SubmitButton.getComponent(UIOpacity);
        subChipLabelOp.opacity = curSelectIndex === 0 ? AddOrSubChipsButton.banOpacity : AddOrSubChipsButton.canUseOpacity;
    }

    BettingButtonOpacity() {
        const addChipLabelOp = this.AddButton.getComponent(UIOpacity);
        addChipLabelOp.opacity = AddOrSubChipsButton.banOpacity;
        const subChipLabelOp = this.SubmitButton.getComponent(UIOpacity);
        subChipLabelOp.opacity = AddOrSubChipsButton.banOpacity;
    }
}

import { _decorator, Label, Node, Button, Sprite, settings } from "cc";
import { BasePopup } from "./BasePopup";
import { SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { CommonList } from "../../common/CommonList";
import { UItools } from "../../Tools/UItools";

const { ccclass, property } = _decorator;

@ccclass("PopupSelectChips")
export class PopupSelectChips extends BasePopup {
    private selectedIndex: number = 0;
    private selectNumBtns: Button[] = [];
    private list: CommonList = null;
    start() {
        setTimeout(() => {
            this.list.scrollToIndex(this.selectedIndex, 0.8);
        }, 50);
        this.updateList();
        this.initSelectButtons();
    }

    updateList() {
        const data = SocketManager.GetInstance().CurScene;
        const { betChipsSelects, chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        this.list ??= this.getComponentInChildren(CommonList);
        this.list.setData(betChipsSelects);
        this.selectNumBtns = this.list.getItemArray().map((item: Node) => {
            return item.getComponent(Button);
        });
        this.selectNumBtns.forEach((btn, index) => {
            const buttonLabel = btn.getComponentInChildren(Label);
            buttonLabel.string = "Rp " + UItools.GetInstance().formatCurrency(betChipsSelects[index], false);
        });
        this.selectedIndex = betChipsSelects.indexOf(chipsInfo.curBetChips);
    }

    onClickClose() {
        this.close();
    }

    /** 初始化按钮状态 */
    private initSelectButtons() {
        this.selectNumBtns.forEach((btn, index) => {
            btn.node.on(Button.EventType.CLICK, () => this.onSelectButton(index));

            // 鼠标移入
            btn.node.on(Node.EventType.MOUSE_ENTER, () => this.onHoverButton(index));
            // 鼠标移出
            btn.node.on(Node.EventType.MOUSE_LEAVE, () => this.onLeaveButton(index));

            // 初始化按钮状态
            if (index === this.selectedIndex) {
                this.setButtonSelected(btn, true);
            } else {
                this.setButtonSelected(btn, false);
            }
        });
    }

    /** 点击按钮切换选中 */
    private onSelectButton(index: number) {
        if (index === this.selectedIndex) return; // 已选中无需操作
        this.setButtonSelected(this.selectNumBtns[this.selectedIndex], false);
        this.selectedIndex = index;
        this.setButtonSelected(this.selectNumBtns[this.selectedIndex], true);
        SocketManager.GetInstance().selectChips(index);
        this.close();
    }

    /** 设置按钮选中状态 */
    private setButtonSelected(btn: Button, selected: boolean) {
        if (!btn) return;
        const sprite = btn.getComponent(Sprite);
        if (!sprite) return;

        if (selected) {
            btn.transition = Button.Transition.NONE; // 选中时取消自动切换
            sprite.spriteFrame = btn.hoverSprite; // 固定显示 hover
        } else {
            btn.transition = Button.Transition.SPRITE; // 恢复按钮自身 transition
            sprite.spriteFrame = btn.normalSprite; // 显示 normal
        }
    }

    /** 鼠标移入，hover 状态 */
    private onHoverButton(index: number) {
        if (index === this.selectedIndex) return; // 已选中按钮维持 hover sprite
        const btn = this.selectNumBtns[index];
        btn.transition = Button.Transition.SPRITE;
        if (btn.hoverSprite) {
            const sprite = btn.getComponent(Sprite);
            if (sprite) sprite.spriteFrame = btn.hoverSprite;
        }
    }

    /** 鼠标移出，恢复 normal 状态 */
    private onLeaveButton(index: number) {
        if (index === this.selectedIndex) {
            return;
        } // 已选中按钮维持 hover sprite
        const btn = this.selectNumBtns[index];
        btn.transition = Button.Transition.SPRITE;
        if (btn.normalSprite) {
            const sprite = btn.getComponent(Sprite);
            if (sprite) sprite.spriteFrame = btn.normalSprite;
        }
    }
}

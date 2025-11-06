import { _decorator, Button, Label, SpriteFrame, Sprite, Node } from "cc";
import { BasePopup } from "./BasePopup";
import { SocketManager } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
import { AutoManager } from "../../managers/AutoManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";

const { ccclass, property } = _decorator;

@ccclass("PopupAutoBuy")
export class PopupAutoBuy extends BasePopup {
    @property(Label)
    bankLabel: Label | null = null;

    @property(Label)
    selectNeedNumLabel: Label | null = null;

    @property([Button])
    selectNumBtns: Button[] = [];

    @property(SpriteFrame)
    normalSpriteFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    hoverSpriteFrame: SpriteFrame | null = null;

    private selectedIndex: number = 0;
    private static readonly times = [10, 30, 50, 80, 1000];

    start() {
        const data = SocketManager.GetInstance().CurScene;
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        if (this.bankLabel) this.bankLabel.string = UItools.GetInstance().formatCurrency(chipsInfo.havenChips);
        if (this.selectNeedNumLabel) this.selectNeedNumLabel.string = UItools.GetInstance().formatCurrency(chipsInfo.curBetChips);
        this.initSelectButtons();
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

        // 取消上一个选中
        this.setButtonSelected(this.selectNumBtns[this.selectedIndex], false);
        // 设置当前选中
        this.selectedIndex = index;
        this.setButtonSelected(this.selectNumBtns[this.selectedIndex], true);

        // 更新对应数值显示
        // const data = SocketManager.GetInstance().CurScene;
        // const { chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        // if (this.selectNeedNumLabel) this.selectNeedNumLabel.string = UItools.GetInstance().formatCurrency(PopupAutoBuy.times[this.selectedIndex] * chipsInfo.curBetChips);
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

    onClickClose() {
        this.close();
    }

    public beginAuto() {
        AutoManager.GetInstance().beginAuto(PopupAutoBuy.times[this.selectedIndex]);
        this.close();
    }
}

import { _decorator, Component, EffectAsset, Label, Node, Vec3 } from "cc";
import { BasePopup } from "./BasePopup";
import proto from "../../network/MLWZ_msg.js";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
import { EffectManager } from "../../managers/EffectManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
import { AudioManager, SfxEnum } from "../../managers/AudioManager";

const { ccclass, property } = _decorator;

@ccclass("PopupFreeResults")
export class PopupFreeResults extends BasePopup {
    @property(Node)
    private bigPanel: Node = null;
    @property(Node)
    private megaPanel: Node = null;
    @property(Node)
    private superPanel: Node = null;
    @property(Node)
    private winChips: Node = null;
    @property(Node)
    private endPanel: Node = null;

    private isClosed: boolean = false;
    private closeResolve: ((value: void) => void) | null = null;
    override async show(): Promise<void> {
        await super.show();
        this.isClosed = false;

        await Promise.race([
            // 3秒自动关闭
            LogicTools.Delay(3000).then(() => {
                if (!this.isClosed) {
                    this.close();
                }
            }),
            // 手动关闭的Promise
            new Promise<void>((resolve) => {
                this.closeResolve = resolve;
            }),
        ]);
    }

    public Setdata(curScene: proto.newxxs.ICurScene) {
        this.bigPanel.active = false;
        this.megaPanel.active = false;
        this.superPanel.active = false;
        this.winChips.active = false;
        this.endPanel.active = false;
        if (!curScene.freeCount) {
            AudioControlManager.GetInstance().playSfxfreeEndAll();
            this.endPanel.active = true;
            AudioControlManager.GetInstance().playSfxLoogGold();
            UItools.GetInstance().showCurrencyValue(
                curScene.winChips,
                this.endPanel.getComponentInChildren(Label),
                true,
                AudioManager.GetInstance().checkDuration(SfxEnum.LoogGold) * 1000,
                false
            );
            EffectManager.playEffect("LadybirdTextFlash", this.endPanel, new Vec3(-6, 295));
            EffectManager.playEffect("LadybirdHandFlash", this.endPanel, new Vec3(0, 18));
            return;
        }
        const comboChips = curScene.curChips;
        AudioControlManager.GetInstance().playSfxLoogGold();
        UItools.GetInstance().showCurrencyValue(comboChips, this.winChips.getComponent(Label), true, AudioManager.GetInstance().checkDuration(SfxEnum.LoogGold) * 1000, false);
        const bigWinChips = curScene.curBetChips * 5;
        const megaWinChips = curScene.curBetChips * 10;
        const superWinChips = curScene.curBetChips * 20;
        if (comboChips >= superWinChips) {
            this.superPanel.active = true;
            this.winChips.active = true;
        } else if (comboChips >= megaWinChips) {
            this.megaPanel.active = true;
            this.winChips.active = true;
        } else if (comboChips >= bigWinChips) {
            this.bigPanel.active = true;
            this.winChips.active = true;
        } else {
            // 不应该进入 保险用
            this.close();
        }
        EffectManager.playEffect("LadybirdFlash", this.contentNode, new Vec3(8, 108, 0));
    }

    override async close(): Promise<void> {
        if (this.isClosed) return;

        this.isClosed = true;

        // 先resolve Promise，让show方法返回
        if (this.closeResolve) {
            this.closeResolve();
            this.closeResolve = null;
        }

        // 调用父类的close方法
        await super.close();
    }

    onDestroy(): void {
        if (!this.isClosed && this.closeResolve) {
            this.closeResolve();
            this.closeResolve = null;
        }
        EffectManager.stopEffect("LadybirdFlash", this.contentNode);
    }
}

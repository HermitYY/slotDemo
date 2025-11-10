import { _decorator, Component, Node, Prefab, tween, easing, Vec3, UIOpacity, Button, find } from "cc";
import { BasePopup } from "./BasePopup";
import { PopupManager } from "./PopupManager";
import { RoundBox } from "../../common/RoundBox";
import { AudioManager } from "../../managers/AudioManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { SlotMachine } from "../SlotMachine";

const { ccclass, property } = _decorator;

@ccclass("PopupSetting")
export class PopupSetting extends BasePopup {
    @property(Prefab)
    PopupHistoryWindow: Prefab = null!;

    @property(Prefab)
    RulesWindow: Prefab = null!;

    @property(Node)
    SettingButton: Node = null;
    @property(Node)
    OpenSoundButton: Node = null;
    @property(Node)
    CloseSoundButton: Node = null;
    @property(Node)
    RuleButton: Node = null;
    @property(Node)
    HistoryButton: Node = null;

    private duration = 0.4;

    override onLoad(): void {
        super.onLoad();
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.BanButton, this);
        EventManager.on(E_GAME_EVENT.GAME_BET_END, this.UnBanButton, this);
    }

    start() {
        this.playRotateEffect(-180);
        this.updateSoundButton();
        const slotMachine = find("Canvas/MainGame/Grid/SlotGroup/SlotMachine")?.getComponent(SlotMachine);
        slotMachine && this.updateButtonBan(slotMachine.isRolling);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    public override close(): Promise<void> {
        this.playRotateEffect(180);
        return super.close();
    }

    onClickClose() {
        this.close();
    }

    onClickOpenSound() {
        AudioManager.GetInstance().setVolumeForType("bgm", 100);
        AudioManager.GetInstance().setVolumeForType("sfx", 100);
        this.updateSoundButton();
    }

    onClickCloseSound() {
        AudioManager.GetInstance().setVolumeForType("bgm", 0);
        AudioManager.GetInstance().setVolumeForType("sfx", 0);
        this.updateSoundButton();
    }

    onClickRuleWindowOpen() {
        PopupManager.show(this.RulesWindow, { curstomAniCfg: { customAniOut: "expoOut", customAniIn: "expoIn" } });
    }

    onClickHistoryWindowOpen() {
        PopupManager.show(this.PopupHistoryWindow, { curstomAniCfg: { customAniOut: "expoOut", customAniIn: "expoIn" } });
        this.getComponentInChildren(RoundBox).segment = 10;
    }

    playRotateEffect(rotateAngle: number) {
        const node = this.SettingButton;
        const startRot = node.eulerAngles.clone();
        const startScale = node.scale.clone();

        const rotateTween = tween(node).to(this.duration, { eulerAngles: new Vec3(startRot.x, startRot.y, startRot.z + rotateAngle) }, { easing: easing.quadInOut });

        const jellyTween = tween(node)
            .to(0.15, { scale: startScale.clone().multiplyScalar(1.2) }, { easing: easing.quadOut })
            .to(0.2, { scale: startScale.clone().multiplyScalar(0.85) }, { easing: easing.quadInOut })
            .to(0.1, { scale: startScale.clone().multiplyScalar(0.9) }, { easing: easing.quadIn });

        tween(node).parallel(rotateTween, jellyTween).start();
    }

    updateSoundButton() {
        const volume = AudioManager.GetInstance().getVolumeForType("bgm");
        this.CloseSoundButton.active = volume > 0;
        this.OpenSoundButton.active = volume <= 0;
    }

    BanButton() {
        this.updateButtonBan(true);
        this.getComponentInChildren(RoundBox).segment = 10;
    }

    UnBanButton() {
        this.updateButtonBan(false);
        this.getComponentInChildren(RoundBox).segment = 10;
    }

    updateButtonBan(isBan: boolean) {
        const banOp = 120;
        const unBanOp = 255;
        const op = isBan ? banOp : unBanOp;
        const ruleOp = this.RuleButton.getComponent(UIOpacity) ?? this.RuleButton.addComponent(UIOpacity);
        ruleOp.opacity = op;
        ruleOp.getComponent(Button).interactable = !isBan;
        const historyOp = this.HistoryButton.getComponent(UIOpacity) ?? this.HistoryButton.addComponent(UIOpacity);
        historyOp.opacity = op;
        historyOp.getComponent(Button).interactable = !isBan;
    }
}

import { _decorator, Component, tween, easing, Vec3, Quat, Node, Sprite, UIOpacity } from "cc";
import { SlotMachine } from "../SlotMachine";
import { EffectManager } from "../../managers/EffectManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { AutoManager } from "../../managers/AutoManager";
import { GameSpeedManager } from "../../managers/GameSpeedManager";
import { AudioControlManager } from "../../managers/AudioControlManager";

const { ccclass, property } = _decorator;

@ccclass("RollButton")
export class RollButton extends Component {
    @property(SlotMachine)
    public slotMachine: SlotMachine = null;

    @property({ type: Node })
    public smallButton: Node = null;

    @property({ type: Node })
    private spinNode: Node = null;

    private spinOp: UIOpacity = null;

    private _isPlayingEffect = false;
    private get duration() {
        return Math.max(0, EffectManager.getEffectDuration("RollButton_UpLight") - 0.1);
    }

    onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_GRID_ROLL_ANIMATION, this.playAllEffect, this);
    }

    onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    onClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.playAllEffect();
        this.slotMachine.roll();
    }

    playAllEffect() {
        this.playEffect();
    }

    playEffect() {
        if (this._isPlayingEffect) return;
        this.playerScaleEffect();
        const pos = this.node.position.clone();
        EffectManager.playEffect("RollButton_UpLight", this.node.parent, pos);
        EffectManager.playEffect("RollButton_MidLight", this.node, Vec3.ZERO);
        const midLightNode = EffectManager.getEffectNode("RollButton_MidLight", this.node);
        this.spinOp ??= this.spinNode.getComponent(UIOpacity);
        // 先放大再缩小
        midLightNode.scale = Vec3.ZERO;
        tween(midLightNode)
            .to(this.duration / 6, { scale: new Vec3(3.2, 1.8, 1.8) })
            .to(this.duration / 6, { scale: Vec3.ZERO })
            .call(() => {
                this.playRotateEffect(() => {
                    this._isPlayingEffect = false;
                });
            })
            .start();

        tween(this.spinOp)
            .to(this.duration / 6, { opacity: 0 })
            .start();
    }

    playRotateEffect(onFinish?: () => void) {
        this._isPlayingEffect = true;
        const smellButtonNode = this.smallButton;
        const startRotation = smellButtonNode.rotation.clone();
        EffectManager.playEffect("RollButton_OutLight", smellButtonNode, Vec3.ZERO);
        const outLight = EffectManager.getEffectNode("RollButton_OutLight", smellButtonNode);
        const effectOp = outLight.getComponent(UIOpacity) ?? outLight.addComponent(UIOpacity);
        outLight.eulerAngles = new Vec3(0, 0, 95);
        effectOp.opacity = 0;
        tween({ t: 0 })
            .to(
                (this.duration / 3) * 2,
                { t: 1 },
                {
                    easing: "quadInOut",
                    onUpdate: (target: any) => {
                        this.spinOp.opacity = target.t * 255;
                        if (effectOp && effectOp.isValid) {
                            effectOp.opacity = target.t * 255;
                        }
                        const additionalRot = new Quat();
                        Quat.fromAxisAngle(additionalRot, Vec3.FORWARD, Math.PI * 4 * target.t);
                        const currentRot = new Quat();
                        Quat.multiply(currentRot, startRotation, additionalRot);
                        smellButtonNode.rotation = currentRot;
                    },
                }
            )
            .call(() => onFinish && onFinish())
            .start();
    }

    playerScaleEffect() {
        const { magnify, shrink, magnify2, shrinkNormal } = GameSpeedManager.GetInstance().getRollButtonRotateSpeedConfig();
        const startScale = this.node.scale.clone();
        const node = this.node;
        tween(node)
            .to(magnify, { scale: startScale.clone().multiplyScalar(1.2) }, { easing: easing.quadOut })
            .to(shrink, { scale: startScale.clone().multiplyScalar(0.9) }, { easing: easing.quadInOut })
            .to(magnify2, { scale: startScale.clone().multiplyScalar(1.05) }, { easing: easing.quadOut })
            .to(shrinkNormal, { scale: startScale }, { easing: easing.quadIn })
            .start();
    }

    update(deltaTime: number) {
        if (!this._isPlayingEffect && this.smallButton) {
            const btn = this.smallButton as Node & { rotation: Quat };
            const { rotateSpeed: rotateSpeedBase } = GameSpeedManager.GetInstance().getRollButtonRotateSpeedConfig();
            const rotateSpeed = AutoManager.GetInstance().isAutoIng ? rotateSpeedBase * 8 : rotateSpeedBase;
            const rotationAngle = -(rotateSpeed * deltaTime * Math.PI) / 180;
            const deltaRotation = new Quat();
            Quat.fromAxisAngle(deltaRotation, Vec3.UNIT_Z, rotationAngle);
            const newRotation = new Quat();
            Quat.multiply(newRotation, btn.rotation, deltaRotation);
            btn.rotation = newRotation;
        }
    }
}

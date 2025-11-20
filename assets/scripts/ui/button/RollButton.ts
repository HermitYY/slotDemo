import { _decorator, Component, tween, easing, Vec3, Quat, Node, Sprite, UIOpacity } from "cc";
import { SlotMachine } from "../SlotMachine";
import { EffectManager } from "../../managers/EffectManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { AutoManager } from "../../managers/AutoManager";
import { E_GAME_SPEED_TYPE, GameSpeedManager } from "../../managers/GameSpeedManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
import { Countdown } from "../../common/Countdown";
import { LogicTools } from "../../Tools/LogicTools";

const { ccclass, property } = _decorator;

@ccclass("RollButton")
export class RollButton extends Component {
    @property(SlotMachine)
    public slotMachine: SlotMachine = null;

    @property({ type: Node })
    public smallButton: Node = null;

    @property({ type: Node })
    private spinNode: Node = null;

    @property({ type: Node })
    private countdownNode: Node = null;
    private countdown: Countdown = null!;

    @property({ type: Node })
    private BgEffectNode: Node = null;

    @property({ type: Node })
    private autoStopButton: Node = null;

    private spinOp: UIOpacity = null;

    private _isPlayingEffect = false;
    private _isAutoRotate = true;

    private curShowNum = 0;
    private get duration() {
        return Math.max(0, EffectManager.getEffectDuration("RollButton_UpLight") - 0.1);
    }

    protected start(): void {
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_OPEN, this.initNum, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_RUNNING, this.countdownChange, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_PRE_STOP, this.countPreStop, this);
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE, this.countdownEnd, this);
        this.countdownEnd();
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    onClick() {
        if (this._isPlayingEffect) return;
        AudioControlManager.GetInstance().playSfxrollFlash();
        this.playEffect();
        this.playBgEffect();
        this.slotMachine.roll();
    }

    //#region 点击-旋转动画

    playEffect() {
        this._isPlayingEffect = true;
        this.playScaleEffect();
        const pos = this.node.position.clone();
        EffectManager.stopEffect("RollButton_UpLight", this.node.parent);
        EffectManager.stopEffect("RollButton_MidLight", this.node);
        EffectManager.playEffect("RollButton_UpLight", this.node.parent, pos);
        EffectManager.playEffect("RollButton_MidLight", this.node, Vec3.ZERO);
        const midLightNode = EffectManager.getEffectNode("RollButton_MidLight", this.node);
        this.spinOp ??= this.spinNode.getComponent(UIOpacity);
        // 十字光 先放大再缩小
        midLightNode.scale = Vec3.ZERO;
        tween(midLightNode)
            .to(this.duration / 6, { scale: new Vec3(3.2, 1.8, 1.8) })
            .to(this.duration / 8, { scale: new Vec3(1.6, 0.9, 0.9) })
            .call(() => {
                this.playRotateEffect(() => {
                    this._isAutoRotate = true;
                    this._isPlayingEffect = false;
                });
            })
            .to(this.duration / 8, { scale: Vec3.ZERO })
            .start();

        tween(this.spinOp)
            .to(this.duration / 6, { opacity: 0 })
            .start();

        if (GameSpeedManager.GetInstance().speed == E_GAME_SPEED_TYPE.FAST) {
            this._isAutoRotate = false;
        }
    }

    playRotateEffect(onFinish?: () => void) {
        if (GameSpeedManager.GetInstance().speed == E_GAME_SPEED_TYPE.FAST) {
            this.spinOp.opacity = 255;
            onFinish && onFinish();
            return;
        }

        this._isAutoRotate = false;
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
                        const maxLight = 120;
                        if (effectOp && effectOp.isValid) {
                            const fadeOutInProgress = 0.6;
                            if (target.t <= fadeOutInProgress) {
                                effectOp.opacity = (target.t / fadeOutInProgress) * maxLight;
                            } else {
                                effectOp.opacity = ((1 - target.t) / (1 - fadeOutInProgress)) * maxLight;
                            }
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

    public playScaleEffect() {
        const { magnify, shrink, magnify2, shrinkNormal } = GameSpeedManager.GetInstance().getRollButtonRotateSpeedConfig();
        // const startScale = this.node.scale.clone();
        const startScale = Vec3.ONE;
        const node = this.node;
        tween(node)
            .to(magnify, { scale: startScale.clone().multiplyScalar(1.2) }, { easing: easing.quadOut })
            .to(shrink, { scale: startScale.clone().multiplyScalar(0.9) }, { easing: easing.quadInOut })
            .to(magnify2, { scale: startScale.clone().multiplyScalar(1.05) }, { easing: easing.quadOut })
            .to(shrinkNormal, { scale: startScale }, { easing: easing.quadIn })
            .start();
    }

    playBgEffect() {
        const node = this.BgEffectNode;
        node.active = true;
        node.scale = Vec3.ONE.clone().multiplyScalar(0.8);
        const startScale = Vec3.ONE.clone();
        const { bgEffectDuration, bgEffectTurn } = GameSpeedManager.GetInstance().getRollButtonRotateSpeedConfig();

        tween(node)
            .to(bgEffectDuration / 4, { scale: startScale.clone().multiplyScalar(1.01) }, { easing: easing.quadOut })
            .to(bgEffectDuration / 4, { scale: startScale.clone().multiplyScalar(1.02) }, { easing: easing.quadInOut })
            .to(bgEffectDuration / 4, { scale: startScale.clone().multiplyScalar(1.05) }, { easing: easing.quadOut })
            .to(bgEffectDuration / 4, { scale: startScale.clone().multiplyScalar(0.6) }, { easing: easing.quadIn })
            .start();

        const effectOp = node.getComponent(UIOpacity) ?? node.addComponent(UIOpacity);
        const startRotation = node.rotation.clone();
        tween({ t: 0 })
            .to(
                bgEffectDuration,
                { t: 1 },
                {
                    easing: "quadInOut",
                    onUpdate: (target: any) => {
                        const spinPrecent = 0.1;
                        const spinPrecent2 = 0.9;
                        if (effectOp && effectOp.isValid) {
                            if (target.t <= spinPrecent) {
                                effectOp.opacity = target.t * 255 * (1 / spinPrecent);
                            } else if (target.t <= spinPrecent2) {
                            } else {
                                effectOp.opacity = (1 - (target.t - spinPrecent2) / (1 - spinPrecent2)) * 255;
                            }
                        }
                        if (target.t >= 0.2 && target.t <= 0.95) {
                            const additionalRot = new Quat();
                            let t = Math.round(target.t * 60) / 60;
                            Quat.fromAxisAngle(additionalRot, Vec3.FORWARD, Math.PI * bgEffectTurn * t);
                            const currentRot = new Quat();
                            Quat.multiply(currentRot, startRotation, additionalRot);
                            node.rotation = currentRot;
                        }
                    },
                }
            )
            .call(() => {
                node.active = false;
            })
            .start();
    }

    update(deltaTime: number) {
        if (this._isAutoRotate && this.smallButton) {
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

    //#endregion

    //#region 自动模式相关
    private isPlayScroll = false;

    private initNum(times: number) {
        this.updaAutoStopButton(true);
        this.countdownNode.active = true;
        this.spinNode.active = false;
        const countdown = (this.countdown ??= this.countdownNode.getComponent(Countdown));
        countdown.setValue(times);
        this.curShowNum = times;
    }

    private async countdownChange(data: { times: number }) {
        if (this.isPlayScroll) return;
        this.isPlayScroll = true;
        const scrollTime = 0.5;
        AudioControlManager.GetInstance().playSfxtimesScroll();
        this.countdown.playStep(data.times, this.curShowNum, scrollTime);
        this.playBgEffect();
        this.curShowNum = data.times;
        await LogicTools.Delay(scrollTime * 1000);
        this.isPlayScroll = false;
    }

    private async countPreStop() {
        this.updaAutoStopButton(false);
        if (this.isPlayScroll) {
            this.countdown.setNextValue(0);
            return;
        }
        this.isPlayScroll = true;
        const scrollTime = 0.5;
        AudioControlManager.GetInstance().playSfxtimesScroll();
        this.countdown.playStep(0, this.curShowNum, scrollTime);
        this.curShowNum = 0;
        await LogicTools.Delay(scrollTime * 1000);
        this.isPlayScroll = false;
    }

    private async countdownEnd() {
        if (this.isPlayScroll) {
            await this.waitForScrollStop();
        }
        this.countdownNode.active = false;
        this.spinNode.active = true;
        this.BgEffectNode.active = false;
        this.updaAutoStopButton(false);
    }

    private async waitForScrollStop(): Promise<void> {
        return new Promise((resolve) => {
            const checkScroll = () => {
                if (!this.isPlayScroll) {
                    resolve();
                } else {
                    LogicTools.Delay(50).then(checkScroll);
                }
            };

            checkScroll();
        });
    }

    // 自动模式停止
    public async onClickAutoStop() {
        AutoManager.GetInstance().preStopAuto();
        this.playScaleEffect();
    }

    private updaAutoStopButton(isShow: boolean) {
        this.autoStopButton.active = isShow;
    }
    //#endregion
}

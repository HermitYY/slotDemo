import { _decorator, Component, sp, Node, Vec3, game, Quat } from "cc";
import { SpineCommon } from "db://assets/scripts/common/SpineCommon";
import { E_GAME_EVENT, EventManager } from "db://assets/scripts/managers/EventManager";
import { EffectManager } from "../../managers/EffectManager";
import { E_GAME_SCENE_TYPE } from "../../network/SocketManager";
import { UItools } from "../../Tools/UItools";
import { LogicTools } from "../../Tools/LogicTools";
const { ccclass, property } = _decorator;

@ccclass("FreeRole")
export class FreeRole extends Component {
    @property(Node)
    private bowLev1Node: Node = null;
    @property(Node)
    private bowLev2Node: Node = null;
    @property(Node)
    private arrowLevNode: Node = null;

    private curBowLev = 1;
    private curArrowLev = 1;
    private static readonly arrowMaxLev = 4;
    private spineCommon: SpineCommon = null;

    private arrowEffect: Node = null;

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK, this.attack, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK2, this.attack, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_BOW, this.upBowLev, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_ARROW, this.upArrowLev, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_END, this.replayEnd, this);
    }
    start() {
        const spine = this.getComponent(sp.Skeleton)!;
        this.spineCommon = new SpineCommon(spine);

        this.spineCommon.setDefaultIdle(`daiji${this.curBowLev}`);
        this.spineCommon.play(0, `daiji${this.curBowLev}`, true);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    async attack() {
        if (!this.isAlive) return;
        if (this.curArrowLev === 1 && !EffectManager.isEffectActive("Arrow1")) {
            EffectManager.playEffect("Arrow1", this.arrowLevNode, Vec3.ZERO);
            this.arrowEffect = EffectManager.getEffectNode(`Arrow1`, this.arrowLevNode);
        }
        this.spineCommon.play(0, `shejian${this.curBowLev}`, false);
        if (!this.arrowEffect || !this.arrowEffect.isValid) return;
        const worldPos = this.arrowEffect.getWorldPosition(new Vec3());
        const worldRot = this.arrowEffect.getWorldRotation(new Quat());
        const dir = new Vec3(1, 0, 0);
        Vec3.transformQuat(dir, dir, worldRot);
        dir.multiplyScalar(10);
        worldPos.add(dir);
        await LogicTools.Delay(650);
        if (!this.isAlive) return;
        UItools.moveEffectWorld(this.arrowEffect, worldPos.add(dir), "", 0.2, { target: this.arrowEffect, autoDestroy: false });
        await LogicTools.Delay(200);
        if (!this.isAlive) return;
        this.stopArrowEffect();
        this.spineCommon.queue(0, `huijian${this.curBowLev}`, false);
        this.spineCommon.queue(0, "daiji1", true);
        this.curBowLev = 1;
        this.curArrowLev = 1;
    }

    private async upBowLev(data: { lev: number }) {
        if (!this.isAlive) return;
        await EffectManager.playEffect(`BowBreakOut${this.curBowLev}`, this.bowLev1Node, Vec3.ZERO);
        EffectManager.playEffect(`BowLevUp${this.curBowLev}`, this.bowLev2Node, Vec3.ZERO);
        await new Promise((resolve) => setTimeout(resolve, EffectManager.getEffectDuration(`BowLevUp${this.curBowLev}`) * 50));
        this.spineCommon.playFromToBack(0, `daiji${this.curBowLev}`, `shengji${this.curBowLev}~${data.lev}`, `daiji${data.lev}`, 0, 0, true);
        this.curBowLev = data.lev;
    }

    async upArrowLev(data: { arrowLev: number }) {
        if (!this.isAlive) return;
        this.stopArrowEffect();
        this.curArrowLev = Math.min(data.arrowLev, FreeRole.arrowMaxLev);
        EffectManager.playEffect(`Arrow${this.curArrowLev}`, this.arrowLevNode, Vec3.ZERO);
        this.arrowEffect = EffectManager.getEffectNode(`Arrow${this.curArrowLev}`, this.arrowLevNode);
    }

    stopArrowEffect() {
        for (let index = 1; index <= FreeRole.arrowMaxLev; index++) {
            EffectManager.stopEffect(`Arrow${index}`, this.arrowLevNode);
        }
    }

    onDisable() {
        this.replayEnd();
    }

    replayEnd() {
        this.stopArrowEffect();
        this.curArrowLev = 1;
        this.curBowLev = 1;
        this.spineCommon.play(0, `daiji${this.curBowLev}`, true);
    }

    private get isAlive(): boolean {
        return !!this.node && this.node.isValid && this.node.activeInHierarchy;
    }
}

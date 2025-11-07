import { _decorator, Component, sp, Node, Vec3, game } from "cc";
import { SpineCommon } from "db://assets/scripts/common/SpineCommon";
import { E_GAME_EVENT, EventManager } from "db://assets/scripts/managers/EventManager";
import { EffectManager } from "../../managers/EffectManager";
const { ccclass, property } = _decorator;

@ccclass("NormalRole")
export class NormalRole extends Component {
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

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK, this.attack, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK2, this.attack, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_BOW, this.upBowLev, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_ARROW, this.upArrowLev, this);
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

    async attack(data: { times: number }) {
        if (!this.isAlive) return;
        if (this.curArrowLev === 1 && !EffectManager.isEffectActive("Arrow1")) {
            EffectManager.playEffect("Arrow1", this.arrowLevNode, Vec3.ZERO);
        }
        await this.spineCommon.playFromToBack(0, `daiji${this.curBowLev}`, `shejian${this.curBowLev}`, `huijian${this.curBowLev}`, 0, 0, false);
        this.spineCommon.queue(0, "daiji1", true);
        EventManager.emit(E_GAME_EVENT.GAME_MORO_ATTACK_END, { times: data.times });
        this.curBowLev = 1;
        this.curArrowLev = 1;
        this.stopArrowEffect();
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
        this.curArrowLev = Math.min(data.arrowLev, NormalRole.arrowMaxLev);
        EffectManager.playEffect(`Arrow${this.curArrowLev}`, this.arrowLevNode, Vec3.ZERO);
    }

    stopArrowEffect() {
        for (let index = 1; index <= NormalRole.arrowMaxLev; index++) {
            EffectManager.stopEffect(`Arrow${index}`, this.arrowLevNode);
        }
    }

    private get isAlive(): boolean {
        return !!this.node && this.node.isValid && this.node.activeInHierarchy;
    }
}

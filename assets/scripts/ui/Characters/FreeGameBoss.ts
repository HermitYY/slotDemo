import { _decorator, Component, sp, Node, Vec3, tween, game } from "cc";
import { SpineCommon } from "../../common/SpineCommon";
import { EffectManager } from "../../managers/EffectManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { E_GAME_SCENE_TYPE } from "../../network/SocketManager";
import { LogicTools } from "../../Tools/LogicTools";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("FreeGameBoss")
export class FreeGameBoss extends Component {
    private spineCommon: SpineCommon = null;

    @property(Node)
    private BodyNode: Node = null;
    @property(Node)
    private MountPos: Node = null;
    @property(Node)
    private MountPos2: Node = null;

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK2, this.arrowAttackEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK, this.arrowAttackEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_END, this.replayEnd, this);
    }

    start() {
        const spine = this.getComponent(sp.Skeleton)!;
        this.spineCommon = new SpineCommon(spine);

        this.spineCommon.setDefaultIdle(`待机`);
        this.spineCommon.play(0, "待机", true);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    // async beAttacked() {
    //     this.spineCommon.play(0, "挑衅", false);
    //     await LogicTools.Delay(565);
    //     EffectManager.playEffect("MonsterHurt", this.BodyNode, Vec3.ZERO);
    //     await this.spineCommon.play(0, "被射中后退", false);
    //     EffectManager.playEffect("FreeMasterMidFrie", this.MountPos, Vec3.ZERO);
    //     await this.spineCommon.play(0, "喷火", false);
    //     EffectManager.playEffect("FreeMasterSmellFrie", this.MountPos2, Vec3.ZERO);
    //     this.spineCommon.queue(0, "待机", true);
    // }

    async arrowAttackEffect() {
        if (!this.isAlive) return;
        await LogicTools.Delay(300);
        this.beAttacked();
    }

    private get isAlive(): boolean {
        return !!this.node && this.node.isValid && this.node.activeInHierarchy;
    }

    private async wait(ms: number): Promise<boolean> {
        await LogicTools.Delay(ms);
        return this.isAlive;
    }

    async beAttacked() {
        if (!this.isAlive) return;
        this.spineCommon.play(0, "挑衅", false);
        if (!(await this.wait(565))) return;
        AudioControlManager.GetInstance().playSfxMonsterHit();
        EffectManager.playEffect("MonsterHurt", this.BodyNode, Vec3.ZERO);
        if (!this.isAlive) return;
        await this.spineCommon.play(0, "被射中后退", false);
        if (!this.isAlive) return;
        EffectManager.playEffect("FreeMasterMidFrie", this.MountPos, Vec3.ZERO);
        if (!this.isAlive) return;
        await this.spineCommon.play(0, "喷火", false);
        if (!this.isAlive) return;
        EffectManager.playEffect("FreeMasterSmellFrie", this.MountPos2, Vec3.ZERO);
        if (!this.isAlive) return;
        this.spineCommon.queue(0, "待机", true);
    }

    replayEnd() {
        this.spineCommon?.play(0, `待机`, true);
    }
}

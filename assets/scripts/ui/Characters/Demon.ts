import { _decorator, Component, sp, Node, Vec3, tween, game } from "cc";
import { SpineCommon } from "../../common/SpineCommon";
import { EffectManager } from "../../managers/EffectManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { UItools } from "../../Tools/UItools";
import { E_GAME_SCENE_TYPE } from "../../network/SocketManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("Demon")
export class Demon extends Component {
    private spineCommon: SpineCommon = null;
    private arrowLev: number = 1;

    @property(Node)
    private BodyNode: Node = null;
    @property(Node)
    private arrowBeginNode: Node = null;
    @property(Node)
    private arrowEndNode: Node = null;

    private origPos: Vec3 = null;

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_ARROW, this.upArrowLev, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK_END, this.arrowAttackEffect, this);
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

    /** 被攻击后 */
    async beAttacked(comboCount: number) {
        AudioControlManager.GetInstance().playSfxMonsterHit();
        EffectManager.playEffect("MonsterHurt", this.BodyNode, Vec3.ZERO);
        if (comboCount < 4) {
            await this.spineCommon.play(0, "射中", false);
            AudioControlManager.GetInstance().playSfxSnicker();
            await this.spineCommon.play(0, `挑衅`, false);
            this.spineCommon.queue(0, "待机", true);
        } else {
            AudioControlManager.GetInstance().playSfxDemonDie();
            await this.spineCommon.play(0, "射穿", false);
            await EffectManager.playEffect("MonsterDie", this.BodyNode, Vec3.ZERO);
            const container = this.node;
            this.origPos = container.position.clone();
            container.setPosition(this.origPos.x + 350, this.origPos.y);
            await this.spineCommon.play(0, "复活", false);
            container.setPosition(this.origPos);
            this.spineCommon.queue(0, "待机", true);
        }
        this.arrowLev = 1;
    }

    async arrowAttackEffect(data: { times: number }) {
        if (!this.isAlive) return;
        if (this.arrowLev == 1) {
            UItools.moveEffectWorld(this.arrowBeginNode, this.arrowEndNode, `ArrowBase`, 0.2, {
                easing: "quadIn",
                newTarget: this.node,
                scale: new Vec3(1.5, 1.5, 1),
                offsetPosition: new Vec3(40, 0, 0),
            });
        }
        await UItools.moveEffectWorld(this.arrowBeginNode, this.arrowEndNode, `Arrow${this.arrowLev}`, 0.2, {
            easing: "quadIn",
            newTarget: this.node,
            scale: new Vec3(1.5, 1.5, 1),
        });

        this.beAttacked(data.times);
    }

    private upArrowLev(data: { arrowLev: number }) {
        if (!this.isAlive) return;
        this.arrowLev = data.arrowLev;
    }

    private get isAlive(): boolean {
        return !!this.node && this.node.isValid && this.node.activeInHierarchy;
    }

    replayEnd() {
        this.arrowLev = 1;
        this.spineCommon.play(0, `待机`, true);
        const container = this.node;
        this.origPos && container.setPosition(this.origPos);
    }
}

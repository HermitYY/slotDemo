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

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_MORO_UPGRADE_ARROW, this.upArrowLev, this);
        EventManager.on(E_GAME_EVENT.GAME_MORO_ATTACK_END, this.arrowAttackEffect, this);
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
            await this.spineCommon.play(0, "射穿", false);
            await EffectManager.playEffect("MonsterDie", this.BodyNode, Vec3.ZERO);
            const container = this.node;
            const origPos = container.position.clone();
            container.setPosition(origPos.x + 350, origPos.y);
            await this.spineCommon.play(0, "复活", false);
            container.setPosition(origPos);
            this.spineCommon.queue(0, "待机", true);
        }
        this.arrowLev = 1;
    }

    async arrowAttackEffect(data: { times: number }) {
        if (!this.isAlive) return;
        await UItools.moveEffectWorld(this.arrowBeginNode, this.arrowEndNode, `Arrow${this.arrowLev}`, 0.2, {
            // scale: this.node.scale,
            easing: "quadIn",
            newTarget: this.node,
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
}

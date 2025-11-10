import { _decorator, Component, Label, Sprite, SpriteFrame, tween, UITransform, Vec3, Node } from "cc";
import { EffectManager } from "../managers/EffectManager";
import { UItools } from "../Tools/UItools";
import { LogicTools } from "../Tools/LogicTools";
import { GridManager } from "../managers/GridManager";
import { AudioControlManager } from "../managers/AudioControlManager";

const { ccclass, property } = _decorator;

@ccclass("SlotItem")
export class SlotItem extends Component {
    @property([SpriteFrame])
    public icons: SpriteFrame[] = []; // 对应图案
    @property(Node)
    private MultipleLabelNode: Node = null;

    private static readonly selectId = 15;
    private id: number = 0;
    private _inited = false;
    private exShowCfg: {
        isSelect?: boolean;
        row?: number;
        column?: number;
        myGridIndex?: number;
    } = null;

    // 默认比例表
    public static fillRatios: [number, number][] = [
        [1, 1], // NONE
        [0.6, 0.8], // id1 9
        [0.6, 0.7], // id2 J
        [0.7, 0.7], // id3 Q
        [0.7, 0.7], // id4 K
        [0.7, 0.8], // id5 A
        [1.4, 1.4], // id6 魔王 有牙
        [1.9, 1.7], // id7 神猴
        [1.6, 1.5], // id8 鸟王
        [2.3, 2.3], // id9 希多
        [1.1, 1.1], // id10 绿宝石 倍率
        [1.1, 1.1], // 绿宝石 展翅
        [1, 1], // NONE
        [1, 1], // NONE
        [1.9, 1.8], // id14 王子
    ];

    protected onDestroy(): void {
        this.stopLoopEffect();
    }

    protected onLoad(): void {
        this._inited = true;
        if (this.id !== 0) {
            this.setup();
        }
    }

    public SetData(
        id: number,
        exShowCfg?: {
            isSelect?: boolean;
            row?: number;
            column?: number;
            myGridIndex?: number;
        }
    ) {
        this.id = id;
        if (exShowCfg) {
            this.exShowCfg = exShowCfg;
        }
        if (this._inited) {
            this.setup();
        }
    }
    private setup() {
        const sprite = this.getComponent(Sprite);
        if (!sprite) return;
        sprite.spriteFrame = this.icons[this.id];
        const tf = this.getComponent(UITransform);
        if (tf) {
            const ratio = GridManager.fillRatios[this.id] || [1, 1];
            const cellW = 80;
            const cellH = 78;
            tf.setContentSize(cellW * ratio[0], cellH * ratio[1]);
        }
        this._inited = true;
    }

    /** 瓢虫多倍效果 */
    public async LadybirdMultipleEffect(
        needPlayEffectArr: Array<{
            index: string | number;
            multiple: string | number;
        }>,
        isPlayVoice = true
    ): Promise<void> {
        if (this.id !== 10) return;

        EffectManager.playEffect("SlotEffectClear_10", this.node, Vec3.ZERO, { siblingIndex: 0 });
        const selfIndex = this.exShowCfg.myGridIndex ?? this.exShowCfg.row * GridManager.GetInstance().cols + this.exShowCfg.column;
        const myItem = needPlayEffectArr.find((item) => item.index == `${selfIndex}`);
        if (!myItem || !this.MultipleLabelNode) return;
        this.MultipleLabelNode.getComponent(Label).string = "x" + myItem.multiple.toString();
        if (isPlayVoice) {
            AudioControlManager.GetInstance().playSfxBeetleMultipleShow();
        }
        await LogicTools.Delay((EffectManager.getEffectDuration("SlotEffectClear_10") / 2) * 1000);
        if (!this.MultipleLabelNode) return;
        this.MultipleLabelNode.active = true;
        this.MultipleLabelNode.scale = Vec3.ZERO;
        await new Promise<void>((resolve) => {
            tween(this.MultipleLabelNode)
                .to(0.3, { scale: new Vec3(1.4, 1.4, 1) })
                .to(0.15, { scale: new Vec3(1.1, 1.1, 1) })
                .call(() => {
                    resolve();
                })
                .start();
        });
    }

    public historyDetailSelectedEffect() {
        if (this?.exShowCfg?.isSelect) {
            // 获取当前节点的UITransform
            const itemTransform = this.getComponent(UITransform);
            if (!itemTransform) return;
            if (this.id == 14) {
                EffectManager.playEffect(`SlotEffectClear_${this.id}`, this.node, Vec3.ZERO);
                return;
            }
            // 创建选中效果节点（作为子节点）
            const newNode = UItools.addSpriteLayer(this.icons[SlotItem.selectId], this.node);
            const selectTransform = newNode.getComponent(UITransform);
            // const baseSize = Math.max(itemTransform.contentSize.width, itemTransform.contentSize.height);
            const baseSize = 64;
            const targetWidth = this.id != 9 ? baseSize * 1.73 : baseSize * 2;
            const targetHigh = this.id != 9 ? baseSize * 1.73 : baseSize * 2;
            selectTransform.setContentSize(targetWidth, targetHigh);
            // 确保锚点在中心
            selectTransform.setAnchorPoint(0.5, 0.5);
            // 动画效果
            newNode.scale = new Vec3(1.3, 1.3);
            tween(newNode).to(0.3, { scale: Vec3.ONE }).start();
        }
    }

    //#region 随机闪光特效

    private loopEffect = false;
    private startLoopEffect() {
        this.loopEffect = true;
        const sprite = this.getComponent(Sprite);
        if (!sprite) return;
        const loop = () => {
            const delay = 4 + Math.random() * 100;
            this.scheduleOnce(async () => {
                // EffectManager.playEffect(`SlotEffect_${this.id}`, this.node, Vec3.ZERO);
                try {
                    // sprite.enabled = false;
                    await EffectManager.playEffect("SlotEffect_flash", this.node.parent, Vec3.ZERO, { siblingIndex: 0 });
                } finally {
                    // EffectManager.stopEffect(`SlotEffect_${this.id}`, this.node);
                    // sprite.enabled = true;
                }
                loop();
            }, delay);
        };
        loop();
    }

    public stopLoopEffect() {
        this.loopEffect = false;
        this.unscheduleAllCallbacks();
    }

    //#endregion
}

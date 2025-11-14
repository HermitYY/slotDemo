import { _decorator, Component, Node, Prefab, instantiate, tween, Vec3, UITransform, UIOpacity, Tween } from "cc";
import { HistoryItem } from "./HistoryItem";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
import { E_GAME_SCENE_TYPE } from "../network/SocketManager";
import { EffectManager } from "../managers/EffectManager";
import { LogicTools } from "../Tools/LogicTools";
import { AudioControlManager } from "../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("HistoryItemList")
export class HistoryItemList extends Component {
    @property(Prefab)
    public historyItemPrefab: Prefab = null;

    @property
    public maxCount: number = 4;

    @property
    public spacing: number = 10;

    private _items: HistoryItem[] = [];

    private normalModeHistoryCachePos: Vec3 = null;

    private _timer: number = null;

    /** 容器动画恢复用的计时器 */
    private _recoverTimer: any = null;

    /** 记录单项高度缓存 */
    private _itemHeightCache: number = 0;

    /** 父容器的目标 Y（累计，下移用） */
    private _containerTargetY: number = -83;

    onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.clearHistory, this);
        EventManager.on(E_GAME_EVENT.GAME_FREE_INIT, this.clearHistory, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY_RETURN, this.clearHistory, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_END, this.clearHistory, this);
        EventManager.on(E_GAME_EVENT.GAME_COMBO_HISTORY_ADD, this.addHistory, this);
        EventManager.on(E_GAME_EVENT.GAME_MODE_TOGGLE, this.gameModeToggle, this);
    }

    protected start(): void {
        this.normalModeHistoryCachePos = this.normalModeHistoryCachePos ??= this.node.parent.parent.position.clone();
        this.playPNGIconEffect();
    }

    onDestroy(): void {
        EventManager.removeAllByTarget(this);
        clearInterval(this._timer);
    }

    /** 添加一条历史记录 */
    /** 添加一条历史记录 */
    private async addHistory(awardInfo: any) {
        if (!this.historyItemPrefab) return;

        const node = instantiate(this.historyItemPrefab);
        const comp = node.getComponent(HistoryItem)!;
        comp.SetData(awardInfo);

        const ui = node.getComponent(UITransform);
        const itemHeight = ui ? ui.height * node.scale.y : this._itemHeightCache || 100;
        this._itemHeightCache = itemHeight;

        // 计算新节点初始位置（在最上方）
        const lastItem = this._items[this._items.length - 1];
        const startY = (lastItem?.node?.position?.y ?? 0) + itemHeight * 3.6;
        node.setPosition(0, startY, 0);
        node.setScale(node.scale);

        const opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
        opacity.opacity = 0;

        this.node.addChild(node);
        this._items.push(comp);

        // 超出数量则容器整体下移
        if (this._items.length > this.maxCount) {
            const old = this._items[0];
            this._fadeOutAndRemove(old.node, itemHeight);
        }
        await LogicTools.Delay(150);

        // 执行下落弹入动画
        this._dropInEffect(node, node.scale.clone(), itemHeight);

        // 延迟整理布局
        if (this._recoverTimer) clearTimeout(this._recoverTimer);
        this._recoverTimer = setTimeout(() => this._restoreLayout(), 4000);
    }

    /** 空闲间隙统一清理与重排布局 */
    private _restoreLayout() {
        if (this._items.length === 0) return;

        const itemHeight = this._itemHeightCache || 100;

        // 删除多余项
        while (this._items.length > this.maxCount) {
            const old = this._items.shift();
            if (old && old.node && old.node.isValid) {
                old.node.destroy();
            }
        }

        // 重置容器位置
        this._containerTargetY = -83;
        this.node.setPosition(0, -83, 0);

        // 按顺序重新排列所有可见节点
        for (let i = 0; i < this._items.length; i++) {
            const it = this._items[i];
            const node = it.node;
            Tween.stopAllByTarget(node);
            node.setPosition(0, i * (itemHeight + this.spacing), 0);
        }
    }

    /** 清除所有历史记录 */
    private clearHistory(withAnimation: boolean = true) {
        if (this._items.length === 0) return;
        const items = [...this._items];
        this._items.length = 0;
        if (withAnimation) {
            for (let i = 0; i < items.length; i++) {
                const node = items[i].node;
                const opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
                Tween.stopAllByTarget(node);
                Tween.stopAllByTarget(opacity);
                const startPos = node.position.clone();
                const targetPos = startPos.clone().add(new Vec3(0, -150, 0));
                tween(node)
                    .to(0.25, { position: targetPos }, { easing: "cubicIn" })
                    .call(() => node.destroy())
                    .start();

                tween(opacity).to(0.25, { opacity: 0 }).start();
            }
        } else {
            for (let i = 0; i < items.length; i++) {
                items[i].node.destroy();
            }
        }
        if (this._recoverTimer) {
            clearTimeout(this._recoverTimer);
        }
        const container = this.node;
        Tween.stopAllByTarget(container);
        this._containerTargetY = -83;
        this.node.setPosition(0, -83, 0);
    }

    /** 下落 + 弹跳 + 淡入 */
    private _dropInEffect(node: Node, originScale: Vec3, itemHeight: number) {
        AudioControlManager.GetInstance().playSfxqElastic();
        Tween.stopAllByTarget(node);

        const opacity = node.getComponent(UIOpacity)!;
        Tween.stopAllByTarget(opacity);

        const targetY = this._items.indexOf(node.getComponent(HistoryItem)!) * (itemHeight + this.spacing);
        const overshoot = -itemHeight * 0.12;

        tween(node)
            .to(0.25, { position: new Vec3(0, targetY + overshoot, 0) }, { easing: "cubicOut" })
            .to(0.08, { position: new Vec3(0, targetY, 0) }, { easing: "bounceOut" })
            .call(() => this._playBounce(node, originScale))
            .start();

        tween(opacity).to(0.25, { opacity: 255 }).start();
    }

    /** 让容器累计下移到一个目标 Y */
    private _fadeOutAndRemove(_node: Node, itemHeight: number) {
        const container = this.node;
        const moveDist = itemHeight + this.spacing;
        this._containerTargetY -= moveDist;
        // Tween.stopAllByTarget(container);
        tween(container)
            .to(0.25, { position: new Vec3(0, this._containerTargetY, 0) }, { easing: "cubicOut" })
            .start();
    }

    /** 果冻弹跳 */
    private _playBounce(node: Node, originScale: Vec3) {
        Tween.stopAllByTarget(node);
        const s1 = new Vec3(originScale.x * 1.08, originScale.y * 0.92, 1);
        const s2 = new Vec3(originScale.x * 0.96, originScale.y * 1.04, 1);
        tween(node).to(0.09, { scale: s1 }).to(0.09, { scale: s2 }).to(0.09, { scale: originScale }).start();
    }

    gameModeToggle(mode: E_GAME_SCENE_TYPE) {
        mode == E_GAME_SCENE_TYPE.NORMAL ? this.node.parent.parent.setPosition(this.normalModeHistoryCachePos) : this.node.parent.parent.setPosition(new Vec3(-0, -400, 0));
    }

    private playPNGIconEffect() {
        EffectManager.playEffect("PNGIcon", this.node.parent.parent, new Vec3(5, 85));
        this._timer = setInterval(() => {
            EffectManager.stopEffect("PNGIcon", this.node.parent.parent);
            EffectManager.playEffect("PNGIcon", this.node.parent.parent, new Vec3(5, 85));
        }, 10000);
    }
}

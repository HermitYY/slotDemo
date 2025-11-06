import { _decorator, Component, Node, Prefab, instantiate, tween, Vec3, UITransform, UIOpacity, Tween } from "cc";
import { HistoryItem } from "./HistoryItem";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
import { E_GAME_SCENE_TYPE } from "../network/SocketManager";
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
    }

    onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    /** 添加一条历史记录 */
    private addHistory(awardInfo: any) {
        if (!this.historyItemPrefab) return;

        // 创建新节点
        const node = instantiate(this.historyItemPrefab);
        const comp = node.getComponent(HistoryItem)!;
        comp.SetData(awardInfo);

        // 原始缩放
        const originScale = node.scale.clone();
        const ui = node.getComponent(UITransform);
        const itemHeight = ui ? ui.height * originScale.y : 100;

        // 计算新节点初始位置（在最上方）
        const startY = this._items.length > 0 ? this._items[this._items.length - 1].node.position.y + itemHeight * 1.6 : 0;
        node.setPosition(0, startY, 0);
        node.setScale(originScale);

        const opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
        opacity.opacity = 0;
        this.node.addChild(node);
        this._items.push(comp);

        // 超出数量，移除最旧的那个
        if (this._items.length > this.maxCount) {
            const old = this._items.shift();
            if (old) this._fadeOutAndRemove(old.node, itemHeight);
        }

        // 重新布局剩下的所有节点
        this._rearrangeItems(itemHeight);

        // 对新节点执行下落 + 弹跳 + 淡入
        this._dropInEffect(node, originScale, itemHeight);
    }

    /** 清除所有历史记录 */
    private clearHistory(withAnimation: boolean = true) {
        if (this._items.length === 0) return;

        // 复制数组，避免在循环中修改原数组
        const items = [...this._items];
        this._items.length = 0;

        if (withAnimation) {
            // 带淡出动画的清除
            for (let i = 0; i < items.length; i++) {
                const node = items[i].node;
                const opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
                Tween.stopAllByTarget(node);
                Tween.stopAllByTarget(opacity);

                tween(node)
                    .to(0.25, { position: new Vec3(0, -80, 0) }, { easing: "cubicIn" })
                    .call(() => node.destroy())
                    .start();

                tween(opacity).to(0.25, { opacity: 0 }).start();
            }
        } else {
            // 直接清除（无动画）
            for (let i = 0; i < items.length; i++) {
                items[i].node.destroy();
            }
        }
    }

    /** 下落 + 弹跳 + 淡入 */
    private _dropInEffect(node: Node, originScale: Vec3, itemHeight: number) {
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

    /** 从下往上排列所有 items */
    private _rearrangeItems(itemHeight: number) {
        const total = this._items.length;
        for (let i = 0; i < total; i++) {
            const it = this._items[i];
            const node = it.node;

            Tween.stopAllByTarget(node);
            const targetY = i * (itemHeight + this.spacing);

            tween(node)
                .to(0.25, { position: new Vec3(0, targetY, 0) }, { easing: "cubicOut" })
                .start();
        }
    }

    /** 被挤掉的旧节点淡出下滑销毁 */
    private _fadeOutAndRemove(node: Node, itemHeight: number) {
        Tween.stopAllByTarget(node);

        const opacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
        Tween.stopAllByTarget(opacity);

        tween(node)
            .to(0.32, { position: new Vec3(0, -itemHeight * 1.2, 0) }, { easing: "cubicIn" })
            .call(() => node.destroy())
            .start();

        tween(opacity).to(0.32, { opacity: 0 }).start();
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
}

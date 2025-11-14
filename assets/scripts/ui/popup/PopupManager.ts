import { Node, Prefab, instantiate, UITransform, Widget, TweenEasing, Color, assetManager, resources } from "cc";
import { BasePopup, PopupShowType } from "./BasePopup";
import { PopupLayer } from "./BasePopup";
import { Singleton } from "../../common/Singleton";

export const enum E_POPUP_TYPE {
    Tips = "prefabs/Popup/PopupTips",
    HistoryDetail = "prefabs/Popup/PopupHistoryDetail",
    Mask = "prefabs/Popup/PopupMask",
    FreeResults = "prefabs/Popup/PopupFreeResults",
    AutoBuy = "prefabs/Popup/PopupAutoBuy",
    BuyFreeGame = "prefabs/Popup/PopupBuyFreeGame",
    SelectChips = "prefabs/Popup/PopupSelectChips",
    Setting = "prefabs/Popup/PopupSetting",
    Replay = "prefabs/Popup/PopupReplay",
    Rule = "prefabs/Popup/PopupRule",
    HistoryList = "prefabs/Popup/PopupHistoryList",
}

type createPopupCfg = {
    layer?: PopupLayer;
    fromButtonPos?: any;
    curstomAniCfg?: {
        customAniOut?: TweenEasing;
        customAniIn?: TweenEasing;
    };
    maskOpacity?: number;
    maskColor?: Color;
    changeShowType?: PopupShowType;
};

export class PopupManager extends Singleton {
    private static _root: Node | null = null;
    private static _layerRoots: Record<PopupLayer, Node> = {} as any;
    private static _prefabCache: Map<E_POPUP_TYPE, Prefab> = new Map();
    public static init(root: Node) {
        this._root = root;
        this._createLayers();
    }

    private static _createLayers() {
        if (!this._root) return;

        const rootUI = this._root.getComponent(UITransform);
        if (!rootUI) {
            console.error("PopupManager root 节点缺少 UITransform");
            return;
        }

        const rootSize = rootUI.contentSize;

        for (const layer of [PopupLayer.C, PopupLayer.B, PopupLayer.History, PopupLayer.A]) {
            const node = new Node(`Layer_${PopupLayer[layer]}`);
            const ui = node.addComponent(UITransform);
            ui.setContentSize(rootSize);
            node.parent = this._root;
            const widget = node.addComponent(Widget);
            widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
            widget.top = widget.bottom = widget.left = widget.right = 0;

            this._layerRoots[layer] = node;
        }
    }

    private static _loadPrefab(path: E_POPUP_TYPE): Promise<Prefab> {
        return new Promise((resolve, reject) => {
            const bundle = assetManager.getBundle("game");
            if (!bundle) {
                return reject("Bundle game 未加载");
            }

            const cached = this._prefabCache.get(path);
            if (cached) {
                resolve(cached);
                return;
            }

            bundle.load(path, Prefab, (err, prefab) => {
                if (err) return reject(err);
                this._prefabCache.set(path, prefab);
                resolve(prefab);
            });
        });
    }

    public static create<T extends BasePopup>(prefab: Prefab, options?: createPopupCfg): Promise<T>;
    public static create<T extends BasePopup>(type: E_POPUP_TYPE, options?: createPopupCfg): Promise<T>;
    public static async create<T extends BasePopup>(arg: Prefab | E_POPUP_TYPE, options?: createPopupCfg): Promise<T> {
        let prefab: Prefab;

        if (typeof arg === "string") {
            prefab = await this._loadPrefab(arg);
        } else {
            prefab = arg;
        }

        const node = instantiate(prefab);
        const comp = node.getComponent(BasePopup) as T;
        if (!comp) throw new Error("Prefab 缺少 BasePopup 组件");

        if (options?.layer != null) {
            comp.layer = options.layer;
        }

        const layer = comp.layer;
        const layerRoot = this._layerRoots[layer] || this._layerRoots[PopupLayer.C];
        layerRoot.addChild(node);

        comp.setPopupCfg({
            aniCfg: options?.curstomAniCfg,
            worldPos: options?.fromButtonPos,
            maskOpacity: options?.maskOpacity,
            maskColor: options?.maskColor,
            changeShowType: options?.changeShowType,
        });

        node.setSiblingIndex(layerRoot.children.length - 1);

        return comp;
    }

    /** 打开弹窗 prefab */
    public static async show(prefab: Prefab, options?: createPopupCfg): Promise<BasePopup>;
    public static async show(type: E_POPUP_TYPE, options?: createPopupCfg): Promise<BasePopup>;
    public static async show(arg: Prefab | E_POPUP_TYPE, options?: createPopupCfg): Promise<BasePopup> {
        let prefab: Prefab;

        if (typeof arg === "string") {
            prefab = await this._loadPrefab(arg);
        } else {
            prefab = arg;
        }
        const comp = await this.create(prefab, options);
        await comp.show();
        return comp;
    }

    /** 通常不需要释放 */
    public static release(path: E_POPUP_TYPE) {
        if (!this._prefabCache.has(path)) return;
        const bundle = assetManager.getBundle("game");
        if (!bundle) {
            console.warn("Bundle game 未加载,无法释放");
            return;
        }
        bundle.release(path);
        // 删除缓存引用
        this._prefabCache.delete(path);
        console.log(`PopupManager: 已释放 prefab ${path} 资源 `);
    }

    public static clearAll() {
        for (const key in this._layerRoots) {
            this._layerRoots[key].removeAllChildren();
        }
    }

    /** 暂时隐藏某层级弹窗 */
    public static hideLayer(layer: PopupLayer) {
        const layerRoot = this._layerRoots[layer];
        if (!layerRoot) return;
        layerRoot.setScale(0, 0, 1);
    }

    /** 恢复某层级弹窗 */
    public static showLayer(layer: PopupLayer) {
        const layerRoot = this._layerRoots[layer];
        if (!layerRoot) return;
        layerRoot.setScale(1, 1, 1);
    }
}

(window as any).PopupManager = PopupManager;

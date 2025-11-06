import { Node, Prefab, instantiate, UITransform, Widget, TweenEasing, Color } from "cc";
import { BasePopup, PopupShowType } from "./BasePopup";
import { PopupLayer } from "./BasePopup";
import { Singleton } from "../../common/Singleton";

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

    public static create<T extends BasePopup>(prefab: Prefab, options?: createPopupCfg): T {
        if (!this._root) throw new Error("PopupManager 未初始化 root");

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
    public static async show(prefab: Prefab, options?: createPopupCfg): Promise<BasePopup> {
        const comp = this.create(prefab, options);
        await comp.show();
        return comp;
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

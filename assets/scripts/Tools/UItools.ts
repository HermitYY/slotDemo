// import { _decorator, Label, tween, Tween } from "cc";
import { _decorator, Component, Node, Label, tween, Tween, UITransform, SpriteFrame, Sprite, Mask, Graphics, Vec3, TweenEasing, find, Quat } from "cc";
import { Singleton } from "../common/Singleton";
import { EffectManager } from "../managers/EffectManager";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
type Constructor<T> = new (...args: any[]) => T;
const { ccclass } = _decorator;

/**
 * 通用UI工具类
 */
@ccclass("UItools")
export class UItools extends Singleton {
    /**
     * 数值显示为英式货币格式（支持跳变）
     * @param value 目标数值
     * @param label Label组件
     * @param animated 是否跳变显示（默认true）
     * @param duration 跳变持续时间(毫秒)，默认500
     * @param forceDecimal 是否强制保留两位小数，默认false
     * @param isThanMinNoAnimated 是否小于当前值时，不跳变
     */
    public showCurrencyValue(value: number, label: Label, animated: boolean = true, duration: number = 500, forceDecimal: boolean = false, isThanMinNoAnimated: boolean = true) {
        if (!label) {
            console.warn("Label 未传入");
            return;
        }

        // 当前数值（从Label里读取）
        const current = parseFloat(label.string.replace(/\./g, "")) || 0;

        // 不跳变，直接显示
        if (!animated || (isThanMinNoAnimated && value < current)) {
            label.string = this.formatCurrency(value, forceDecimal);
            return;
        }

        // 停止当前tween
        Tween.stopAllByTarget(label);

        // 使用中间对象承载数值
        const temp = { n: current };
        tween(temp)
            .to(
                duration / 1000,
                { n: value },
                {
                    onUpdate: () => {
                        let v = temp.n;
                        if (!forceDecimal) {
                            v = Math.floor(v);
                        }
                        label.string = this.formatCurrency(v, forceDecimal);
                    },
                }
            )
            .start();
    }

    /**
     * 英式货币格式化：1234567.89 => "1,234,567.89"
     * @param num 数字
     * @param forceDecimal 是否强制保留两位小数（默认 false)
     */
    public formatCurrency(num: number, forceDecimal: boolean = false): string {
        if (isNaN(num)) return "0.00";

        let formatted: string;
        if (!forceDecimal && Number.isInteger(num)) {
            // 整数，不保留小数
            formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            // 非整数或强制保留两位小数
            formatted = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return formatted;
    }

    /**
     * 在父节点链中查找组件
     * @param node 起始节点
     * @param componentType 组件类型（类名）
     * @returns 找到的组件或 null
     */
    public static getComponentInParent<T extends Component>(node: Node, componentType: Constructor<T>): T | null {
        let parent = node.parent;
        while (parent) {
            const comp = parent.getComponent(componentType);
            if (comp) return comp;
            parent = parent.parent;
        }
        return null;
    }

    /**
     * 在子节点中查找组件（深度优先）
     * @param node 起始节点
     * @param componentType 组件类型
     * @returns 找到的组件或 null
     */
    public static getComponentInChildren<T extends Component>(node: Node, componentType: Constructor<T>): T | null {
        const comp = node.getComponent(componentType);
        if (comp) return comp;

        for (let child of node.children) {
            const childComp = this.getComponentInChildren(child, componentType);
            if (childComp) return childComp;
        }

        return null;
    }

    /**
     * 给一个节点增加一个额外的 sprite 图层
     * @param frame 要显示的 SpriteFrame
     * @param targetNode 目标节点
     * @param attachToSelf 是否直接挂在自身节点（若已有UIRenderable则自动建子节点）
     * @returns 创建出来的实际节点（可能是 targetNode 或子节点）
     */
    public static addSpriteLayer(frame: SpriteFrame, targetNode: Node, attachToSelf: boolean = false): Node {
        if (!frame || !targetNode) {
            console.warn("[UItools.addSpriteLayer] 参数不完整");
            return null!;
        }

        // 如果指定挂到自身，但自身已有渲染组件，则强制新建子节点
        let actualNode = targetNode;
        const existsRenderable = targetNode.getComponent(Sprite) || targetNode.getComponent(Label) || targetNode.getComponent(Mask) || targetNode.getComponent(Graphics);

        if (attachToSelf && existsRenderable) {
            console.warn("[UItools.addSpriteLayer] 目标节点已有渲染组件，自动创建子节点挂载");
            attachToSelf = false;
        }

        if (!attachToSelf) {
            actualNode = new Node("SpriteLayer");
            actualNode.parent = targetNode;
        }

        // 添加 sprite 组件
        const sp = actualNode.addComponent(Sprite);
        sp.spriteFrame = frame;

        // 保持尺寸一致（尤其子节点方式）
        const ui = actualNode.getComponent(UITransform);
        if (ui) {
            const tUi = targetNode.getComponent(UITransform);
            if (tUi) ui.setContentSize(tUi.contentSize);
        }

        return actualNode;
    }

    public static getWorldPos(target: Node | Vec3): Vec3 {
        if (target instanceof Vec3) {
            return target.clone();
        }
        const pos = new Vec3();
        target.getWorldPosition(pos);
        return pos;
    }

    /**
     * 使用世界坐标将目标节点从A过渡到B
     * @param target 目标节点
     * @param from 起始
     * @param to 目标
     * @param duration 时长（秒）
     * @param options
     */
    public static moveEffectWorld(
        from: Node | Vec3,
        to: Node | Vec3,
        effectName: string,
        duration: number,
        options?: {
            target?: Node; // 承载特效的节点(父节点)，可选
            newTarget?: Node; // 在无target参数的情况使用该节点下创建新节点来承载特效
            easing?: TweenEasing; // 缓动类型
            angle?: Vec3; // 初始欧拉角
            autoDestroy?: boolean; // 结束是否销毁特效所在的父节点，默认 true
            scale?: Vec3;
            insertIndex?: number;
            offsetPosition?: Vec3; // 特效偏移位置
        }
    ): Promise<void> {
        return new Promise(async (resolve) => {
            if (!from || !to) {
                resolve();
                return;
            }

            const easing = options?.easing ?? "linear";
            let target = options?.target;

            if (!target) {
                target = new Node("EffectNode");
                if (options?.newTarget) {
                    options.newTarget.addChild(target);
                } else {
                    const canvas = find("Canvas");
                    if (canvas) {
                        canvas.addChild(target);
                    }
                }
            }

            if (options?.angle) {
                target.setRotationFromEuler(options.angle);
            }

            if (options?.scale) {
                target.setScale(options.scale);
            }
            if (effectName) {
                EffectManager.playEffect(effectName, target, options?.offsetPosition ?? Vec3.ZERO, { siblingIndex: options.insertIndex });
            }

            const worldFrom = UItools.getWorldPos(from);
            const worldTo = UItools.getWorldPos(to);

            if (!target.parent) {
                resolve();
                return;
            }
            const localFrom = new Vec3();
            const localTo = new Vec3();
            target.parent.inverseTransformPoint(localFrom, worldFrom);
            target.parent.inverseTransformPoint(localTo, worldTo);

            target.setPosition(localFrom);

            tween(target)
                .to(duration, { position: localTo }, { easing })
                .call(() => {
                    if (options?.autoDestroy !== false) {
                        // 默认 true
                        target!.destroy();
                    }
                    resolve();
                })
                .start();
        });
    }

    /**
     * 设置父节点但保持世界坐标不变
     * @param node 要改变父节点的节点
     * @param newParent 新的父节点
     * @param keepWorldTransform 是否保持旋转缩放（默认 true)
     */
    static mySetParent(node: Node, newParent: Node, keepWorldTransform: boolean = true) {
        if (!node || !newParent) return;

        // 记录世界位置
        const worldPos = node.getWorldPosition(new Vec3());

        // 可选：记录世界旋转 & 缩放
        let worldRot: Quat | null = null;
        let worldScale: Vec3 | null = null;
        if (keepWorldTransform) {
            worldRot = node.getWorldRotation().clone();
            worldScale = node.getWorldScale().clone();
        }

        // 重新设置父节点
        node.setParent(newParent);

        // 恢复世界位置
        node.setWorldPosition(worldPos);

        // 恢复世界旋转 & 缩放
        if (keepWorldTransform && worldRot && worldScale) {
            node.setWorldRotation(worldRot);
            node.setWorldScale(worldScale);
        }
    }

    /** 错误提示 */
    public ShowLoadErrorTips() {
        EventManager.emit(E_GAME_EVENT.NETWORK_ERROR_LOADING);
    }

    public ShowGameErrorTips() {
        EventManager.emit(E_GAME_EVENT.NETWORK_ERROR_GAMEING);
    }
}

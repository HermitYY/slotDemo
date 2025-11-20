// BasePopup.ts
import {
    _decorator,
    Component,
    Node,
    Vec3,
    Enum,
    UIOpacity,
    tween,
    UITransform,
    Color,
    EventTouch,
    Sprite,
    SpriteFrame,
    Tween,
    Widget,
    Input,
    TweenEasing,
    BlockInputEvents,
} from "cc";
const { ccclass, property } = _decorator;

export enum PopupLayer {
    A = 4,
    History = 3,
    B = 2,
    C = 1,
}

export enum PopupShowType {
    None = 0,
    ScaleFromPos = 1, // 从指定处缩放弹出（有最小显示缩放0.2）
    FadeIn = 2,
    FromTop = 3,
    FromBottom = 4,
    ScrollFromPosX = 5, // 从指定处缩放（仅仅缩放X轴）
    ScrollFromPosY = 6, // 从指定处缩放（仅仅缩放Y轴）
    ScrollFromPosXY = 7, // 从指定处缩放（X轴Y轴）
}
Enum(PopupShowType);
Enum(PopupLayer);

@ccclass("BasePopup")
export class BasePopup extends Component {
    @property({ tooltip: "遮罩是否可被点击" })
    IsCanClickMask: boolean = true;

    @property({ tooltip: "弹窗层级 A>H>B>C", type: PopupLayer })
    layer: PopupLayer = PopupLayer.B;

    @property({ tooltip: "动画类型", type: PopupShowType })
    showType: PopupShowType = PopupShowType.FadeIn;

    @property({ type: SpriteFrame, tooltip: "用于遮罩的纯色贴图 (white sprite)" })
    maskSpriteFrame: SpriteFrame | null = null;

    protected contentNode: Node | null = null;
    protected fromPos: Vec3 | null = null;
    protected curstomAniCfg: {
        customAniOut?: TweenEasing;
        customAniIn?: TweenEasing;
    };

    protected maskOpacity: number = 180;
    protected maskNode: Node | null = null;
    protected maskColor: Color = new Color(0, 0, 0);
    protected _onMaskTouchEnd: ((e: EventTouch) => void) | null = null;
    protected changeShowType?: PopupShowType = null;

    protected _showPromise?: Promise<void>;
    protected _closePromise?: Promise<void>;
    protected _resolveShow?: () => void;
    protected _resolveClose?: () => void;

    protected _isInit = false;

    onLoad() {
        this.contentNode = this.node.getChildByName("Content") || this.node;
        this._addContentEventInterceptor();
        this._createMask();
    }

    public setPopupCfg(cfg: {
        aniCfg?: { customAniOut?: TweenEasing; customAniIn?: TweenEasing };
        worldPos?: Vec3;
        maskOpacity?: number;
        maskColor?: Color;
        changeShowType?: PopupShowType;
    }) {
        if (cfg.worldPos) {
            this.fromPos = cfg.worldPos;
        }
        if (cfg.aniCfg) {
            this.curstomAniCfg = cfg.aniCfg;
        }
        if (cfg.maskOpacity) {
            this.maskOpacity = cfg.maskOpacity;
        }
        if (cfg.maskColor) {
            this.maskColor = cfg.maskColor;
        }
        if (cfg.changeShowType) {
            this.changeShowType = cfg.changeShowType;
        }
    }

    private _addContentEventInterceptor() {
        if (!this.contentNode) return;
        this.contentNode.on(Node.EventType.TOUCH_START, (e: EventTouch) => {
            e.propagationStopped = true;
        });
        this.contentNode.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => {
            e.propagationStopped = true;
        });
        this.contentNode.on(Node.EventType.TOUCH_END, (e: EventTouch) => {
            e.propagationStopped = true;
        });
        this.contentNode.on(Node.EventType.TOUCH_CANCEL, (e: EventTouch) => {
            e.propagationStopped = true;
        });
    }

    private _createMask() {
        const mask = new Node("Mask");
        this.maskNode;
        mask.layer = this.node.layer;
        mask.parent = this.node;
        const uiTrans = mask.addComponent(UITransform);
        // 默认大小先随父节点
        const parentTrans = this.node.getComponent(UITransform);
        if (parentTrans) {
            uiTrans.setContentSize(parentTrans.contentSize);
        }

        // 添加 Sprite（用来显示半透明黑背景）
        const sprite = mask.addComponent(Sprite);
        if (this.maskSpriteFrame) sprite.spriteFrame = this.maskSpriteFrame;
        // sprite.color = this.maskColor;

        // 添加透明度控制
        const opacity = mask.addComponent(UIOpacity);
        opacity.opacity = 0;

        const widget = mask.addComponent(Widget);
        widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
        widget.top = widget.bottom = widget.left = widget.right = 0;

        // 立即刷新布局
        widget.updateAlignment();
        // 阻止事件冒泡
        mask.addComponent(BlockInputEvents);
        // 点击事件
        this._onMaskTouchEnd = (e: EventTouch) => {
            if (e.target === mask) {
                if (this.IsCanClickMask) {
                    this.onMaskClick();
                }
                e.propagationStopped = true;
            }
        };
        mask.on(Node.EventType.TOUCH_END, this._onMaskTouchEnd, this);

        this.maskNode = mask;
        mask.active = false;
        mask.setSiblingIndex(0);

        if (this.contentNode) {
            this.contentNode.setSiblingIndex(1);
        }
    }

    /** 显示弹窗 */
    public show(): Promise<void> {
        this.node.active = true;

        if (this.maskNode) {
            const opa = this.maskNode.getComponent(UIOpacity)!;
            Tween.stopAllByTarget(opa);
            this.maskNode.active = true;
            tween(opa).to(0.18, { opacity: this.maskOpacity }).start();
            this.maskNode.getComponent(Sprite).color = this.maskColor;
        }

        if (!this.contentNode) return;

        this._showPromise = new Promise<void>((resolve) => {
            this._resolveShow = resolve;
        });

        switch (this.changeShowType ?? this.showType) {
            case PopupShowType.None:
                this._animNoneIn();
                this._resolveShow?.();
                break;
            case PopupShowType.ScaleFromPos:
                this._animScaleFromButtonIn(() => this._resolveShow?.());
                break;
            case PopupShowType.FadeIn:
                this._animFadeIn(() => this._resolveShow?.());
                break;
            case PopupShowType.FromTop:
                this._animFromTopIn(() => this._resolveShow?.());
                break;
            case PopupShowType.FromBottom:
                this._animFromBottomIn(() => this._resolveShow?.());
                break;
            case PopupShowType.ScrollFromPosX:
                this._animScrollFromPosXIn(() => this._resolveShow?.());
                break;
            case PopupShowType.ScrollFromPosY:
                this._animScrollFromPosYIn(() => this._resolveShow?.());
                break;
            case PopupShowType.ScrollFromPosXY:
                this._animScrollFromPosXYIn(() => this._resolveShow?.());
                break;
        }

        return this._showPromise;
    }

    /** 点击遮罩事件--默认关闭窗口 */
    protected onMaskClick() {
        this.close();
    }

    /** 淡出遮罩并销毁节点 */
    private _destroyWithMask(callback?: Function) {
        if (this.maskNode) {
            const opa = this.maskNode.getComponent(UIOpacity)!;
            tween(opa)
                .to(0.18, { opacity: 0 })
                .call(() => {
                    this.maskNode!.active = false;
                    this.node.destroy();
                    callback?.();
                })
                .start();
        } else {
            this.node.destroy();
            callback?.();
        }
    }

    /** 关闭弹窗 */
    public close() {
        if (!this.contentNode) return Promise.resolve();

        this._closePromise = new Promise<void>((resolve) => {
            this._resolveClose = resolve;
        });

        const done = () => {
            // 弹窗关闭动画结束
            this._resolveClose?.();
        };

        // 即时解除mask事件绑定
        if (this._onMaskTouchEnd) {
            this.maskNode.off(Node.EventType.TOUCH_END, this._onMaskTouchEnd, this);
            this._onMaskTouchEnd = null;
        }

        switch (this.changeShowType ?? this.showType) {
            case PopupShowType.None:
                this._animNoneOut();
                done();
                break;
            case PopupShowType.ScaleFromPos:
                this._animScaleFromButtonOut(done);
                break;
            case PopupShowType.FadeIn:
                this._animFadeOut(done);
                break;
            case PopupShowType.FromTop:
                this._animFromTopOut(done);
                break;
            case PopupShowType.FromBottom:
                this._animFromBottomOut(done);
                break;
            case PopupShowType.ScrollFromPosX:
                this._animScrollFromPosXOut(done);
                break;
            case PopupShowType.ScrollFromPosY:
                this._animScrollFromPosYOut(done);
                break;
            case PopupShowType.ScrollFromPosXY:
                this._animScrollFromPosXYOut(done);
                break;
            default:
                this._destroyWithMask(done);
                break;
        }

        return this._closePromise;
    }

    //#region  动画

    // 1.线性和基础缓动（Linear / Basic）
    // easing	特点	视觉效果	使用场景
    // linear	匀速运动	速度不变，从起点到终点直线过渡	很少单独使用，一般用于时间线或恒速移动
    // quadIn	二次方加速	先慢后快（加速）	适合物体起步阶段的加速
    // quadOut	二次方减速	先快后慢（减速）	物体到达目标位置时平滑停止
    // quadInOut	二次方加速减速	先慢加速，中间快，结束慢	平滑自然的往返运动
    // cubicIn	三次方加速	起始缓慢，后期加速更明显	比 quadIn 更陡峭的加速
    // cubicOut	三次方减速	到终点时减速更明显	平滑停止，视觉更自然
    // cubicInOut	三次方加速减速	过渡比 quadInOut 更柔和	往返动画或弹窗平滑进出

    // 2.高阶缓动（Quart / Quint / Expo）
    // easing	特点	视觉效果	使用场景
    // quartIn / quartOut / quartInOut	四次方加减速	加减速更明显	更夸张的起停动画
    // quintIn / quintOut / quintInOut	五次方加减速	起步和停止阶段更缓慢，中间快	精细控制移动动画节奏
    // expoIn / expoOut / expoInOut	指数加减速	起点几乎静止，迅速加速	强烈的加速感，如飞入动画

    // 3.弹性和回弹效果（Elastic / Back）
    // easing	特点	视觉效果	使用场景
    // backIn	开始阶段回退一点再加速	起始先向反方向微动，然后快速到目标	弹窗出现，物体弹入
    // backOut	结束阶段过冲	快速到目标点后回弹到最终位置	弹窗入场、按钮点击回弹
    // backInOut	双端回弹	开始和结束都有轻微回弹	弹性往返动画
    // elasticIn	弹性加速	起点先快速拉伸反弹	弹性物体飞入
    // elasticOut	弹性减速	到达目标点时反复回弹	弹性物体落地效果
    // elasticInOut	双端弹性	弹性飞入和落下	强烈弹性动画，注意不要过长

    // 4.正弦 / 圆形 / 指数平滑（Sine / Circ / Expo）
    // easing	特点	视觉效果	使用场景
    // sineIn / sineOut / sineInOut	正弦函数平滑	平滑起停，缓慢柔和	UI 弹窗、慢速移动
    // circIn / circOut / circInOut	圆形加减速	比 sineInOut 更陡峭	平滑动画但视觉略微加速
    // expoIn / expoOut / expoInOut

    // 5.Bounce（弹跳效果）
    // easing	特点	视觉效果	使用场景
    // bounceIn	开始反弹	起点从下方反弹上来	物体出现的弹跳效果
    // bounceOut	结束反弹	到目标点时反弹	落地或停止动画
    // bounceInOut	双端反弹	起点和终点都有弹跳	弹性物体往返运动
    /** 从下方弹出动画 */
    private _animFromBottomIn(callback?: Function) {
        if (!this.contentNode) return;

        // 保存原始位置
        const originalPos = this.contentNode.position.clone();

        // 设置起始位置（屏幕下方）
        const startPos = new Vec3(originalPos.x, -600, originalPos.z);
        this.contentNode.setPosition(startPos);

        // backOut 实现先快后慢的动画效果
        const easing = this?.curstomAniCfg?.customAniOut ?? "backOut";
        tween(this.contentNode)
            .to(0.4, { position: originalPos }, { easing })
            .call(() => callback?.())
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniOut = null);
    }

    /** 回到下方动画 */
    private _animFromBottomOut(callback?: Function) {
        if (!this.contentNode) return;

        const originalPos = this.contentNode.position.clone();

        // 计算目标位置（屏幕下方）
        const targetPos = new Vec3(originalPos.x, -1200, originalPos.z);

        // backIn 先慢后快的动画效果
        const easing = this?.curstomAniCfg?.customAniIn ?? "backIn";
        tween(this.contentNode)
            .to(0.3, { position: targetPos }, { easing })
            .call(() => this._destroyWithMask(callback))
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniIn = null);
    }

    /** Scale 弹出 */
    private _animScaleFromButtonIn(callback?: Function) {
        if (!this.contentNode) return;
        const startPos = this.fromPos ?? new Vec3(0, 0, 0);
        let localPos = new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(startPos);
            }
        }
        const originalPos = this.contentNode.position.clone();
        this.contentNode.setPosition(localPos);
        this.contentNode.setScale(new Vec3(0.2, 0.2, 1));

        tween(this.contentNode)
            .to(0.25, { scale: new Vec3(1.05, 1.05, 1), position: originalPos }, { easing: "backOut" })
            .to(0.1, { scale: new Vec3(1, 1, 1) })
            .call(() => callback?.())
            .start();
    }

    /** Scale 缩回 */
    private _animScaleFromButtonOut(callback?: Function) {
        if (!this.contentNode) return;

        const endPos = this.fromPos ?? new Vec3(0, 0, 0);
        let localPos = new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(endPos);
            }
        }

        let uiOpacity = this.contentNode.getComponent(UIOpacity);
        if (!uiOpacity) {
            uiOpacity = this.contentNode.addComponent(UIOpacity);
        }
        const startOpacity = uiOpacity.opacity;

        tween(this.contentNode)
            .to(
                0.3,
                {
                    scale: new Vec3(0.2, 0.2, 1),
                    position: localPos,
                },

                {
                    easing: "backIn",
                    onUpdate: (target, ratio: number) => {
                        // 线性插值计算当前透明度
                        uiOpacity.opacity = startOpacity * (1 - ratio);
                    },
                }
            )
            .call(() => this._destroyWithMask(callback))
            .start();
    }

    /** FadeIn 淡入 */
    private _animFadeIn(callback?: Function) {
        const opacity = this.contentNode!.getComponent(UIOpacity) ?? this.contentNode!.addComponent(UIOpacity);
        opacity.opacity = 0;
        tween(opacity)
            .to(0.3, { opacity: 255 })
            .call(() => callback?.())
            .start();
    }

    /** FadeOut 淡出 */
    private _animFadeOut(callback?: Function) {
        const opacity = this.contentNode!.getComponent(UIOpacity);
        if (!opacity) return this._destroyWithMask(callback);

        tween(opacity)
            .to(0.25, { opacity: 0 })
            .call(() => this._destroyWithMask(callback))
            .start();
    }

    /** 从顶部掉下 */
    private _animFromTopIn(callback?: Function) {
        const originalPos = this.contentNode.position.clone();
        this.contentNode!.setPosition(0, 600, 0);
        tween(this.contentNode!)
            .to(0.4, { position: originalPos }, { easing: "backOut" })
            .call(() => callback?.())
            .start();
    }

    /** 向上收回 */
    private _animFromTopOut(callback?: Function) {
        tween(this.contentNode!)
            .to(0.3, { position: new Vec3(0, 1200, 0) }, { easing: "backIn" })
            .call(() => this._destroyWithMask(callback))
            .start();
    }

    /** X轴放大 */
    private _animScrollFromPosXIn(callback?: Function) {
        if (!this.contentNode) return;

        const startPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(startPos);
            }
        }

        const originalPos = this.contentNode.position.clone();
        const originalScale = this.contentNode.scale.clone();

        this.contentNode.setPosition(localPos);
        this.contentNode.setScale(new Vec3(0.01, 1, 1));
        const easing = this?.curstomAniCfg?.customAniOut ?? "backOut";
        tween(this.contentNode)
            .parallel(tween().to(0.4, { position: originalPos }, { easing }), tween().to(0.4, { scale: new Vec3(1, 1, 1) }, { easing }))
            .call(() => callback?.())
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniOut = null);
    }

    /** X轴缩小 */
    private _animScrollFromPosXOut(callback?: Function) {
        if (!this.contentNode) return;

        const endPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(endPos);
            }
        }
        const easing = this?.curstomAniCfg?.customAniIn ?? "backIn";
        tween(this.contentNode)
            .parallel(tween().to(0.3, { position: localPos }, { easing }), tween().to(0.3, { scale: new Vec3(0, 1, 1) }, { easing }))
            .call(() => this._destroyWithMask(callback))
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniIn = null);
    }

    /** Y轴放大 */
    private _animScrollFromPosYIn(callback?: Function) {
        if (!this.contentNode) return;

        const startPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(startPos);
            }
        }

        const originalPos = this.contentNode.position.clone();
        const originalScale = this.contentNode.scale.clone();

        this.contentNode.setPosition(localPos);
        this.contentNode.setScale(new Vec3(1, 0.01, 1));
        const easing = this?.curstomAniCfg?.customAniOut ?? "backOut";
        tween(this.contentNode)
            .parallel(tween().to(0.4, { position: originalPos }, { easing }), tween().to(0.4, { scale: new Vec3(1, 1, 1) }, { easing }))
            .call(() => callback?.())
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniOut = null);
    }

    /** Y轴缩小 */
    private _animScrollFromPosYOut(callback?: Function) {
        if (!this.contentNode) return;

        const endPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(endPos);
            }
        }
        const easing = this?.curstomAniCfg?.customAniIn ?? "backIn";
        tween(this.contentNode)
            .parallel(tween().to(0.3, { position: localPos }, { easing }), tween().to(0.3, { scale: new Vec3(1, 0, 1) }, { easing }))
            .call(() => this._destroyWithMask(callback))
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniIn = null);
    }

    /** XY轴放大 */
    private _animScrollFromPosXYIn(callback?: Function) {
        if (!this.contentNode) return;

        const startPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(startPos);
            }
        }

        const originalPos = this.contentNode.position.clone();
        const originalScale = this.contentNode.scale.clone();

        this.contentNode.setPosition(localPos);
        this.contentNode.setScale(new Vec3(0.01, 0.01, 1));

        const easing = this?.curstomAniCfg?.customAniOut ?? "backOut";
        tween(this.contentNode)
            .parallel(tween().to(0.4, { position: originalPos }, { easing }), tween().to(0.4, { scale: Vec3.ONE }, { easing }))
            .call(() => callback?.())
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniOut = null);
    }

    /** XY轴缩小 */
    private _animScrollFromPosXYOut(callback?: Function) {
        if (!this.contentNode) return;

        const endPos = this.fromPos ?? new Vec3(0, 0, 0);
        const parent = this.node.getParent();
        let localPos = new Vec3();
        if (parent) {
            const parentUI = parent.getComponent(UITransform);
            if (parentUI) {
                localPos = parentUI.convertToNodeSpaceAR(endPos);
            }
        }
        const easing = this?.curstomAniCfg?.customAniIn ?? "backIn";
        tween(this.contentNode)
            .parallel(tween().to(0.3, { position: localPos }, { easing }), tween().to(0.3, { scale: new Vec3(0, 0, 1) }, { easing }))
            .call(() => this._destroyWithMask(callback))
            .start();
        this.curstomAniCfg && (this.curstomAniCfg.customAniIn = null);
    }

    /** 无动画进入 */
    private _animNoneIn() {
        if (!this.contentNode) return;
        this.node.active = true;
        this.contentNode.active = true;
    }

    /** 无动画退出 */
    private _animNoneOut() {
        this.node.destroy();
    }

    //#endregion
}

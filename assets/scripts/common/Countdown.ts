import { _decorator, Component, Label, tween, Vec3, UIOpacity, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Countdown")
export class Countdown extends Component {
    @property(Label)
    labelA: Label = null!;

    @property(Label)
    labelB: Label = null!;

    private _currentLabel: Label = null!;
    private _nextLabel: Label = null!;
    private _currentValue: number = 0;
    private _isPlaying: boolean = false;

    onLoad() {
        this._currentLabel = this.labelA;
        this._nextLabel = this.labelB;
        this._ensureOpacity(this.labelA.node);
        this._ensureOpacity(this.labelB.node);
    }

    /** 确保节点有 UIOpacity 组件 */
    private _ensureOpacity(node: Node) {
        if (!node.getComponent(UIOpacity)) {
            node.addComponent(UIOpacity);
        }
    }

    /**
     * 从当前值（或指定from）滚动到to
     * @param to 目标值
     * @param from 可选起始值
     * @param interval 每步间隔（秒）
     */
    public scrollTo(to: number, from?: number, interval = 1) {
        if (this._isPlaying) return;

        if (from !== undefined) {
            this._currentValue = from;
            this._currentLabel.string = `${from}`;
        }

        this._isPlaying = true;

        const step = this._currentValue > to ? -1 : 1; // 自动判断方向
        this.schedule(() => this._scrollNext(to, step), interval);
    }

    /**
     * 手动触发播放一步滚动动画
     * @param to 目标值
     * @param from 可选起始值，若传入则会先设置为该值再滚动
     */
    public playStep(to: number, from?: number, aniTime = 0.3) {
        if (this._isPlaying) return;
        if (from !== undefined) {
            this._currentValue = from;
            this._currentLabel.string = `${from}`;
        }

        if (this._currentValue === to) return;

        this._isPlaying = true;

        const step = to > this._currentValue ? 1 : -1;
        const nextValue = this._currentValue + step;
        const height = this._currentLabel.node.getComponent(Label)?.lineHeight ?? 60;

        this._nextLabel.string = `${to}`;
        this._nextLabel.node.setPosition(0, -Math.sign(step) * height, 0);

        const nextOpacity = this._nextLabel.node.getComponent(UIOpacity)!;
        const currentOpacity = this._currentLabel.node.getComponent(UIOpacity)!;
        nextOpacity.opacity = 0;

        // 当前数字上移淡出
        tween(this._currentLabel.node)
            .to(aniTime, { position: new Vec3(0, Math.sign(step) * height, 0) })
            .start();

        tween(currentOpacity).to(aniTime, { opacity: 0 }).start();

        // 下一数字上移淡入
        tween(this._nextLabel.node)
            .to(aniTime, { position: new Vec3(0, 0, 0) })
            .start();

        tween(nextOpacity)
            .to(aniTime, { opacity: 255 })
            .call(() => {
                [this._currentLabel, this._nextLabel] = [this._nextLabel, this._currentLabel];
                this._currentValue = nextValue;
                this._isPlaying = false;
            })
            .start();
    }

    private _scrollNext(to: number, step: number) {
        if ((step < 0 && this._currentValue <= to) || (step > 0 && this._currentValue >= to)) {
            this.unscheduleAllCallbacks();
            this._isPlaying = false;
            return;
        }

        const nextValue = this._currentValue + step;
        const height = this._currentLabel.node.getComponent(Label)?.lineHeight ?? 60;

        // 准备 nextLabel
        this._nextLabel.string = `${nextValue}`;
        this._nextLabel.node.setPosition(0, -Math.sign(step) * height, 0); // 根据方向放上下方
        const nextOpacity = this._nextLabel.node.getComponent(UIOpacity)!;
        nextOpacity.opacity = 0;

        const currentOpacity = this._currentLabel.node.getComponent(UIOpacity)!;

        // 当前数字离场
        tween(this._currentLabel.node)
            .to(0.3, { position: new Vec3(0, Math.sign(step) * height, 0) })
            .start();

        tween(currentOpacity).to(0.3, { opacity: 0 }).start();

        // 下一数字入场
        tween(this._nextLabel.node)
            .to(0.3, { position: new Vec3(0, 0, 0) })
            .start();

        tween(nextOpacity)
            .to(0.3, { opacity: 255 })
            .call(() => {
                // 交换 Label
                [this._currentLabel, this._nextLabel] = [this._nextLabel, this._currentLabel];
                this._currentValue = nextValue;
            })
            .start();
    }

    /** 立即设置当前值（无动画） */
    public setValue(value: number) {
        this._currentValue = value;
        this._currentLabel.string = `${value}`;
        this._currentLabel.node.setPosition(0, 0, 0);
        this._currentLabel.node.getComponent(UIOpacity)!.opacity = 255;
        this._nextLabel.node.getComponent(UIOpacity)!.opacity = 0;
    }
}

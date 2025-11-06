import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

interface SpineEventHandler {
    (event: sp.spine.Event): void;
}

@ccclass("SpineCommon")
export class SpineCommon {
    private _spine: sp.Skeleton;
    private _defaultIdle: string | null = null;

    // 回调映射，防止被覆盖
    private _completeHandlers: Map<number, () => void> = new Map();
    private _eventHandlers: Map<string, SpineEventHandler[]> = new Map();

    constructor(spine: sp.Skeleton) {
        this._spine = spine;
        this._initListeners();
    }

    /** 初始化全局监听，将触发分发到 Map 中保存的方法 */
    private _initListeners() {
        this._spine.setCompleteListener((entry) => {
            const handler = this._completeHandlers.get(entry.trackIndex);
            if (handler) {
                handler();
                this._completeHandlers.delete(entry.trackIndex);
            }
        });

        this._spine.setEventListener((entry, event) => {
            const list = this._eventHandlers.get(event.data.name);
            if (list) {
                list.forEach((fn) => fn(event));
            }
        });
    }

    /** 设置默认idle */
    public setDefaultIdle(anim: string) {
        this._defaultIdle = anim;
    }

    /** 是否存在 */
    private _has(name: string): boolean {
        const anims = this._spine.skeletonData.getAnimsEnum();
        return (anims as any)[name] !== undefined;
    }

    /** 安全播放，在轨道上立刻切换 */
    public play(trackIndex: number, name: string, loop: boolean = true): Promise<void> {
        return new Promise((resolve) => {
            if (!this._has(name)) {
                if (this._defaultIdle && loop) {
                    this._spine.setAnimation(trackIndex, this._defaultIdle, true);
                }
                resolve();
                return;
            }
            this._spine.setAnimation(trackIndex, name, loop);
            this.onComplete(trackIndex, resolve);
        });
    }

    /** 队列播放 */
    public queue(trackIndex: number, name: string, loop: boolean = true, delay: number = 0): Promise<void> {
        return new Promise((resolve) => {
            if (!this._has(name)) {
                resolve();
                return;
            }
            this._spine.addAnimation(trackIndex, name, loop, delay);
            this.onComplete(trackIndex, resolve);
        });
    }

    /** 设置混合 */
    public setMix(from: string, to: string, duration: number) {
        this._spine.setMix(from, to, duration);
    }

    /** 停止指定轨道 */
    public stopTrack(trackIndex: number) {
        this._spine.clearTrack(trackIndex);
    }

    /** 停止所有 */
    public stopAll() {
        this._spine.clearTracks();
    }

    /** 注册动画完成回调(覆盖) */
    public onComplete(trackIndex: number, cb: () => void) {
        this._completeHandlers.set(trackIndex, cb);
    }

    /** 监听spine事件（可多监听） */
    public onEvent(eventName: string, cb: SpineEventHandler) {
        if (!this._eventHandlers.has(eventName)) {
            this._eventHandlers.set(eventName, []);
        }
        this._eventHandlers.get(eventName)!.push(cb);
    }

    /**
     * from(循环) -> to(一次性) -> back(循环)
     * 混合完成 & 回到 back 循环后 resolve
     */
    public playFromToBack(trackIndex: number, from: string, to: string, back: string, mixTo: number, mixBack: number, backLoop: boolean = true): Promise<void> {
        return new Promise((resolve) => {
            if (!this._has(from) || !this._has(to) || !this._has(back)) {
                resolve();
                return;
            }
            if (mixTo > 0) this._spine.setMix(from, to, mixTo);
            if (mixBack > 0) this._spine.setMix(to, back, mixBack);
            requestAnimationFrame(() => {
                this._spine.setAnimation(trackIndex, to, false);
                this.onComplete(trackIndex, () => {
                    requestAnimationFrame(() => {
                        this._spine.setAnimation(trackIndex, back, backLoop);
                        resolve();
                    });
                });
            });
        });
    }

    /**
     * 循环动画之间的切换：from -> to
     * @param trackIndex 轨道索引
     * @param from 原始循环动画
     * @param to 要切换到的目标循环动画
     * @param mix 混合时间，0则立即切换无混合
     */
    // public switchLoopAnim(trackIndex: number, from: string, to: string, mix: number = 0) {
    //     if (!this._has(from) || !this._has(to)) return;

    //     // 如果有混合，则先设置
    //     if (mix > 0) {
    //         // 只设置一次，不要立即切换，留给 runtime 1 帧时间准备 slot 数据
    //         this._spine.setMix(from, to, mix);
    //     }

    //     // 下一帧切换，确保 runtime 已完成 slot refresh
    //     requestAnimationFrame(() => {
    //         this._spine.setAnimation(trackIndex, to, true);
    //     });
    // }
}

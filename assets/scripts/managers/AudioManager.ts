// AudioManager.ts
import { _decorator, assetManager, AudioClip, AudioSource, Component, Node } from "cc";
import { Singleton } from "../common/Singleton";
import { LocalStorageTools, StorageKey } from "../Tools/LocalStorageTools";
const { ccclass } = _decorator;

/** 播放模式 */
export enum PlayMode {
    Replace = 1, // 立即替换/播放（SFX: 打断所有其他 SFX；BGM: 立即替换当前）
    Queue = 2, // 等待上一个播放完再播放（BGM/SFX 都可用）
    Parallel = 3, // 并行播放（只有 SFX 有意义，BGM 会当作 Queue）
}

/** BGM 枚举 */
export enum BgmEnum {
    Background = "background",
    FreegameBackground = "freegameBackground",
}

/** SFX 枚举 */
export enum SfxEnum {
    EnterFreeGame = "enterFreeGame",
    MoroAttackBow = "attack",
    BeetleMultipleShow = "beetle",
    GridClear6 = "block6",
    GridClear7 = "block7",
    GridClear8 = "block8",
    GridClear9 = "block9",
    Refresh = "blockScroll",
    BowUpgrade1 = "bowUpgrade1",
    BowUpgrade2 = "bowUpgrade2",
    BowUpgrade3 = "bowUpgrade3",
    BeetleMultipleAdd = "buling",
    NormalButtonClick = "buttonClick",
    QuickButtonClick = "buttonClick2",
    FreeEnd1 = "dandandan",
    DemonDie = "demonDie",
    Dingling = "dingling",
    FireExplosion = "ecptoma",
    FireBurning = "eruption",
    freeEndAll = "freeGameWin",
    LoogGold = "gold",
    HeightBoom = "heightBoom2",
    MonsterHit = "hit",
    Icon14 = "icon14",
    LowBoom = "lowBoom",
    LowRing = "lowStart",
    Merge = "merge",
    MergeDisperse = "mergeDisperse",
    NumberSkip = "numberSkip",
    MoroAttackArrow = "sendArrows",
    ShortGold = "smallGold",
    Snicker = "snicker",
    FreeEnd2 = "zizizi",
    timesScroll = "timesScroll",
    rollFlash = "rollFlash",
    rollFlashShort = "rollFlashShort",
    qElastic = "qElastic",
}

@ccclass("AudioManager")
export class AudioManager extends Singleton {
    // audio sources
    private bgmSource: AudioSource | null = null;
    private sfxRootNode: Node | null = null;
    private sfxPool: AudioSource[] = [];
    private maxSfxPool = 8; // 初始池大小
    private allowPoolGrow = true; // 无空闲时是否创建临时 source

    // clip 缓存
    private clipMap: Map<string, AudioClip> = new Map();

    // BGM 队列（存 name 或 AudioClip）
    private bgmQueue: string[] = [];
    private bgmPlayingName: string | null = null;
    private bgmPlayTimer: any = null;

    // SFX 管理（记录正在播放的计时器，用于 Queue 模式判断全部结束）
    private sfxPlayingTimers: Map<number, any> = new Map();
    private sfxTimerIdCounter = 1;

    // 音量（0-100）
    private volumes = {
        bgm: 100,
        sfx: 100,
    };

    // ---------------- init ----------------
    /**
     * 必须先 init：传入挂了 AudioSource 的 bgmNode 与一个 空节点sfxRoot
     */
    public init(bgmNode: Node, sfxRoot: Node, initialSfxPool = 6, maxSfxPool = 16) {
        const b = bgmNode.getComponent(AudioSource);
        if (!b) throw new Error("bgmNode must have AudioSource component");
        this.bgmSource = b;

        this.sfxRootNode = sfxRoot;
        this.maxSfxPool = Math.max(1, maxSfxPool);
        for (let i = 0; i < Math.max(1, initialSfxPool); i++) {
            const n = new Node(`SFX_src_${i}`);
            n.parent = sfxRoot;
            const s = n.addComponent(AudioSource);
            this.sfxPool.push(s);
        }

        /** 初始化时从 localStorage 恢复音量 */
        const savedBgm = LocalStorageTools.GetInstance().getItem<number>(StorageKey.BGM_VALUE, 100);
        const savedSfx = LocalStorageTools.GetInstance().getItem<number>(StorageKey.SFX_VALUE, 100);
        this.volumes.bgm = savedBgm!;
        this.volumes.sfx = savedSfx!;

        this.applyVolumeToSources();
    }

    // ---------------- preload ----------------
    /**
     * 递归预加载目录下所有 AudioClip（含子目录），并以 clip.name 做 key 缓存
     */
    public async preloadAll(dir: string = "audio"): Promise<void> {
        const bundle = assetManager.getBundle("game");
        if (!bundle) throw new Error("[AudioManager] game bundle not found!");

        // 先收集子文件夹
        const infos = bundle.getDirWithPath(dir);
        const subDirs = new Set<string>();
        infos.forEach((info: any) => {
            const relativePath = info.path;
            const idx = relativePath.lastIndexOf("/");
            if (idx !== -1) {
                const folder = relativePath.substring(0, idx);
                subDirs.add(folder);
            }
        });
        subDirs.add(dir);

        for (const folder of subDirs) {
            await new Promise<void>((resolve) => {
                bundle.loadDir(folder, AudioClip, (err: Error | null, assets?: AudioClip[]) => {
                    if (!err && assets) {
                        assets.forEach((clip) => this.clipMap.set(clip.name, clip));
                    }
                    resolve();
                });
            });
        }

        console.log(`[AudioManager] preloadAll: loaded ${this.clipMap.size} clips from ${dir}`);
    }

    // ---------------- utilities ----------------
    public checkDuration(audio: SfxEnum | BgmEnum): number {
        const name = audio as string;
        const clip = this.clipMap.get(name);
        return clip ? clip.getDuration() : 0;
    }

    public setVolumeForType(type: "bgm" | "sfx", value: number) {
        const v = Math.min(100, Math.max(0, Math.floor(value)));
        this.volumes[type] = v;

        if (type === "bgm") {
            LocalStorageTools.GetInstance().setItem(StorageKey.BGM_VALUE, v);
        } else {
            LocalStorageTools.GetInstance().setItem(StorageKey.SFX_VALUE, v);
        }
        this.applyVolumeToSources();
    }

    public getVolumeForType(type: "bgm" | "sfx"): number {
        return this.volumes[type];
    }

    private applyVolumeToSources() {
        if (this.bgmSource) this.bgmSource.volume = this.volumes.bgm / 100;
        this.sfxPool.forEach((s) => (s.volume = this.volumes.sfx / 100));
    }

    //#region BGM
    /**
     * playBgm：mode=Replace | Queue。若 mode=Replace 则立即替换当前并清空队列；若 Queue 则加入队列等待。
     * 返回 Promise 在该次播放完整播放完毕时 resolve（即一次循环结束时 resolve）。
     */
    public playBgm(mode: PlayMode, bgm: BgmEnum): Promise<void> {
        const name = bgm as string;
        const clip = this.clipMap.get(name);
        if (!clip) return Promise.reject(`[AudioManager] BGM not found: ${name}`);
        if (!this.bgmSource) return Promise.reject("[AudioManager] bgmSource not initialized");

        if (this.bgmPlayingName === name && this.bgmSource.playing) {
            return Promise.resolve();
        }

        if (mode === PlayMode.Replace) {
            // 清空队列并播放（立即替换）
            this.bgmQueue = [name];
            return this._startNextBgm(true);
        } else {
            // Queue 模式：加入队列（如果已经在队列中允许重复）
            this.bgmQueue.push(name);

            // 如果没有正在播放，则立即触发
            if (!this.bgmPlayingName) {
                return this._startNextBgm(false);
            }

            // 返回一个 Promise：当该次被播放到并完成一次时 resolve
            return new Promise<void>((resolve) => {
                // 我们需要把一个 resolver 绑定到该名字的“等待列表”上
                // 为简单实现：在队列中保留 resolve 的映射（用一个 map: key name+index)
                // 这里简化：当触发播放时，会查找当前正在播放名字与队列首，且会调用内部 resolverMap
                const key = this._makePendingKey(name);
                this._bgmPendingResolvers.set(key, resolve);
            });
        }
    }

    // 内部：开始播放队列的下一个（或替换当前）
    private async _startNextBgm(forceStart: boolean): Promise<void> {
        if (!this.bgmSource) return Promise.resolve();
        // 如果正在播放并非强制开始，则无需做额外
        if (this.bgmPlayingName && !forceStart) {
            // nothing
        }

        // 清掉已有计时
        if (this.bgmPlayTimer) {
            clearTimeout(this.bgmPlayTimer);
            this.bgmPlayTimer = null;
        }
        // 从队列中取当前要播放的（队列内按插入顺序）
        if (this.bgmQueue.length === 0) return Promise.resolve();

        const currentName = this.bgmQueue[0];
        const clip = this.clipMap.get(currentName)!;
        // 设置播放状态
        this.bgmPlayingName = currentName;

        // BGM 的 loop 规则：当队列长度 == 1 -> loop true；否则 loop false（并且当播放完后移除已播项）
        const shouldLoop = this.bgmQueue.length === 1;
        this.bgmSource.stop();
        this.bgmSource.clip = clip;
        this.bgmSource.loop = shouldLoop;
        this.bgmSource.volume = this.volumes.bgm / 100;
        this.bgmSource.play();

        // 返回 Promise：在这次播放结束（一次循环结束）时 resolve
        return new Promise<void>((resolve) => {
            const dur = clip.getDuration() * 1000;
            // 若 loop=true，仍然我们在第一次播放结束时 resolve（per 要求：resolve 表示“一次播放结束”）
            this.bgmPlayTimer = setTimeout(() => {
                // 调用任何等待此 bgm 的 resolver（如果 playBgm 时加入了 pending resolver）
                this._invokeBgmPendingResolvers(currentName);

                // 如果队列长度 > 1：移除已播的第一个，然后继续播放下一个
                if (this.bgmQueue.length > 1) {
                    // 移除首项
                    this.bgmQueue.shift();
                    // 播放下一个（不用 force）
                    this.bgmPlayingName = null;
                    this.bgmPlayTimer = null;
                    // 递归启动下一个
                    this._startNextBgm(false).then(() => {
                        // nothing
                    });
                } else {
                    // 队列唯一：保持循环播放，不从队列移除
                    // 继续循环（AudioSource.loop 已设置）
                    // bgmPlayingName 保持为 currentName
                }
                resolve();
            }, dur);
        });
    }

    // 用于把异步 playBgm 的 pending resolver 存起来
    private _bgmPendingResolvers: Map<string, () => void> = new Map();
    private _bgmPendingCounter = 0;
    private _makePendingKey(name: string) {
        this._bgmPendingCounter++;
        return `${name}::${this._bgmPendingCounter}`;
    }
    private _invokeBgmPendingResolvers(playName: string) {
        // 解析所有为该 name 开头的 resolver（简化：遍历所有 key，调用与 name 匹配的）
        const toCall: string[] = [];
        for (const [k] of this._bgmPendingResolvers) {
            if (k.startsWith(playName + "::")) toCall.push(k);
        }
        toCall.forEach((k) => {
            const fn = this._bgmPendingResolvers.get(k);
            if (fn) {
                try {
                    fn();
                } catch (e) {}
                this._bgmPendingResolvers.delete(k);
            }
        });
    }
    //#endregion

    //#region SFX
    /**
     * playSfx(mode, sfx)
     * - Replace: 停止所有 SFX（池中与临时），立即播放自己
     * - Queue: 等待当前所有正在播放的 SFX 都结束后再播放（串行）
     * - Parallel: 立即并行播放（若池中无空闲并且允许扩容则创建临时 source）
     * 返回 Promise: 在该次播放完整播放完毕时 resolve
     */
    public playSfx(mode: PlayMode, sfx: SfxEnum): Promise<void> {
        const name = sfx as string;
        const clip = this.clipMap.get(name);
        if (!clip) return Promise.reject(`[AudioManager] SFX not found: ${name}`);

        if (!this.sfxRootNode) return Promise.reject("[AudioManager] sfxRoot not initialized");

        switch (mode) {
            // 停止所有 SFX 然后播放
            case PlayMode.Replace:
                this.stopAllSfx();
                return this._playSfxOnce(clip);
            case PlayMode.Queue:
                // 如果当前没有正在播放的 SFX，则直接播放
                if (this.sfxPlayingTimers.size === 0) {
                    return this._playSfxOnce(clip);
                } else {
                    // 等待所有现有 SFX 完毕后播放
                    return new Promise<void>((resolve) => {
                        // 当 sfxPlayingTimers 为空时触发
                        const check = () => {
                            if (this.sfxPlayingTimers.size === 0) {
                                resolve(); // 先 resolve 以便外部知道我们现在将播放
                            } else {
                                // 等一小段再检查
                                setTimeout(check, 80);
                            }
                        };
                        check();
                    }).then(() => this._playSfxOnce(clip));
                }
            case PlayMode.Parallel:
                return this._playSfxOnce(clip);
            default:
                break;
        }
    }

    // 真正播放一个 sfx clip，返回在该次播放完整播放完毕时 resolve
    private _playSfxOnce(clip: AudioClip): Promise<void> {
        // 找空闲 source
        let source = this.sfxPool.find((s) => !s.playing);
        let createdTemp = false;
        if (!source) {
            if (this.sfxPool.length < this.maxSfxPool) {
                const node = new Node(`SFX_src_dyn_${this.sfxPool.length}`);
                node.parent = this.sfxRootNode!;
                source = node.addComponent(AudioSource);
                this.sfxPool.push(source);
            } else if (this.allowPoolGrow) {
                // 临时节点，不加入池（播放结束后销毁）
                const node = new Node(`SFX_src_tmp`);
                node.parent = this.sfxRootNode!;
                source = node.addComponent(AudioSource);
                createdTemp = true;
            } else {
                // 无空闲且不允许扩容 -> 尝试抢占最早一个（停止并复用）
                source = this.sfxPool[0];
                source.stop();
            }
        }

        source.clip = clip;
        source.loop = false;
        source.volume = this.volumes.sfx / 100;
        source.play();

        // 记录计时器，返回 Promise 在播放结束时 resolve
        return new Promise<void>((resolve) => {
            const id = this.sfxTimerIdCounter++;
            const dur = clip.getDuration() * 1000;
            const timer = setTimeout(() => {
                // 播放结束
                // 如果是临时源，销毁节点
                if (createdTemp && source && source.node) {
                    source.stop();
                    source.node.removeFromParent();
                    source.node.destroy();
                }
                this.sfxPlayingTimers.delete(id);
                resolve();
            }, dur);
            this.sfxPlayingTimers.set(id, timer);
        });
    }

    //#endregion

    //#region STOP
    public stopBgm() {
        if (this.bgmPlayTimer) {
            clearTimeout(this.bgmPlayTimer);
            this.bgmPlayTimer = null;
        }
        if (this.bgmSource) {
            this.bgmSource.stop();
        }
        this.bgmPlayingName = null;
    }

    public stopAllSfx() {
        // 停所有 pool 中的 source
        this.sfxPool.forEach((s) => {
            try {
                s.stop();
            } catch (e) {}
        });
        // 清所有计时器
        for (const t of this.sfxPlayingTimers.values()) {
            clearTimeout(t);
        }
        this.sfxPlayingTimers.clear();
    }

    /**
     * 停止指定的 SFX（根据枚举名）
     */
    public stopSfx(sfx: SfxEnum) {
        const name = sfx as string;

        // 遍历池内所有 SFX
        for (const source of this.sfxPool) {
            const clip = source.clip;
            if (clip && clip.name === name && source.playing) {
                try {
                    source.stop();
                } catch (e) {}
            }
        }

        // 临时节点（动态创建的、未加入池的）
        if (this.sfxRootNode) {
            const children = this.sfxRootNode.children;
            for (const node of children) {
                const src = node.getComponent(AudioSource);
                if (src && src.clip && src.clip.name === name && src.playing) {
                    try {
                        src.stop();
                        // 临时节点
                        if (node.name.startsWith("SFX_src_tmp")) {
                            node.removeFromParent();
                            node.destroy();
                        }
                    } catch (e) {}
                }
            }
        }

        // 清理掉相关的计时器（防止 resolve 重复触发）
        for (const [id, timer] of this.sfxPlayingTimers.entries()) {
            clearTimeout(timer);
            this.sfxPlayingTimers.delete(id);
        }
    }

    //#endregion
}

(window as any).AudioManager = AudioManager.GetInstance();

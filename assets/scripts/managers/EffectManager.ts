import { _decorator, Node, Prefab, Vec3, instantiate, assetManager, UITransform } from "cc";
import { GameSpeedManager } from "./GameSpeedManager";
import { SequenceFramePlay } from "../common/SequenceFramePlay";
import { GridManager } from "./GridManager";
import { LogicTools } from "../Tools/LogicTools";

export class EffectManager {
    private static effectMap: Map<string, Prefab> = new Map();
    private static aliasMap: Map<string, string> = new Map(); // 别名 映射 原始 prefab 名
    private static activeEffects: Map<string, Node[]> = new Map();

    /**
     * 预加载分包 game 下的 effects 目录
     * @param dir bundle 内目录，默认 "effects"
     */
    public static async preloadAll(dir: string = "effects"): Promise<void> {
        const bundle = assetManager.getBundle("game");
        if (!bundle) throw new Error("[EffectManager] game bundle not found!");

        const loadRecursive = async (path: string) => {
            return new Promise<void>((resolve) => {
                bundle.loadDir(path, Prefab, (err, assets) => {
                    if (!err && assets) {
                        assets.forEach((prefab) => this.effectMap.set(prefab.name, prefab));
                    }
                    resolve();
                });
            });
        };

        const infos = bundle.getDirWithPath(dir);
        const subDirs = new Set<string>();

        infos.forEach((info) => {
            const relativePath = info.path;
            const idx = relativePath.lastIndexOf("/");
            if (idx !== -1) {
                const folder = relativePath.substring(0, idx);
                subDirs.add(folder);
            }
        });

        // 把 dir 本身也加进去（因为根目录下也可能有）
        subDirs.add(dir);

        for (const d of subDirs) {
            await loadRecursive(d);
        }

        LogicTools.myConsole(`[EffectManager] Loaded ${this.effectMap.size} effects in ${dir} and subdirs`);
    }

    /** 注册别名 */
    public static registerAlias(alias: string, originalName: string) {
        this.aliasMap.set(alias, originalName);
    }

    /**
     * 播放特效（返回 Promise，特效销毁时 resolve）
     */
    public static playEffect(
        name: string,
        parent: Node,
        pos: Vec3,
        effectCfg?: {
            siblingIndex?: number;
            loopImmediate?: boolean; // 是否立刻返回resolve (循环特效为立刻 一次性可设置是否立刻 一次性默认为持续时间后返回resolve)
            effectCallBack?: (effectNode: Node) => void;
        }
    ): Promise<void> {
        return new Promise((resolve) => {
            if (!name) resolve();
            // 先查别名
            if (this.aliasMap.has(name)) {
                name = this.aliasMap.get(name)!;
            }

            const prefab = this.effectMap.get(name);
            if (!prefab) {
                console.warn(`[EffectManager] 资源路径不存在 ${name}`);
                resolve();
                return;
            }

            const eff = instantiate(prefab);
            eff.setParent(parent);
            eff.setPosition(pos);

            if (effectCfg?.siblingIndex !== undefined) {
                eff.setSiblingIndex(effectCfg?.siblingIndex);
            }

            this.applyScale(eff, (name.match(/slot.*?(\d+)$/i)?.[1] ?? -1) as number);

            if (!this.activeEffects.has(name)) {
                this.activeEffects.set(name, []);
            }
            this.activeEffects.get(name)!.push(eff);

            const seq = eff.getComponent(SequenceFramePlay);
            if (!seq) {
                console.warn(`[EffectManager] effect不存在帧动画控制脚本 ${name}`);
                resolve();
                return;
            }

            if (effectCfg?.effectCallBack) {
                effectCfg.effectCallBack(eff);
            }

            // 循环特效需要手动停止 或者 传参立即停止
            if (seq.loop && effectCfg?.loopImmediate) return resolve();
            eff.once(Node.EventType.NODE_DESTROYED, () => {
                const arr = this.activeEffects.get(name);
                if (arr) {
                    const idx = arr.indexOf(eff);
                    if (idx !== -1) arr.splice(idx, 1);
                    if (arr.length === 0) this.activeEffects.delete(name);
                }
                seq.loop && resolve();
            });
            // 一次性特效播放完毕即resolve();
            const originalUpdate = seq.update.bind(seq);
            seq.update = (dt: number) => {
                originalUpdate(dt);
                // 当播放到最后一帧时就解析Promise 避免黑帧
                if (!seq.loop && seq._index === seq.frames.length - 1) {
                    resolve();
                }
            };
        });
    }

    /** 查询某特效是否正在场景中激活（播放中） */
    public static isEffectActive(name: string): boolean {
        // 支持别名
        if (this.aliasMap.has(name)) {
            name = this.aliasMap.get(name)!;
        }

        const list = this.activeEffects.get(name);
        return !!list && list.length > 0;
    }

    /**
     * 销毁特效
     * @param name 特效名称
     */
    public static stopEffect(name: string, targetNode?: Node): void {
        if (this.aliasMap.has(name)) {
            name = this.aliasMap.get(name)!;
        }

        const list = this.activeEffects.get(name);
        if (!list || list.length === 0) return;

        // 指定节点 消除目标节点上的所有同名特效
        if (targetNode) {
            const remain: Node[] = [];
            for (const node of list) {
                if (node && node.isValid && node.parent === targetNode) {
                    const seq = node.getComponent(SequenceFramePlay);
                    if (seq) seq.stop();
                    node.destroy();
                } else {
                    remain.push(node);
                }
            }

            if (remain.length > 0) this.activeEffects.set(name, remain);
            else this.activeEffects.delete(name);

            // LogicTools.myConsole(`[EffectManager] Stopped ${name} under targetNode`);
            return;
        }

        // 不指定节点 销毁全部同名
        for (const node of list) {
            if (node && node.isValid) {
                const seq = node.getComponent(SequenceFramePlay);
                if (seq) seq.stop();
                node.destroy();
            }
        }

        this.activeEffects.delete(name);
        // LogicTools.myConsole(`[EffectManager] Stopped all effects of ${name}`);
    }

    /** 持续时间 单位秒 */
    public static getEffectDuration(name: string): number {
        // 先查别名
        if (this.aliasMap.has(name)) {
            name = this.aliasMap.get(name)!;
        }

        const prefab = this.effectMap.get(name);
        if (!prefab) {
            console.warn(`[EffectManager] Effect not found: ${name}`);
            return 0;
        }

        // 临时实例化 prefab，用于读取 SequenceFramePlay
        const temp = instantiate(prefab);

        // 默认持续时间
        let duration = 0;

        // 查找 SequenceFramePlay 组件
        const seq = temp.getComponent(SequenceFramePlay);
        if (seq && seq.frames && seq.frameRate > 0) {
            duration = seq.frames.length / seq.frameRate;
        }

        const effectTimeScale = temp.getComponent(SequenceFramePlay).isTimeScaleEffected ? GameSpeedManager.GetInstance().getEffectTimeScale() : 1;
        // 销毁临时节点
        temp.destroy();
        return duration / effectTimeScale;
    }

    public static getEffectNode(name: string, parent: Node): Node | null {
        // 先查别名
        if (this.aliasMap.has(name)) {
            name = this.aliasMap.get(name)!;
        }

        const list = this.activeEffects.get(name);
        if (!list || list.length === 0) return null;

        // 找到 parent 上的此特效
        for (const node of list) {
            if (node && node.isValid && node.parent === parent) {
                return node;
            }
        }
        return null;
    }

    /**
     * 应用缩放到特效节点
     * @param node 特效节点
     * @param name 特效名称
     * @param scale 缩放参数
     */
    private static applyScale(node: Node, scale?: number | [number, number]) {
        let scaleX = 1;
        let scaleY = 1;

        // 处理传入的缩放参数
        if (Array.isArray(scale)) {
            // 指定宽高缩放
            scaleX = scale[0];
            scaleY = scale[1];
        } else {
            // 使用slotItem的缩放比例 slotItem预制件的宽高为80*78
            const ratios = GridManager.fillRatios[scale];
            if (ratios) {
                scaleX = ratios[0] * (80 / node.getComponent(UITransform).width);
                scaleY = ratios[1] * (78 / node.getComponent(UITransform).height);
            }
        }

        // 应用缩放
        node.setScale(scaleX, scaleY, 1);
    }
}

(window as any).EffectManager = EffectManager;

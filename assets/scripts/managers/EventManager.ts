import { macro, director, Scheduler } from "cc";

interface Subscription {
    callback: Function;
    target?: any;
    once?: boolean;
}

export const enum E_GAME_EVENT {
    NONE,
    /** 分包资源加载完成 */
    RESOURCE_LOAD_END,
    /** 用户登录信息返回 */
    USER_INFO_RETURN_END,

    /** 进入主游戏界面 */
    GAME_ENTER_MAIN_SCENE,

    /** 游戏模式切换 */
    GAME_MODE_TOGGLE,

    /** 开始初始化界面 */
    GAME_GRID_INIT_DATA,
    /** 刷新无奖励 */
    GAME_GRID_UPDATA_NO_CONSECUTIVE,
    /** 刷新有奖励 */
    GAME_GRID_UPDATA_CONSECUTIVE,
    /** 查询有连击 */
    GAME_GRID_QUERY_CONSECUTIVE,
    /** 查询无连击 */
    GAME_GRID_QUERY_NO_CONSECUTIVE,
    /** Moro攻击 */
    GAME_MORO_ATTACK,
    /** Moro攻击结束 */
    GAME_MORO_ATTACK_END,
    /** Moro升级弓 */
    GAME_MORO_UPGRADE_BOW,
    /** Moro升级弓结束 */
    // GAME_MORO_UPGRADE_BOW_END,
    /** Moro升级箭 */
    GAME_MORO_UPGRADE_ARROW,
    /** Moro升级箭结束 */
    // GAME_MORO_UPGRADE_ARROW_END,
    /** 累计甲虫倍率后的攻击 */
    GAME_MORO_ATTACK2,

    /** 免费模式开始 */
    GAME_FREE_INIT,
    /** 免费模式刷新无奖励 */
    GAME_FREE_REFRESH_NO_CONSECUTIVE,
    /** 免费模式刷新有奖励 */
    GAME_FREE_REFRESH_CONSECUTIVE,
    /** 免费模式combo结束 */
    GAME_FREE_COMBO_END,
    /** 免费模式结束 */
    GAME_FREE_END,
    /** 普通的Combo进入免费模式 */
    GAME_NORMAL_INTER_FREE,

    /** 自动模式开启--管理类派发 */
    GAME_AUTO_MODE_OPEN,
    /** 自动模式关闭 */
    GAME_AUTO_MODE_CLOSE,

    /** 下落动画结束 */
    GAME_GRID_DROP_END,

    /** 新的一轮BET */
    GAME_NEW_BET,
    /** 一轮BET结束--自动模式中会等自动模式结束再派发 */
    GAME_BET_END,
    /** 选择筹码消息回来或者加倍消息回来 */
    GAME_CHIP_SELECT_UPDATE,

    /** combo历史添加 */
    GAME_COMBO_HISTORY_ADD,

    /** 请求历史记录简略列表 */
    GAME_HISTORY_LIST_QUERY,
    /** 历史记录简略列表返回 */
    GAME_HISTORY_LIST_QUERY_RETURN,
    /** 请求历史记录详情 */
    GAME_HISTORY_DETAIL_QUERY,
    /** 历史记录详情返回 */
    GAME_HISTORY_DETAIL_QUERY_RETURN,
    /** 请求历史记录回放 */
    GAME_HISTORY_REPLAY_QUERY,
    /** 历史记录回放返回 */
    GAME_HISTORY_REPLAY_QUERY_RETURN,
    /** 历史记录回放结束 */
    GAME_HISTORY_REPLAY_END,
    /** 回放操作--继续 */
    GAME_REPLAY_CONTINUE,
    /** 回放操作--暂停 */
    GAME_REPLAY_PAUSE,
    /** 回放操作--终止 */
    GAME_REPLAY_STOP,

    /** 游戏速度更新 */
    GAME_SPEED_UPDATE,
}

export class EventManager {
    private static _scheduleTarget: any = (() => {
        const target: any = {};
        Scheduler.enableForTarget(target);
        return target;
    })();

    /** 普通与一次性事件统一管理 */
    private static events: Map<E_GAME_EVENT, Set<Subscription>> = new Map();

    /** 调试开关 */
    private static DEBUG = false;

    /**
     * 注册事件
     * @param eventEnum 事件名
     * @param callback 回调函数
     * @param target 绑定对象
     */
    public static on(eventEnum: E_GAME_EVENT, callback: Function, target?: any): void {
        this.addListener(eventEnum, callback, target, false);
    }

    /**
     * 注册一次性事件
     * @param eventEnum 事件名
     * @param callback 回调函数
     * @param target 绑定对象
     */
    public static once(eventEnum: E_GAME_EVENT, callback: Function, target?: any): void {
        this.addListener(eventEnum, callback, target, true);
    }

    /**
     * 等待多个事件都触发后再执行回调
     * @param events 要等待的事件数组
     * @param callback 所有事件都触发时执行的回调
     * @param options 可选参数：
     *        timeout 超时时间（毫秒）
     *        executeOnTimeout 超时后是否依然执行回调（默认为 false）
     *        once 是否只监听一次（默认为 true）
     * @returns 可手动取消监听的函数
     */
    public static waitForEvents(
        events: E_GAME_EVENT[],
        callback: (result: Record<E_GAME_EVENT, any[]>, isTimeout?: boolean) => Promise<void> | void,
        options?: { timeout?: number; executeOnTimeout?: boolean; once?: boolean }
    ): (triggerNow?: boolean) => void {
        if (!Array.isArray(events) || events.length === 0) {
            throw new Error("[EventManager] waitForEvents requires a non-empty event list");
        }

        const { timeout = 10000, executeOnTimeout = false, once = true } = options || {};

        const triggered = new Set<E_GAME_EVENT>();
        const results: Record<E_GAME_EVENT, any[]> = {} as any;
        const offFns: (() => void)[] = [];
        let finished = false;
        let elapsed = 0;

        const scheduleTarget = this._scheduleTarget;
        const cocosScheduler = director.getScheduler();

        const complete = async (isTimeout = false) => {
            if (finished) return;
            finished = true;
            offFns.forEach((fn) => fn());
            if (timeout > 0) cocosScheduler.unschedule(checkTimeout, scheduleTarget);
            await callback(results, isTimeout);
        };

        const checkAllTriggered = () => {
            if (triggered.size >= events.length) complete(false);
        };

        for (const e of events) {
            const fn = (...args: any[]) => {
                if (finished) return;
                triggered.add(e);
                results[e] = args;
                checkAllTriggered();
                if (!once) triggered.delete(e);
            };
            this.on(e, fn);
            offFns.push(() => this.off(e, fn));
        }

        const checkTimeout = (dt: number) => {
            if (finished) return;
            elapsed += dt * 1000;
            if (elapsed >= timeout) {
                if (executeOnTimeout) complete(true);
                else {
                    finished = true;
                    cocosScheduler.unschedule(checkTimeout, scheduleTarget);
                    offFns.forEach((fn) => fn());
                }
            }
        };

        if (timeout > 0) {
            cocosScheduler.schedule(checkTimeout, scheduleTarget, 0, macro.REPEAT_FOREVER, 0);
        }

        return (triggerNow = false) => {
            if (finished) return;
            if (timeout > 0) cocosScheduler.unschedule(checkTimeout, scheduleTarget);
            offFns.forEach((fn) => fn());
            finished = true;
            if (triggerNow) complete(true);
        };
    }

    /** 统一添加监听器 */
    private static addListener(eventEnum: E_GAME_EVENT, callback: Function, target?: any, once = false) {
        if (!eventEnum || typeof callback !== "function") return;

        if (!this.events.has(eventEnum)) {
            this.events.set(eventEnum, new Set());
        }

        const list = this.events.get(eventEnum);
        list.add({ callback, target, once });

        if (this.DEBUG) console.log(`[EventManager] on: ${eventEnum} (${once ? "once" : "normal"})`);
    }

    /**
     * 取消事件注册
     * @param eventEnum 事件名
     * @param callback 回调
     * @param target 目标
     */
    public static off(eventEnum: E_GAME_EVENT, callback?: Function, target?: any): void {
        const list = this.events.get(eventEnum);
        if (!list) return;

        for (const sub of list) {
            if ((!callback || sub.callback === callback) && (!target || sub.target === target)) {
                list.delete(sub);
            }
        }

        if (list.size === 0) this.events.delete(eventEnum);
        if (this.DEBUG) console.log(`[EventManager] off: ${eventEnum}`);
    }

    /**
     * 触发事件
     * @param eventEnum 事件名
     * @param args 传参
     */
    public static emit(eventEnum: E_GAME_EVENT, ...args: any[]): void {
        const list = this.events.get(eventEnum);
        if (!list || list.size === 0) return;
        // 拷贝一份防止回调内删除影响遍历
        const listeners = Array.from(list);

        for (const sub of listeners) {
            const { callback, target, once } = sub;

            try {
                // 自动跳过已销毁对象
                if (target && (target as any).__destroyed) continue;
                if (target && (target as any).destroyed) continue;
                callback.apply(target, args);
            } catch (err) {
                console.error(`[EventManager] Error in ${eventEnum}:`, err);
            }

            // once 类型自动删除
            if (once) list.delete(sub);
        }

        if (list.size === 0) this.events.delete(eventEnum);
    }

    /**
     * 移除某个事件
     * @param eventEnum 事件名
     */
    public static remove(eventEnum: E_GAME_EVENT): void {
        this.events.delete(eventEnum);
        if (this.DEBUG) console.log(`[EventManager] remove: ${eventEnum}`);
    }

    /**
     * 取消指定 target 身上所有事件监听
     * @param target 目标节点或组件实例
     */
    public static removeAllByTarget(target: any): void {
        if (!target) return;
        for (const [eventEnum, subs] of this.events) {
            for (const sub of subs) {
                if (sub.target === target) {
                    subs.delete(sub);
                }
            }
            if (subs.size === 0) {
                this.events.delete(eventEnum);
            }
        }
        if (this.DEBUG) console.log(`[EventManager] offAllByTarget:`, target);
    }

    /** 移除所有事件 */
    public static removeAll(): void {
        this.events.clear();
        if (this.DEBUG) console.log(`[EventManager] removeAll`);
    }

    /** 获取事件数量（调试用） */
    public static count(eventEnum?: E_GAME_EVENT): number {
        if (eventEnum) return this.events.get(eventEnum)?.size || 0;
        return this.events.size;
    }

    /** 打印当前所有事件（调试） */
    public static dump(): void {
        console.log("===== EventManager Dump =====");
        this.events.forEach((subs, eventEnum) => {
            console.log(`- ${eventEnum}: ${subs.size} listener(s)`);
        });
    }
}

(window as any).EventManager = EventManager;

//#region DEMO
// 注册事件
// EventManager.on("game-start", this.onGameStart, this);

// // 注册一次性事件
// EventManager.once("game-over", this.onGameOver, this);

// // 触发事件
// EventManager.emit("game-start", { level: 1 });

// // 移除事件
// EventManager.off("game-start", this.onGameStart, this);

// // 查看当前事件数量
// console.log(EventManager.count());

// // 调试打印
// EventManager.dump();
//#endregion

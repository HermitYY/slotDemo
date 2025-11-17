import { Singleton } from "../common/Singleton";
import globalConfig from "../common/GlobalConfig";
import proto from "../network/MLWZ_msg";

export interface InspectablePromise<T> {
    promise: Promise<T>;
    isFulfilled: () => boolean;
    isRejected: () => boolean;
    isPending: () => boolean;
    value: () => T | undefined;
    reason: () => any;
}

export class LogicTools extends Singleton {
    /**
     * 消息解析
     */
    public transGridInfo(curScene: proto.newxxs.ICurScene) {
        if (!curScene) return;
        const cols = globalConfig.cols;
        const arr: Array<number> = curScene.panel.split(",").map(Number);
        const gridInfo = arr.reduce<Array<Array<number>>>((result: number[][], item: number, index: number) => {
            const col = index % cols;
            if (!result[col]) result[col] = [];
            result[col].push(item);
            return result;
        }, []);
        const awardIndexArrs = curScene.curicons || [];
        const chipsInfo = {
            /** 当前下注筹码 */
            curBetChips: curScene.curBetChips,
            /** 一共赢筹码-combo结束才有 */
            winChips: curScene.winChips,
            /** 当前combo赢筹码 */
            comboChips: curScene.curChips,
            /** 最大可下注筹码 */
            maxBetChips: curScene.maxBet,
            /** 最小需求下注筹码 */
            minBetChips: curScene.minBet,
            /** 账户当前筹码 */
            havenChips: curScene.surChips,
            /** 购买freeGame筹码 */
            buyFreeChips: curScene.buyFreeChips,
        };
        const betChipsSelects = curScene.betChips || [];
        return {
            gridInfo,
            awardIndexArrs,
            chipsInfo,
            betChipsSelects,
        };
    }

    public static Delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public static waitNextFrame(): Promise<void> {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    }

    public static makeInspectable<T>(promise: Promise<T>): InspectablePromise<T> {
        let status: "pending" | "fulfilled" | "rejected" = "pending";
        let value: T | undefined = undefined;
        let reason: any = undefined;

        promise.then(
            (v) => {
                status = "fulfilled";
                value = v;
            },
            (e) => {
                status = "rejected";
                reason = e;
            }
        );

        return {
            promise,
            isFulfilled: () => status === "fulfilled",
            isRejected: () => status === "rejected",
            isPending: () => status === "pending",
            value: () => value,
            reason: () => reason,
        };
    }

    public static myConsole(...args: any[]) {
        if (globalConfig.isShowLog) {
            LogicTools.myConsole(...args);
        }
    }
}

type DebounceThrottleOptions = {
    wait: number;
    leading?: boolean;
    trailing?: boolean;
};

function normalizeOptions(waitOrOpt?: number | DebounceThrottleOptions) {
    if (typeof waitOrOpt === "number") {
        return { wait: waitOrOpt, leading: true, trailing: false } as DebounceThrottleOptions;
    }
    return {
        wait: waitOrOpt?.wait ?? 300,
        leading: waitOrOpt?.leading ?? true,
        trailing: waitOrOpt?.trailing ?? false,
    } as DebounceThrottleOptions;
}

function createDebounce(fn: Function, options: DebounceThrottleOptions) {
    let timer: any = null;
    let lastArgs: any[] | null = null;
    let hasCalledLeading = false;

    const debounced = function (this: any, ...args: any[]) {
        lastArgs = args;

        if (!hasCalledLeading && options.leading) {
            hasCalledLeading = true;
            fn.apply(this, args);
        }

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            if (options.trailing && lastArgs) {
                fn.apply(this, lastArgs);
            }
            timer = null;
            hasCalledLeading = false;
        }, options.wait);
    };

    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        hasCalledLeading = false;
    };

    return debounced;
}

function createThrottle(fn: Function, options: DebounceThrottleOptions) {
    let timer: any = null;
    let lastArgs: any[] | null = null;
    let inThrottle = false;

    const throttled = function (this: any, ...args: any[]) {
        if (!inThrottle) {
            if (options.leading) {
                fn.apply(this, args);
            } else {
                lastArgs = args;
            }
            inThrottle = true;
            timer = setTimeout(() => {
                if (options.trailing && lastArgs) {
                    fn.apply(this, lastArgs);
                }
                inThrottle = false;
                timer = null;
                lastArgs = null;
            }, options.wait);
        } else {
            lastArgs = args;
        }
    };

    throttled.cancel = () => {
        if (timer) clearTimeout(timer);
        inThrottle = false;
        timer = null;
        lastArgs = null;
    };

    return throttled;
}

/**
 * 防抖 触发后等待 delay 毫秒，如果这段时间内再次触发则重新计时
 */
export function Debounce(opt?: number | DebounceThrottleOptions) {
    const options = normalizeOptions(opt);
    return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!original.__debouncedFn) {
                original.__debouncedFn = createDebounce(original.bind(this), options);
            }
            return original.__debouncedFn(...args);
        };
        descriptor.value.cancel = () => {
            original.__debouncedFn?.cancel?.();
        };
    };
}

/**
 * 节流 在 delay 时间内，无论触发多少次，只执行一次
 */
export function Throttle(opt?: number | DebounceThrottleOptions) {
    const options = normalizeOptions(opt);
    return function (_target: any, _key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!original.__throttledFn) {
                original.__throttledFn = createThrottle(original.bind(this), options);
            }
            return original.__throttledFn(...args);
        };
        descriptor.value.cancel = () => {
            original.__throttledFn?.cancel?.();
        };
    };
}

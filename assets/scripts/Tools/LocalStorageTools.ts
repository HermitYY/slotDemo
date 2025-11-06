import { Singleton } from "../common/Singleton";

export enum StorageKey {
    BGM_VALUE = "music_value",
    SFX_VALUE = "sfx_value",
}

export class LocalStorageTools extends Singleton {
    /**
     * 保存数据到 localStorage
     * @param key StorageKey 枚举键名
     * @param value 任意类型，内部自动 JSON 序列化
     */
    public setItem(key: StorageKey, value: any): void {
        try {
            const data = JSON.stringify(value);
            localStorage.setItem(key, data);
        } catch (e) {
            console.error(`localStorage setItem error [${key}]`, e);
        }
    }

    /**
     * 从 localStorage 读取数据
     * @param key StorageKey 枚举键名
     * @param defaultValue 如果没有数据返回默认值
     */
    public getItem<T>(key: StorageKey, defaultValue: T | null = null): T | null {
        try {
            const data = localStorage.getItem(key);
            if (data === null) return defaultValue;
            return JSON.parse(data) as T;
        } catch (e) {
            console.error(`localStorage getItem error [${key}]`, e);
            return defaultValue;
        }
    }

    /**
     * 删除某个 key
     */
    public removeItem(key: StorageKey): void {
        localStorage.removeItem(key);
    }

    /**
     * 清空所有 storage
     */
    public clear(): void {
        localStorage.clear();
    }
}

(window as any).LocalStorageTools = LocalStorageTools.GetInstance();

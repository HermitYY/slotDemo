import { _decorator } from "cc";
import { Singleton } from "../common/Singleton";
import { LogicTools } from "../Tools/LogicTools";
const { ccclass } = _decorator;

@ccclass("WebSocketUtil")
export class WebSocketUtil extends Singleton {
    private ws: WebSocket | null = null;
    private messageHandlers: { [key: string]: (msg: ArrayBuffer) => void } = {};
    private heartTimer: any = null;
    private onOpenCallback: Function | null = null;

    public isConnected: boolean = false;

    /** 初始化并连接 */
    public Init(url: string, onOpen: Function): void {
        if (this.ws && this.isConnected) {
            console.warn("WebSocket 已连接，跳过重复初始化");
            return;
        }

        this.onOpenCallback = onOpen;
        LogicTools.myConsole("正在连接 WebSocket:", url);
        this.ws = new WebSocket(url);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = (event) => {
            LogicTools.myConsole("WebSocket 连接成功");
            this.isConnected = true;
            if (this.onOpenCallback) this.onOpenCallback();
        };

        this.ws.onmessage = (event) => {
            this.handleMessage(event.data);
        };

        this.ws.onclose = (event) => {
            console.warn("WebSocket 连接已关闭");
            this.isConnected = false;
            this.clearHeart();
            this.triggerEvent("onclose");
        };

        this.ws.onerror = (event) => {
            console.error("WebSocket 出错:", event);
            this.isConnected = false;
        };
    }

    public SendMsg(ptype: number | string, messageType: number | string, data: ArrayBuffer | Uint8Array): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket not connected");
            return;
        }
        const ptypeNum = Number(ptype);
        const messageTypeNum = Number(messageType);
        const rawData = data instanceof Uint8Array ? data : new Uint8Array(data);
        const bufferWithHeader = new ArrayBuffer(rawData.byteLength + 8);
        const dataView = new DataView(bufferWithHeader);
        // 小端
        dataView.setUint32(0, ptypeNum, true);
        dataView.setUint32(4, messageTypeNum, true);
        new Uint8Array(bufferWithHeader, 8).set(rawData);
        // if (messageTypeNum !== 10000 && messageTypeNum !== 1) {
        //     console.debug(`Sending message type: ${messageTypeNum}`);
        // }
        try {
            this.ws.send(bufferWithHeader);
        } catch (error) {
            console.error("Failed to send message", error);
        }
    }

    /** 注册事件回调 */
    public RegisterEvent(key: string | number, handler: (msg: ArrayBuffer) => void): void {
        this.messageHandlers[key] = handler;
    }

    /** 分发消息 */
    private handleMessage(data: ArrayBuffer): void {
        const view = new DataView(data);
        const signalType = view.getUint32(0, true);
        const body = data.slice(8);

        const handler = this.messageHandlers[signalType];
        if (handler) {
            handler(body);
        } else {
            console.warn("未注册的消息类型:", signalType);
        }
    }

    /** 启动心跳包 */
    public startHeart(callback: Function): void {
        this.clearHeart();
        this.heartTimer = setInterval(() => {
            callback();
        }, 4000);
        LogicTools.myConsole("心跳启动");
    }

    /** 停止心跳 */
    public stopHeart(): void {
        this.clearHeart();
    }

    private clearHeart(): void {
        if (this.heartTimer) {
            clearInterval(this.heartTimer);
            this.heartTimer = null;
        }
    }

    /** 主动关闭连接 */
    public close(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.clearHeart();
    }

    /** 内部触发事件 */
    private triggerEvent(key: string): void {
        const handler = this.messageHandlers[key];
        if (handler) handler(null);
    }

    /** 调试用：暴露内部状态 */
    public get webScoketObj() {
        return {
            ws: this.ws,
            isConnected: this.isConnected,
            heartTimer: this.heartTimer,
            handlers: Object.keys(this.messageHandlers),
        };
    }
}

// 调试用全局挂载
(window as any).WebSocketUtil = WebSocketUtil.GetInstance();

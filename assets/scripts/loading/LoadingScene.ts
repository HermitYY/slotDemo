import { _decorator, Component, Node, UITransform, UIOpacity, director, assetManager, Label } from "cc";
import { SocketManager } from "../network/SocketManager";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
import { EffectManager } from "../managers/EffectManager";
import { AudioManager } from "../managers/AudioManager";
import { PopupMask } from "../ui/popup/PopupMask";
import { PopupTips } from "../ui/popup/PopupTips";
import { Debounce, LogicTools } from "../Tools/LogicTools";

const { ccclass, property } = _decorator;

@ccclass("LoadingScene")
export class LoadingScene extends Component {
    @property(Node)
    public mask!: Node;

    @property(Node)
    public bar!: Node;

    @property(Node)
    public ladybird!: Node;

    @property
    public minLoadTime: number = 10; // 最小加载时间（秒）

    @property(Label)
    progressLabel: Label | null = null;

    @property(Node)
    private beginButton!: Node;
    @property(Node)
    private barGroup!: Node;
    @property(Node)
    private errorTips!: Node;

    private currentProgress: number = 0;
    private actualProgress: number = 0;
    private elapsedTime: number = 0;
    private loadCompleted: boolean = false;

    private maskTransform!: UITransform;
    private barTransform!: UITransform;
    private maxMaskWidth: number = 0;

    private isError: boolean = false;
    private isLoadInfoReturn: boolean = false;

    onLoad(): void {
        const username = "yy123e";
        const password = "yy123e0928";
        SocketManager.GetInstance().Init(username, password);
        // 等待资源加载完成与用户信息返回后开始进入主界面
        EventManager.waitForEvents(
            [E_GAME_EVENT.USER_INFO_RETURN_END, E_GAME_EVENT.RESOURCE_LOAD_END],
            async (result, isTimeout) => {
                if (isTimeout) {
                    console.warn("异常,资源加载超时", result);
                } else {
                    this.beginButtonShow(true);
                    this._loadGameEffect();
                }
            },
            { timeout: 100000, executeOnTimeout: true }
        );
        this.beginButtonShow(false);
        EventManager.on(E_GAME_EVENT.NETWORK_ERROR, this.showError, this);
        EventManager.on(
            E_GAME_EVENT.USER_INFO_RETURN_END,
            () => {
                this.isLoadInfoReturn = true;
            },
            this
        );
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    start() {
        // 获取组件
        this.maskTransform = this.mask.getComponent(UITransform)!;
        this.barTransform = this.bar.getComponent(UITransform)!;

        // 初始化 mask 宽度
        this.maxMaskWidth = this.barTransform.width;
        this.maskTransform.width = 0;

        this.elapsedTime = 0;

        this._loadGameBundle();
    }

    private _loadGameBundle() {
        assetManager.loadBundle("game", (err, bundle) => {
            if (err) return console.error("加载主游戏包失败", err);

            // 加载 bundle 下所有资源
            bundle.loadDir(
                "",
                (completed, total) => {
                    this.actualProgress = total > 0 ? completed / total : 0;
                },
                (err) => {
                    if (err) return console.error("分包资源加载失败", err);
                    this.loadCompleted = true;
                }
            );
        });
    }

    async _loadGameEffect() {
        await AudioManager.GetInstance().preloadAll();
        LogicTools.myConsole("音频资源预加载完成");
        await EffectManager.preloadAll();
        LogicTools.myConsole("特效资源预加载完成");
    }

    update(deltaTime: number) {
        if (this.isError) return;

        this.elapsedTime += deltaTime;

        // 计算受最小加载时间限制的目标进度
        const timeLimitedProgress = Math.min(1, this.elapsedTime / this.minLoadTime);
        const targetProgress = Math.max(this.actualProgress, timeLimitedProgress);

        // const targetProgress = this.actualProgress;

        // 平滑更新 currentProgress
        if (this.currentProgress < targetProgress) {
            this.currentProgress += (targetProgress - this.currentProgress) * 0.1;
            const progress = Math.min(this.currentProgress, 1);

            this._updateMaskAndIcons(progress);

            if (this.progressLabel) {
                this.progressLabel.string = `Memuat sumber daya [${(progress * 100 - (this.isLoadInfoReturn ? 0 : 0.01)).toFixed(2)}%]`;
            }
        }

        // 当资源加载完成且进度条接近满时切换场景
        if (this.loadCompleted && this.currentProgress >= 0.99) {
            // 通知资源加载完成
            EventManager.emit(E_GAME_EVENT.RESOURCE_LOAD_END);
            // this._loadGameEffect();
            this.loadCompleted = false;
        }
    }

    private _updateMaskAndIcons(progress: number) {
        // 更新 mask 宽度
        this.maskTransform.width = this.maxMaskWidth * progress;

        // 计算图标 x 位置
        const barLeft = this.bar.getPosition().x - this.maxMaskWidth / 2;
        const xPos = barLeft + this.maxMaskWidth * progress;

        this.ladybird.setPosition(xPos, this.ladybird.getPosition().y, 0);
    }

    public enterGameScene() {
        const bundle = assetManager.getBundle("game");
        if (!bundle) return console.error("找不到 game bundle");

        bundle.loadScene("mainGame", (err, scene) => {
            if (err) return console.error("加载 mainGame 场景失败", err);
            director.runScene(scene);
        });
    }

    private beginButtonShow(isShow: boolean) {
        this.beginButton.active = isShow;
        this.barGroup.active = !isShow;
    }

    @Debounce(500)
    private showError() {
        this.errorTips.active = true;
        this.isError = true;
        const popup = this.errorTips.getComponent(PopupTips);
        popup.SetText("NETWORK ERROR");
        popup.SetCloseCallBack(() => {
            location.reload();
        });
        popup.show();
    }
}

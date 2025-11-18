import { _decorator, Component, find, director, view, ResolutionPolicy } from "cc";
import { PopupManager } from "../ui/popup/PopupManager";
import { AudioManager } from "./AudioManager";

const { ccclass } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    private static _inst: GameManager;

    public static get inst(): GameManager {
        return this._inst;
    }

    onLoad() {
        if (GameManager._inst) {
            this.node.destroy(); // 保证单例
            return;
        }
        GameManager._inst = this;

        // 设置为常驻节点（切换场景不销毁）
        director.addPersistRootNode(this.node);

        // 游戏启动时初始化
        PopupManager.init(find("Canvas/MainGame/PopupRoot"));
        AudioManager.GetInstance().init(find("Canvas/MainGame/AudioRoot/BgmPlayer"), find("Canvas/MainGame/AudioRoot/SfxPlayers"));

        // view.setDesignResolutionSize(540, 960, ResolutionPolicy.FIXED_HEIGHT);
    }

    private printTimer: number = 0;
    private readonly PRINT_INTERVAL: number = 3; // 3秒间隔

    protected update(dt: number): void {
        // this.printTimer += dt;
        // if (this.printTimer >= this.PRINT_INTERVAL) {
        //     console.log(view);
        //     this.printTimer = 0; // 重置计时器
        // }
    }

    start() {}
}

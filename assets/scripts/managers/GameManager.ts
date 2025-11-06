import { _decorator, Component, find, director } from "cc";
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
        PopupManager.init(find("Canvas/PopupRoot"));
        AudioManager.GetInstance().init(find("Canvas/AudioRoot/BgmPlayer"), find("Canvas/AudioRoot/SfxPlayers"));
    }

    start() {}
}

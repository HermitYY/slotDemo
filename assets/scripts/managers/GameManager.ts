import { _decorator, Component, find, director, view, ResolutionPolicy } from "cc";
import { E_POPUP_TYPE, PopupManager } from "../ui/popup/PopupManager";
import { AudioManager } from "./AudioManager";
import { E_GAME_EVENT, EventManager } from "./EventManager";
import { E_POPUP_TIPS_SHIW_TYPE, PopupTips } from "../ui/popup/PopupTips";
import { Debounce } from "../Tools/LogicTools";

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

        // 设置为常驻节点
        director.addPersistRootNode(this.node);

        // 游戏启动时初始化
        PopupManager.init(find("Canvas/MainGame/PopupRoot"));
        AudioManager.GetInstance().init(find("Canvas/MainGame/AudioRoot/BgmPlayer"), find("Canvas/MainGame/AudioRoot/SfxPlayers"));

        EventManager.on(E_GAME_EVENT.NETWORK_ERROR, this.showError, this);
        // view.setDesignResolutionSize(540, 960, ResolutionPolicy.FIXED_HEIGHT);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    @Debounce(500)
    private async showError() {
        const popup = await PopupManager.create<PopupTips>(E_POPUP_TYPE.Tips);
        popup.SetText("NETWORK ERROR");
        popup.SetCloseCallBack(() => {
            location.reload();
        });
        popup.show();
    }
}

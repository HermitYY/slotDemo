import { _decorator, Component, Prefab } from "cc";
import { PopupManager } from "../popup/PopupManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("SettingButton")
export class SettingButton extends Component {
    @property(Prefab)
    PopupWindow: Prefab = null!;

    start() {}

    onClickOpen() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const worldPos = this.node.worldPosition.clone();
        // worldPos.x += 106;
        PopupManager.show(this.PopupWindow, { fromButtonPos: worldPos });
    }
}

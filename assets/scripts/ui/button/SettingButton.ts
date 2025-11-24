import { _decorator, Component, Prefab } from "cc";
import { E_POPUP_TYPE, PopupManager } from "../popup/PopupManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("SettingButton")
export class SettingButton extends Component {
    onClickOpen() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const worldPos = this.node.worldPosition.clone();
        worldPos.x -= 25;
        PopupManager.show(E_POPUP_TYPE.Setting, { fromButtonPos: worldPos });
    }
}

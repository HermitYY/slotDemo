import { _decorator, Component, Prefab, Label, Vec3, UITransform, Button } from "cc";
import { E_POPUP_TYPE, PopupManager } from "../popup/PopupManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("MyBankButton")
export class MyBankButton extends Component {
    public static banOpacity = 120;
    public static canUseOpacity = 255;

    private button: Button = null!;

    protected onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_NEW_BET, this.selfBan, this);
        EventManager.on(E_GAME_EVENT.GAME_BET_END, this.selfUnBan, this);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }
    onClickMyBankButton() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const nodeWidth = this.node.getComponent(UITransform)?.width || 0;
        const worldPos = new Vec3(this.node.worldPosition.x + nodeWidth / 2, this.node.worldPosition.y);
        PopupManager.show(E_POPUP_TYPE.MyBank, { fromButtonPos: worldPos });
    }

    selfBan() {
        this.button ??= this.node.getComponent(Button);
        this.button.interactable = false;
    }

    selfUnBan() {
        this.button ??= this.node.getComponent(Button);
        this.button.interactable = true;
    }
}

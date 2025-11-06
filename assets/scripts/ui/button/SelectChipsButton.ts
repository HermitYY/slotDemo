import { _decorator, Component, Prefab, Label, Vec3, UITransform } from "cc";
import { PopupManager } from "../popup/PopupManager";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { E_GAME_MULTIPLE_TYPE, SocketManager } from "../../network/SocketManager";
import { EffectManager } from "../../managers/EffectManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("SelectChipsButton")
export class SelectChipsButton extends Component {
    public static banOpacity = 120;
    public static canUseOpacity = 255;
    @property(Prefab)
    PopupWindow: Prefab = null!;

    protected start(): void {
        EventManager.on(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.updateEffect, this);
        this.updateEffect();
    }
    onClickSelectChips() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        const nodeWidth = this.node.getComponent(UITransform)?.width || 0;
        const nodeHignt = this.node.getComponent(UITransform)?.height || 0;
        const worldPos = new Vec3(this.node.worldPosition.x - nodeWidth / 2, this.node.worldPosition.y - nodeHignt);
        PopupManager.show(this.PopupWindow, { fromButtonPos: worldPos });
    }

    updateEffect() {
        const data = SocketManager.GetInstance().CurScene;
        if (data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE) {
            if (EffectManager.isEffectActive("ToggleRightButtonEffect")) return;
            EffectManager.playEffect("ToggleRightButtonEffect", this.node, new Vec3(-106, -5, 0));
        } else {
            EffectManager.stopEffect("ToggleRightButtonEffect");
        }
    }
}

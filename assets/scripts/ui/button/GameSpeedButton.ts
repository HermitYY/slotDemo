import { _decorator, Component, Node } from "cc";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { GameSpeedManager, E_GAME_SPEED_TYPE } from "../../managers/GameSpeedManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("GameSpeedButton")
export class GameSpeedButton extends Component {
    @property(Node)
    normalSpeed: Node = null;
    @property(Node)
    fastSpeed: Node = null;
    @property(Node)
    superSpeed: Node = null;

    onLoad(): void {
        EventManager.on(E_GAME_EVENT.GAME_SPEED_UPDATE, this.updateButton, this);
    }

    start(): void {
        this.updateButton();
    }

    onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    updateButton() {
        const gameSpeed = GameSpeedManager.GetInstance().speed;
        this.normalSpeed.active = gameSpeed === E_GAME_SPEED_TYPE.NORMAL;
        this.fastSpeed.active = gameSpeed === E_GAME_SPEED_TYPE.FAST;
        this.superSpeed.active = gameSpeed === E_GAME_SPEED_TYPE.SUPER_FAST;
    }

    normalSpeedClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        GameSpeedManager.GetInstance().switchToSpeed(E_GAME_SPEED_TYPE.NORMAL);
    }

    fastSpeedClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        GameSpeedManager.GetInstance().switchToSpeed(E_GAME_SPEED_TYPE.FAST);
    }

    superSpeedClick() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        GameSpeedManager.GetInstance().switchToSpeed(E_GAME_SPEED_TYPE.SUPER_FAST);
    }
}

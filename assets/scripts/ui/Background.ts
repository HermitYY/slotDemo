import { _decorator, Component, Node, Sprite, SpriteFrame } from "cc";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
import { E_GAME_SCENE_TYPE } from "../network/SocketManager";
const { ccclass, property } = _decorator;

@ccclass("Background")
export class Background extends Component {
    @property(Sprite)
    private topBG: Sprite = null;
    @property(Sprite)
    private bottomBG: Sprite = null;
    @property(SpriteFrame)
    private normalTopBG: SpriteFrame = null;
    @property(SpriteFrame)
    private normalBottomBG: SpriteFrame = null;
    @property(SpriteFrame)
    private freeGameTopBG: SpriteFrame = null;
    @property(SpriteFrame)
    private freeGameBottomBG: SpriteFrame = null;

    start() {
        EventManager.on(E_GAME_EVENT.GAME_MODE_TOGGLE, this.gameModeToggle, this);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    update(deltaTime: number) {}

    gameModeToggle(data: E_GAME_SCENE_TYPE) {
        switch (data) {
            case E_GAME_SCENE_TYPE.NORMAL:
                this.toggleToNormalBG();
                break;

            case E_GAME_SCENE_TYPE.FREE_GAME:
                this.toggleToFreeGameBG();
                break;

            default:
                break;
        }
    }

    toggleToFreeGameBG() {
        this.topBG.spriteFrame = this.freeGameTopBG;
        this.bottomBG.spriteFrame = this.freeGameBottomBG;
    }

    toggleToNormalBG() {
        this.topBG.spriteFrame = this.normalTopBG;
        this.bottomBG.spriteFrame = this.normalBottomBG;
    }
}

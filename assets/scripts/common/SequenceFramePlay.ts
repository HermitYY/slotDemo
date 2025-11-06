import { _decorator, Component, Sprite, SpriteFrame } from "cc";
import { GameSpeedManager } from "../managers/GameSpeedManager";
const { ccclass, property } = _decorator;

@ccclass("SequenceFramePlay")
export class SequenceFramePlay extends Component {
    @property([SpriteFrame])
    public frames: SpriteFrame[] = [];

    @property
    public frameRate: number = 10;

    @property
    public loop: boolean = false;

    @property
    public autoDestroy: boolean = true;

    @property
    public autoPlay: boolean = true;

    @property
    public isTimeScaleEffected: boolean = false;

    private _sprite: Sprite | null = null;
    private _elapsed: number = 0;
    public _index: number = 0;
    private _playing: boolean = false;

    onLoad() {
        this._sprite = this.getComponent(Sprite);
        if (!this._sprite) {
            this._sprite = this.addComponent(Sprite);
        }
    }

    onEnable() {
        if (this.autoPlay) {
            this.play();
        }
    }

    update(dt: number) {
        if (!this._playing || !this.frames || this.frames.length === 0) return;
        this._elapsed += dt;
        const effectTimeScale = this.isTimeScaleEffected ? GameSpeedManager.GetInstance().getEffectTimeScale() : 1;
        const frameTime = 1 / this.frameRate / effectTimeScale;

        if (this._elapsed >= frameTime) {
            this._elapsed = 0;
            this._index++;

            if (this._index >= this.frames.length) {
                if (this.loop) {
                    this._index = 0;
                } else {
                    this._index = this.frames.length - 1;
                    this.stop();

                    if (this.autoDestroy && this.node.isValid) {
                        this.node.destroy();
                    }
                    return;
                }
            }

            if (this._sprite) {
                this._sprite.spriteFrame = this.frames[this._index];
            }
        }
    }

    public play() {
        if (!this.frames || this.frames.length === 0) return;
        this._playing = true;
        this._index = 0;
        this._elapsed = 0;
        if (this._sprite) {
            this._sprite.spriteFrame = this.frames[0];
        }
    }

    public stop() {
        this._playing = false;
    }
}

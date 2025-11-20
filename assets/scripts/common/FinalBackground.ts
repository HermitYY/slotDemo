import { _decorator, Component, SpriteFrame, Texture2D, ImageAsset } from "cc";
const { ccclass, property } = _decorator;

@ccclass("HTMLBackground")
export class HTMLBackground extends Component {
    @property(SpriteFrame)
    bgSprite: SpriteFrame = null!;

    private _div: HTMLDivElement | null = null;

    onLoad() {
        this.initBackground();
    }

    onDestroy() {
        if (this._div) {
            document.body.removeChild(this._div);
            this._div = null;
        }
    }

    private initBackground() {
        if (!this.bgSprite) {
            console.warn("背景 SpriteFrame 未设置！");
            return;
        }

        const imageAsset = this.bgSprite.texture instanceof Texture2D ? this.bgSprite.texture.image : ((this.bgSprite.texture as any).image as ImageAsset);

        if (!imageAsset) {
            console.warn("无法从 SpriteFrame 中取得 ImageAsset");
            return;
        }

        const url = imageAsset.url;
        const div = document.createElement("div");
        this._div = div;

        Object.assign(div.style, {
            position: "fixed",
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "-1",
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        });

        document.body.appendChild(div);
    }
}

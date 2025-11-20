import { _decorator, Component, SpriteFrame, Texture2D, ImageAsset, CCFloat, CCBoolean } from "cc";
import { E_GAME_EVENT, EventManager } from "../managers/EventManager";
const { ccclass, property } = _decorator;

@ccclass("FlipPNGIcon")
export class FlipPNGIcon extends Component {
    @property([SpriteFrame])
    frames: SpriteFrame[] = [];

    @property(CCBoolean)
    switch = false;

    private container: HTMLDivElement | null = null;
    private imgs: HTMLImageElement[] = [];
    private loopTimer: any = null;

    onLoad() {
        if (!this.switch) return;
        if (this.frames.length < 4) console.warn("SpriteFrame 缺失");
        this.createUI();
        this.playEnterAnimation();
        EventManager.waitForEvents(
            [E_GAME_EVENT.USER_INFO_RETURN_END, E_GAME_EVENT.RESOURCE_LOAD_END],
            async (result, isTimeout) => {
                if (isTimeout) {
                } else {
                    this.close();
                }
            },
            { timeout: 100000, executeOnTimeout: true }
        );
    }

    onDestroy() {
        this.close();
    }

    public close() {
        if (this.loopTimer) {
            clearTimeout(this.loopTimer);
            this.loopTimer = null;
        }
        if (this.container) {
            document.body.removeChild(this.container);
            this.container = null;
        }
    }

    private createUI() {
        const div = document.createElement("div");
        this.container = div;

        Object.assign(div.style, {
            position: "fixed",
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "100",
        });

        this.frames.forEach((sf, index) => {
            const img = document.createElement("img");

            const tex = sf.texture as Texture2D;
            const imgAsset = tex.image as ImageAsset;
            img.src = imgAsset.url;

            Object.assign(img.style, {
                width: "12vw",
                height: "15vh",
                objectFit: "contain",
                transform: "scale(0) rotateY(0deg)",
                transition: "transform 1.5s linear",
            });

            this.imgs.push(img);
            div.appendChild(img);
        });

        document.body.appendChild(div);
    }

    private playEnterAnimation() {
        this.imgs.forEach((img) => {
            img.getBoundingClientRect();
        });

        setTimeout(() => {
            this.imgs.forEach((img) => {
                img.style.transform = "scale(1) rotateY(360deg)";
            });
        }, 50);

        this.startLoop();
    }

    private startLoop() {
        const loop = () => {
            this.imgs.forEach((img) => {
                img.style.transform = "scale(1) rotateY(360deg)";
            });

            setTimeout(() => {
                this.imgs.forEach((img) => {
                    img.style.transform = "scale(1) rotateY(0deg)";
                });

                this.loopTimer = setTimeout(loop, 3000);
            }, 1500);
        };

        this.loopTimer = setTimeout(loop, 3000);
    }
}

import { _decorator, Component, view, ResolutionPolicy, Canvas, Vec3 } from "cc";
const { ccclass, property } = _decorator;

const DESIGN_W = 540;
const DESIGN_H = 960;

@ccclass("FixedResolution")
export class FixedResolution extends Component {
    start() {
        view.setDesignResolutionSize(DESIGN_W, DESIGN_H, ResolutionPolicy.FIXED_HEIGHT);
        view.resizeWithBrowserSize(true);

        this.applyDomClamp();
        window.addEventListener("resize", () => this.applyDomClamp());
    }

    // applyDomClamp() {
    //     const frame = view.getFrameSize();
    //     const scale = frame.height / DESIGN_H;
    //     const expectedCanvasWidth = Math.round(DESIGN_W * scale);

    //     const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    //     if (canvas) {
    //         // canvas.width = DESIGN_W;
    //         // canvas.height = DESIGN_H;

    //         canvas.style.width = expectedCanvasWidth + "px";
    //         canvas.style.height = frame.height + "px";
    //         canvas.style.margin = "auto";
    //         canvas.style.display = "block"; // 居中
    //         canvas.style.backgroundColor = "black"; // 防白边
    //     }

    //     console.log(`[FixedResolution] frame=${frame.width}x${frame.height}, ` + `scale=${scale.toFixed(4)}, canvasCSSWidth=${expectedCanvasWidth}px`);
    // }

    // start() {
    //     view.setDesignResolutionSize(DESIGN_W, DESIGN_H, ResolutionPolicy.FIXED_HEIGHT);
    //     view.resizeWithBrowserSize(true);
    //     console.log("view", view);

    //     this.applyDomClamp();
    //     window.addEventListener("resize", () => this.applyDomClamp());
    // }

    applyDomClamp() {
        // 获取窗口高度
        const frameHeight = window.innerHeight;
        const scale = frameHeight / DESIGN_H;
        const expectedCanvasWidth = Math.round(DESIGN_W * scale);

        // 调整 canvas CSS
        const canvas = document.querySelector("#GameCanvas") as HTMLCanvasElement;
        if (canvas) {
            canvas.style.width = expectedCanvasWidth + "px";
            canvas.style.height = frameHeight + "px";
            canvas.style.margin = "auto";
            canvas.style.display = "block";
            canvas.style.backgroundColor = "black"; // 防白边
        }

        view.setFrameSize(expectedCanvasWidth, frameHeight);
        view.setCanvasSize(expectedCanvasWidth, frameHeight);

        console.log(`[FixedResolution] frame=${frameHeight}, scale=${scale.toFixed(4)}, canvasCSSWidth=${expectedCanvasWidth}px`);
    }
}

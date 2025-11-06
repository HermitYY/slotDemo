import { _decorator, Component, Node, UITransform, Vec3, Tween, Label } from "cc";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { E_GAME_MULTIPLE_TYPE as E_GAME_MULTIPLE_TYPE, SocketManager } from "../../network/SocketManager";
import { EffectManager } from "../../managers/EffectManager";
import { LogicTools } from "../../Tools/LogicTools";
import { UItools } from "../../Tools/UItools";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("ToggleHigh")
export class ToggleHigh extends Component {
    @property(Label)
    needChipslabel: Label = null;
    @property(Label)
    needChipslabelShadow: Label = null;
    @property(Node)
    public toggleNSignode: Node = null;

    private isHigh = false;
    private toggleIng = false;

    protected start(): void {
        EventManager.on(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.updateButton, this);
        this.OninitPos();
        this.updateEffect();
        this.updlabel();
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    public toggleHigh(): Promise<void> {
        if (this.isHigh) return Promise.resolve();
        const currentPos = this.toggleNSignode.position.clone();
        const nodeWidth = this.toggleNSignode.getComponent(UITransform)?.width || 0;
        const targetPos = new Vec3(currentPos.x + nodeWidth, currentPos.y, currentPos.z);

        return new Promise<void>((resolve) => {
            new Tween(this.toggleNSignode)
                .to(0.3, { position: targetPos })
                .call(() => {
                    this.toggleNSignode.setScale(-1, 1, 1);
                    this.isHigh = true;
                    resolve();
                })
                .start();
        });
    }

    public toggleLow(): Promise<void> {
        if (!this.isHigh) return Promise.resolve();
        const currentPos = this.toggleNSignode.position.clone();
        const nodeWidth = this.toggleNSignode.getComponent(UITransform)?.width || 0;
        const targetPos = new Vec3(currentPos.x - nodeWidth, currentPos.y, currentPos.z);

        return new Promise<void>((resolve) => {
            new Tween(this.toggleNSignode)
                .to(0.3, { position: targetPos })
                .call(() => {
                    this.toggleNSignode.setScale(1, 1, 1);
                    this.isHigh = false;
                    resolve();
                })
                .start();
        });
    }

    public onClick() {
        if (this.toggleIng) return;
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.toggleIng = true;
        SocketManager.GetInstance().setMultiple(!this.isHigh);
    }

    OninitPos() {
        const data = SocketManager.GetInstance().CurScene;
        if (data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE) {
            this.toggleNSignode.setScale(-1, 1, 1);
            const currentPos = this.toggleNSignode.position.clone();
            const nodeWidth = this.toggleNSignode.getComponent(UITransform)?.width || 0;
            this.toggleNSignode.position = new Vec3(currentPos.x + nodeWidth, currentPos.y, currentPos.z);
        }
        this.isHigh = data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE;
    }

    updateEffect() {
        const data = SocketManager.GetInstance().CurScene;
        if (data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE) {
            if (EffectManager.isEffectActive("ToggleButtonEffect")) return;
            EffectManager.playEffect("ToggleButtonEffect", this.node, new Vec3(0, 23));
        } else {
            EffectManager.stopEffect("ToggleButtonEffect");
        }
    }

    async updateButton(data) {
        this.updateEffect();
        if (data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE) {
            await this.toggleHigh();
        } else {
            await this.toggleLow();
        }
        this.toggleIng = false;
        this.isHigh = data.isMultiple == E_GAME_MULTIPLE_TYPE.IS_MULTIPLE;
        this.updlabel();
    }

    updlabel() {
        const data = SocketManager.GetInstance().CurScene;
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(data);
        this.needChipslabel.string = UItools.GetInstance().formatCurrency(chipsInfo.curBetChips, false);
        this.needChipslabelShadow.string = UItools.GetInstance().formatCurrency(chipsInfo.curBetChips, false);
    }
}

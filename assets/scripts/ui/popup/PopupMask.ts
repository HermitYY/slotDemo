import { _decorator, Prefab, UITransform, Vec3 } from "cc";
import { BasePopup } from "./BasePopup";
import { EffectManager } from "../../managers/EffectManager";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("PopupMask")
export class PopupMask extends BasePopup {
    private prePlayEffectArr: Array<
        Array<{
            effectName: string;
            effectName2?: string;
            effectName3?: string;
            wordPos: Vec3;
        }>
    > = [];

    override async show(): Promise<void> {
        await super.show();
        await this.playEffect();
        return super.show();
    }

    public setEffectCfg(
        prePlayEffectArr: Array<
            Array<{
                effectName: string;
                effectName2?: string;
                effectName3?: string;
                wordPos: Vec3;
            }>
        >
    ) {
        this.prePlayEffectArr = prePlayEffectArr;
    }

    private async playEffect0() {
        const parent = this.node;
        const uiTransform = parent.getComponent(UITransform);
        await Promise.all(
            this.prePlayEffectArr.reduce((promises, itemGroup) => {
                const groupPromises = itemGroup.reduce((innerPromises, item) => {
                    const localPos = uiTransform.convertToNodeSpaceAR(item.wordPos);
                    innerPromises.push(EffectManager.playEffect(item.effectName, parent, localPos, { loopImmediate: true }));
                    if (item.effectName2) {
                        innerPromises.push(EffectManager.playEffect(item.effectName2, parent, localPos, { loopImmediate: true }));
                    }
                    if (item.effectName3) {
                        innerPromises.push(EffectManager.playEffect(item.effectName3, parent, localPos, { loopImmediate: true }));
                    }
                    return innerPromises;
                }, [] as Promise<any>[]);

                return promises.concat(groupPromises);
            }, [] as Promise<any>[])
        );
    }

    // 每层递进 等待每层完成后下一层
    private async playEffect2() {
        const parent = this.node;
        const uiTransform = parent.getComponent(UITransform);
        for (const itemGroup of this.prePlayEffectArr) {
            // 每一组并行播放
            const groupPromises: Promise<any>[] = [];
            for (const item of itemGroup) {
                const localPos = uiTransform.convertToNodeSpaceAR(item.wordPos);
                groupPromises.push(EffectManager.playEffect(item.effectName, parent, localPos, { loopImmediate: true }));
                if (item.effectName2) {
                    groupPromises.push(EffectManager.playEffect(item.effectName2, parent, localPos, { loopImmediate: true }));
                }
                if (item.effectName3) {
                    groupPromises.push(EffectManager.playEffect(item.effectName3, parent, localPos, { loopImmediate: true }));
                }
            }
            // 等待当前组全部播放完，再继续下一组
            await Promise.all(groupPromises);
        }
    }

    // 每组并行 只等待组内
    private async playEffect() {
        const parent = this.node;
        const uiTransform = parent.getComponent(UITransform);
        await Promise.all(
            this.prePlayEffectArr.map(async (itemGroup) => {
                for (const item of itemGroup) {
                    const localPos = uiTransform.convertToNodeSpaceAR(item.wordPos);
                    const promises: Promise<any>[] = [];
                    promises.push(EffectManager.playEffect(item.effectName, parent, localPos, { loopImmediate: true }));
                    promises.push(this.playEffectAudio(item.effectName));
                    if (item.effectName2) {
                        promises.push(EffectManager.playEffect(item.effectName2, parent, localPos, { loopImmediate: true }));
                        promises.push(this.playEffectAudio(item.effectName));
                    }
                    if (item.effectName3) {
                        promises.push(EffectManager.playEffect(item.effectName3, parent, localPos, { loopImmediate: true }));
                        promises.push(this.playEffectAudio(item.effectName));
                    }
                    await Promise.all(promises);
                }
            })
        );
    }

    private async playEffectAudio(effectName: string) {
        switch (effectName) {
            case "SlotEffectClear_1":
            case "SlotEffectClear_2":
            case "SlotEffectClear_3":
            case "SlotEffectClear_4":
            case "SlotEffectClear_5":
                await AudioControlManager.GetInstance().playSfxLowRing();
                AudioControlManager.GetInstance().playSfxLowBoom();
                break;
            case "SlotEffectClear_6":
                await AudioControlManager.GetInstance().playSfxGridClear6();
                AudioControlManager.GetInstance().playSfxHeightBoom();
                break;
            case "SlotEffectClear_7":
                await AudioControlManager.GetInstance().playSfxGridClear7();
                AudioControlManager.GetInstance().playSfxHeightBoom();
                break;
            case "SlotEffectClear_8":
                await AudioControlManager.GetInstance().playSfxGridClear8();
                AudioControlManager.GetInstance().playSfxHeightBoom();
                break;
            case "SlotEffectClear_9":
                await AudioControlManager.GetInstance().playSfxGridClear9();
                AudioControlManager.GetInstance().playSfxHeightBoom();
                break;
            case "SlotEffectClear_14":
                AudioControlManager.GetInstance().playSfxIcon14();
                break;

            default:
                break;
        }
    }
}

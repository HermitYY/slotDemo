import { Singleton } from "../common/Singleton";
import { LogicTools } from "../Tools/LogicTools";
import { AudioManager, BgmEnum, PlayMode, SfxEnum } from "./AudioManager";
import { GameSpeedManager } from "./GameSpeedManager";

export class AudioControlManager extends Singleton {
    //#region background
    public async playBgmNormalBackground() {
        return AudioManager.GetInstance().playBgm(PlayMode.Replace, BgmEnum.Background);
    }

    public async playBgmFreeGameBackground() {
        return AudioManager.GetInstance().playBgm(PlayMode.Replace, BgmEnum.FreegameBackground);
    }
    //#endregion

    //#region sfx
    public async playBgmEnterFreeGame() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.EnterFreeGame);
    }

    public async playSfxMoroAttackBow() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.MoroAttackBow);
    }

    public async playSfxMoroAttackArrow() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.MoroAttackArrow);
    }

    public async playSfxMonsterHit() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.MonsterHit);
    }

    public async playSfxDemonDie() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.DemonDie);
    }

    public async playSfxBeetleMultipleShow() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.BeetleMultipleShow);
    }

    public async playSfxGridClear6() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.GridClear6);
    }
    public async playSfxGridClear7() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.GridClear7);
    }
    public async playSfxGridClear8() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.GridClear8);
    }
    public async playSfxGridClear9() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.GridClear9);
    }
    public async playSfxRefresh(delayTime: number) {
        await LogicTools.Delay(delayTime);
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.Refresh);
    }
    public async playSfxBowUpgrade1() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.BowUpgrade1);
    }
    public async playSfxBowUpgrade2() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.BowUpgrade2);
    }
    public async playSfxBowUpgrade3() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.BowUpgrade3);
    }
    public async playSfxBeetleMultipleAdd() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.BeetleMultipleAdd);
    }
    public async playSfxNormalButtonClick() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.NormalButtonClick);
    }
    public async playSfxQuickButtonClick() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.QuickButtonClick);
    }

    public async playSfxfreeEndAll() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.freeEndAll);
    }
    public async playSfxFreeEnd1() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.FreeEnd1);
    }
    public async playSfxFreeEnd2() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.FreeEnd2);
    }

    public async playSfxDingling() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.Dingling);
    }
    public async playSfxFireExplosion() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.FireExplosion);
    }
    public async playSfxFireBurning() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.FireBurning);
    }

    public async playSfxHeightBoom() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.HeightBoom);
    }

    public async playSfxIcon14() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.Icon14);
    }
    public async playSfxLowBoom() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.LowBoom);
    }
    public async playSfxLowRing() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.LowRing);
    }

    public async playSfxMerge() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.Merge);
    }
    public async playSfxMergeDisperse() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.MergeDisperse);
    }
    public async playSfxNumberSkip() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.NumberSkip);
    }

    public async playSfShortGold() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.ShortGold);
    }

    public async playSfxLoogGold() {
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.LoogGold);
    }
    public async playSfxSnicker() {
        await LogicTools.Delay(100);
        return AudioManager.GetInstance().playSfx(PlayMode.Parallel, SfxEnum.Snicker);
    }

    public async playQuickLowBoom() {
        await LogicTools.Delay(200);
        AudioManager.GetInstance().stopSfx(SfxEnum.LowRing);
        this.playSfxLowBoom();
    }

    public async playQuickHighBoom() {
        await LogicTools.Delay(200);
        AudioManager.GetInstance().stopSfx(SfxEnum.GridClear6);
        AudioManager.GetInstance().stopSfx(SfxEnum.GridClear7);
        AudioManager.GetInstance().stopSfx(SfxEnum.GridClear8);
        AudioManager.GetInstance().stopSfx(SfxEnum.GridClear9);
        this.playSfxHeightBoom();
    }
    //#endregion
}

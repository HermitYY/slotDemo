import { _decorator, Component, Node, Prefab, instantiate, tween, Vec3, Label, Button, find, Tween, Color, UITransform, Game, debug } from "cc";

import { SlotItem } from "../ui/SlotItem";
import { EffectManager } from "../managers/EffectManager";
import { EventManager, E_GAME_EVENT } from "../managers/EventManager";
import { GridManager } from "../managers/GridManager";
import { E_GAME_SCENE_TYPE, SocketManager } from "../network/SocketManager";
import { UItools } from "../Tools/UItools";
import { LogicTools } from "../Tools/LogicTools";
import { AutoManager } from "../managers/AutoManager";
import { E_GAME_SPEED_TYPE, GameSpeedManager } from "../managers/GameSpeedManager";
import { PopupManager } from "./popup/PopupManager";
import { PopupMask } from "./popup/PopupMask";
import proto from "../network/MLWZ_msg.js";
import { PopupLayer, PopupShowType } from "./popup/BasePopup";
import { AbortableQueue } from "../common/AbortableQueue";
import { PopupFreeResults } from "./popup/PopupFreeResults";
import { AudioControlManager } from "../managers/AudioControlManager";
import { AudioManager, SfxEnum } from "../managers/AudioManager";

const { ccclass, property } = _decorator;

@ccclass("SlotMachine")
export class SlotMachine extends Component {
    @property(Prefab)
    public slotItemPrefab: Prefab = null;
    @property(Prefab)
    public popupMaskPrefab: Prefab = null;
    @property(Prefab)
    public popupFreeResultPrefab: Prefab = null;

    @property([Node])
    public columns: Node[] = []; // 6列容器 (每列一个Node)

    @property(Label) // 筹码文本
    chipLabel: Label = null;
    @property(Label) // 单次筹码
    chipLabel2: Label = null;
    @property(Label) // 目前赢的筹码
    chipLabel3: Label = null;

    @property(Node)
    HistoryList: Node = null;

    @property(Button)
    rollButton: Button = null; // Roll按钮
    @property(Node)
    AutoButton: Node = null;
    @property(Node)
    AutoCloseButton: Node = null;
    @property(Node)
    AddButton: Node = null;
    @property(Node)
    SubmitButton: Node = null;
    @property(Node)
    FreeGameButton: Node = null;
    @property(Node)
    HighButton: Node = null;
    @property(Node)
    SettingButton: Node = null;
    @property(Node)
    StopDropAniButton: Node = null;

    private cellHeight: number = 80; // 格子高度
    private get rows() {
        return GridManager.GetInstance().rows;
    }
    private get cols() {
        return GridManager.GetInstance().cols;
    }
    private grid: number[][] = []; // 保存当前图案ID
    private rolling: boolean = false;
    public get isRolling() {
        return this.rolling;
    }

    private ModeParents: Array<Node> = [];

    private curComboCount: number = 0;
    private curArrowLev: number = 0;

    private freeTimes: Node = null;
    private freePengali: Node = null;
    private freeTotalWinChips: Node = null;

    start() {
        // 按钮禁用
        this.updateRollButtonIsBan(true);
        EventManager.emit(E_GAME_EVENT.GAME_NEW_BET);
        EventManager.on(E_GAME_EVENT.GAME_GRID_INIT_DATA, this.initGrid, this);
        EventManager.emit(E_GAME_EVENT.GAME_ENTER_MAIN_SCENE);
        EventManager.on(E_GAME_EVENT.GAME_GRID_UPDATA_CONSECUTIVE, this.consecutiveBegin, this);
        EventManager.on(E_GAME_EVENT.GAME_GRID_UPDATA_NO_CONSECUTIVE, this.consecutiveEnd, this);
        EventManager.on(E_GAME_EVENT.GAME_CHIP_SELECT_UPDATE, this.updateChipGroup, this);
        // 自动相关
        EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_OPEN, this.autoModeBegin, this);
        // EventManager.on(E_GAME_EVENT.GAME_AUTO_MODE_CLOSE, this.autoModeEnd, this);
        // 免费游戏相关
        EventManager.on(E_GAME_EVENT.GAME_FREE_REFRESH_NO_CONSECUTIVE, this.freeConsecutiveEnd, this);
        EventManager.on(E_GAME_EVENT.GAME_FREE_REFRESH_CONSECUTIVE, this.freeConsecutiveBegin, this);
        EventManager.on(E_GAME_EVENT.GAME_FREE_INIT, this.freeGameInitGrid, this);
        // 回放相关
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY_RETURN, this.beginReplay, this);
        EventManager.on(E_GAME_EVENT.GAME_REPLAY_PAUSE, this.pauseReplay, this);
        EventManager.on(E_GAME_EVENT.GAME_REPLAY_STOP, this.replayStop, this);
        EventManager.on(E_GAME_EVENT.GAME_REPLAY_CONTINUE, this.resumeReplay, this);
    }

    onDestroy() {
        EventManager.removeAllByTarget(this);
    }

    async initGrid(curScene: proto.newxxs.ICurScene) {
        console.log("得到场景信息，主界面初始化");
        this.updateChipGroup(curScene);
        const sceneMode = curScene.scene;
        switch (sceneMode) {
            case E_GAME_SCENE_TYPE.NORMAL:
                this.normalModeInitGrid(curScene);
                this.toggleSceneNode(E_GAME_SCENE_TYPE.NORMAL);
                break;
            case E_GAME_SCENE_TYPE.FREE_GAME:
                this.freeGameInitGrid(curScene);
                break;
            default:
                break;
        }
    }

    /** 模式切换场景控件 */
    private toggleSceneNode(mode: E_GAME_SCENE_TYPE) {
        EventManager.emit(E_GAME_EVENT.GAME_MODE_TOGGLE, mode);
        switch (mode) {
            case E_GAME_SCENE_TYPE.NORMAL:
                AudioControlManager.GetInstance().playBgmNormalBackground();
                break;
            case E_GAME_SCENE_TYPE.FREE_GAME:
                AudioControlManager.GetInstance().playBgmFreeGameBackground();
                break;

            default:
                break;
        }

        const isNormalMode = mode == E_GAME_SCENE_TYPE.NORMAL;
        const isFreeMode = mode == E_GAME_SCENE_TYPE.FREE_GAME;
        // 普通模式按钮组
        const buttonsNode = (this.ModeParents[0] ??= find("Canvas/MainGame/Buttons"));
        buttonsNode.active = isNormalMode;
        // 普通模式赚取文本
        const normalWinChips = (this.ModeParents[4] ??= find("Canvas/MainGame/Text/RightRect"));
        normalWinChips.active = isNormalMode;
        // 模型
        const normalModel = (this.ModeParents[1] ??= find("Canvas/MainGame/Mode/NormalModel"));
        normalModel.active = isNormalMode;
        const freeModel = (this.ModeParents[2] ??= find("Canvas/MainGame/Mode/FreeModel"));
        freeModel.active = isFreeMode;
        // free模式赚的筹码、次数、倍率父节点
        const gourp = (this.ModeParents[3] ??= find("Canvas/MainGame/Mode/FreeText"));
        gourp.active = isFreeMode;
        // free火背景与normal树叶背景
        const normalEffectBg = (this.ModeParents[5] ??= find("Canvas/MainGame/Mode/BgEffectFront/normal"));
        normalEffectBg.active = isNormalMode;
        const freeEffectBg = (this.ModeParents[6] ??= find("Canvas/MainGame/Mode/BgEffectAfter/free"));
        freeEffectBg.active = isFreeMode;
        // gird背景
        const normalBg = (this.ModeParents[7] ??= find("Canvas/MainGame/Grid/normalBg"));
        normalBg.active = isNormalMode;
        const freeBg = (this.ModeParents[8] ??= find("Canvas/MainGame/Grid/freeBg"));
        freeBg.active = isFreeMode;
    }

    //#region 普通模式

    async normalModeInitGrid(curScene: proto.newxxs.ICurScene) {
        await this.spawnNewColumns(curScene);
        if (curScene.run > 1) {
            this.comboContinue(curScene);
        } else {
            // 没在combo 启用按钮
            this.updateRollButtonIsBan(false);
            EventManager.emit(E_GAME_EVENT.GAME_BET_END);
        }
    }

    async consecutiveBegin(curScene: proto.newxxs.ICurScene) {
        this.updateChipGroup(curScene);
        await this.dropOldColumns();
        await this.spawnNewColumns(curScene);
        this.comboContinue(curScene);
    }

    async comboContinue(curScene: proto.newxxs.ICurScene) {
        this.curComboCount++;
        const { awardIndexArrs } = LogicTools.GetInstance().transGridInfo(curScene);

        let resolved = false;
        const safeResolve = async (cb: () => Promise<void>) => {
            if (resolved) return;
            resolved = true;
            rm1();
            rm2();
            rm3();
            await cb();
        };

        const rm1 = EventManager.waitForEvents([E_GAME_EVENT.GAME_GRID_DROP_END, E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE], async (result) => {
            await safeResolve(async () => {
                const args = result[E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE];
                if (!args?.length) return;
                const nextScene = args[0];
                await this.refillColumns(nextScene);
                await this.comboContinue(nextScene);
            });
        });

        const rm2 = EventManager.waitForEvents([E_GAME_EVENT.GAME_GRID_DROP_END, E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE], async (result) => {
            await safeResolve(async () => {
                const args = result[E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE];
                if (!args?.length) return;
                const endScene = args[0];
                await this.refillColumns(endScene);
                this.updateChipGroup(endScene);
                await this.stopEffect(200);
                await this.checkPlayLadybirdMultipleEffect(endScene);
                this.comboAttack();
                this.updateRollButtonIsBan(false);
                this.endRound();
            });
        });

        const rm3 = EventManager.waitForEvents([E_GAME_EVENT.GAME_GRID_DROP_END, E_GAME_EVENT.GAME_NORMAL_INTER_FREE], async (result) => {
            await safeResolve(async () => {
                const args = result[E_GAME_EVENT.GAME_NORMAL_INTER_FREE];
                if (!args?.length) return;
                const freeScene = args[0];
                await this.refillColumns(freeScene);
                this.updateChipGroup(freeScene);
                await this.stopEffect();
                await this.checkPlayLadybirdMultipleEffect(freeScene);
                this.comboAttack();
                // normal enter free
                this.updateFreeCtrl(freeScene, true);
                await this.playEnterFreeEffect(freeScene);
                SocketManager.GetInstance().curBet();
            });
        });

        SocketManager.GetInstance().curBet();
        await this.clearAwardGrid(awardIndexArrs ?? []);
        this.updateWinChipsText(curScene);
        await this.comboEffect(curScene.comboCount);
    }

    /** 刷新无奖励 */
    async consecutiveEnd(curScene: proto.newxxs.ICurScene) {
        this.updateChipGroup(curScene);
        await this.dropOldColumns();
        await this.spawnNewColumns(curScene);
        // 启用按钮
        this.updateRollButtonIsBan(false);
        this.endRound();
    }

    async roll() {
        if (this.rolling || AutoManager.GetInstance().isAutoIng) return;
        SocketManager.GetInstance().curBet(true);
        // 开始旋转 禁用按钮
        this.updateRollButtonIsBan(true);
        this.StopDropAniButton.active = true;
        this.isClickQuickDrop = false;
    }

    /** 普通回合结束（包括Combo结束与无奖励结束） */
    private async endRound() {
        this.checkAutoMode();
    }

    //#endregion

    //#region freeGame模式
    async freeGameInitGrid(curScene: proto.newxxs.ICurScene) {
        this.updateRollButtonIsBan(true);
        this.updateFreeCtrl(curScene, true);
        // 如果free字段有数据说明是freegame初始化
        if (curScene.free && curScene.free.index) {
            await this.dropOldColumns();
            await this.spawnNewColumns(curScene);
            await this.playEnterFreeEffect(curScene);
            SocketManager.GetInstance().curBet();
        } else {
            this.toggleSceneNode(E_GAME_SCENE_TYPE.FREE_GAME);
            if (curScene.run > 1) {
                this.freeComboContinue(curScene);
            } else {
                SocketManager.GetInstance().curBet();
            }
        }
    }

    private async playEnterFreeEffect(curScene: proto.newxxs.ICurScene) {
        const removeGridArr: Array<Array<{ effectName: string; wordPos: Vec3 }>> = curScene.free!.index.split(",").map((indexStr: string) => {
            const node = this.getGridNode(indexStr);
            return [
                {
                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                    wordPos: node.getWorldPosition(),
                },
                {
                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                    wordPos: node.getWorldPosition(),
                },
                {
                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                    wordPos: node.getWorldPosition(),
                },
            ];
        });
        const popupMask = PopupManager.create<PopupMask>(this.popupMaskPrefab);
        popupMask.setEffectCfg(removeGridArr);
        // 切回普通速率
        GameSpeedManager.GetInstance().tempSwitchToSpeed(E_GAME_SPEED_TYPE.NORMAL);
        await popupMask.show();
        // freegame载入动画
        AudioControlManager.GetInstance().playBgmEnterFreeGame();
        await EffectManager.playEffect("FreeGameLoadEffect", popupMask.node, new Vec3(0, 0, 0));
        this.toggleSceneNode(E_GAME_SCENE_TYPE.FREE_GAME);
        popupMask.close();
    }

    private async freeComboContinue(curScene: proto.newxxs.ICurScene) {
        this.curComboCount++;
        const { awardIndexArrs } = LogicTools.GetInstance().transGridInfo(curScene);
        let resolved = false;
        const safeResolve = async (cb: () => Promise<void>) => {
            if (resolved) return;
            resolved = true;
            rm1();
            rm2();
            await cb();
        };
        const rm1 = EventManager.waitForEvents([E_GAME_EVENT.GAME_GRID_DROP_END, E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE], async (result) => {
            await safeResolve(async () => {
                const args = result[E_GAME_EVENT.GAME_GRID_QUERY_CONSECUTIVE];
                if (!args?.length) return;
                const nextScene = args[0];
                await this.refillColumns(nextScene);
                await this.freeComboContinue(nextScene);
            });
        });
        const rm2 = EventManager.waitForEvents([E_GAME_EVENT.GAME_GRID_DROP_END, E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE], async (result) => {
            await safeResolve(async () => {
                const args = result[E_GAME_EVENT.GAME_GRID_QUERY_NO_CONSECUTIVE];
                if (!args?.length) return;
                const endScene = args[0];
                await this.refillColumns(endScene);
                await this.stopEffect(200);
                await this.checkPlayLadybirdMultipleEffect(endScene);
                this.comboAttack();
                await this.freeRoundEnd(endScene);
                if (!endScene.freeCount) this.freeEnd();
                else SocketManager.GetInstance().curBet(true);
            });
        });
        SocketManager.GetInstance().curBet();
        await this.clearAwardGrid(awardIndexArrs ?? []);
        this.updateWinChipsText(curScene);
        await this.comboEffect(curScene.comboCount);
    }

    async freeConsecutiveEnd(curScene: proto.newxxs.ICurScene) {
        await this.dropOldColumns();
        this.updLastFreeTimes(curScene);
        await this.spawnNewColumns(curScene);
        await this.freeRoundEnd(curScene);
        if (!curScene.freeCount) {
            this.freeEnd();
        } else {
            SocketManager.GetInstance().curBet(true);
        }
    }

    async freeConsecutiveBegin(curScene: proto.newxxs.ICurScene) {
        this.updateChipGroup(curScene);
        await this.dropOldColumns();
        this.updLastFreeTimes(curScene);
        await this.spawnNewColumns(curScene);
        this.freeComboContinue(curScene);
    }

    /** free单一combo结束 */
    async freeRoundEnd(curScene: proto.newxxs.ICurScene) {
        await this.updateFreeCtrl(curScene);
    }

    /** free整个结束 */
    freeEnd() {
        this.toggleSceneNode(E_GAME_SCENE_TYPE.NORMAL);
        this.updateRollButtonIsBan(false);
        this.checkAutoMode();
        GameSpeedManager.GetInstance().restoreGameSpeed();
        // EventManager.emit(E_GAME_EVENT.GAME_FREE_END);
    }

    async updateFreeCtrl(curScene: proto.newxxs.ICurScene, isInit: boolean = false) {
        isInit && this.updLastFreeTimes(curScene);
        this.freeTotalWinChips = this.freeTotalWinChips ??= find("Canvas/MainGame/Mode/FreeText/RightRect/MoneyGroup/Once");
        this.freePengali = this.freePengali ??= find("Canvas/MainGame/Mode/FreeText/Multiple/TotalPengali");
        const freePengaliLabel = this.freePengali.getComponentInChildren(Label);
        if (+freePengaliLabel.string < curScene.allMultiple) {
            this.freePengali.active = true;
            this.freePengali.scale = new Vec3(2.5, 2.5, 2.5);
            // 爆炸效果
            AudioControlManager.GetInstance().playSfxFireExplosion();
            EffectManager.playEffect("FireMultiple", this.freePengali.parent, Vec3.ZERO, { siblingIndex: this.freePengali.getSiblingIndex() });
            tween(this.freePengali).to(0.5, { scale: Vec3.ONE }).start();
        }
        freePengaliLabel.string = `${curScene.allMultiple}`;
        UItools.GetInstance().showCurrencyValue(curScene.winChips, this.freeTotalWinChips.getComponent(Label), true, 500, false);
        await LogicTools.Delay(300);
        if ((curScene.curChips > curScene.curBetChips * 5 || !curScene.freeCount) && !isInit) {
            const isFreeEnd = !curScene.freeCount;
            const showType = isFreeEnd ? PopupShowType.FromBottom : null;
            const customAniOut = isFreeEnd ? "linear" : "backIn";
            const customAniIn = isFreeEnd ? "linear" : "backOut";
            const PopupFreeResults = PopupManager.create<PopupFreeResults>(this.popupFreeResultPrefab, {
                maskOpacity: 100,
                maskColor: new Color(75, 75, 75),
                fromButtonPos: this.node.parent.getWorldPosition(),
                curstomAniCfg: { customAniOut, customAniIn },
                changeShowType: showType,
            });
            PopupFreeResults.Setdata(curScene);
            await PopupFreeResults.show();
        }
    }

    private updLastFreeTimes(curScene: proto.newxxs.ICurScene) {
        this.freeTimes = this.freeTimes ??= find("Canvas/MainGame/Mode/FreeText/RemainingTimes/times");
        this.freeTimes.getComponent(Label).string = `${curScene.freeCount}`;
    }

    //#endregion

    //#region 回放模式
    private _queue: AbortableQueue | null = null;
    private _currentReplayIndex = 0;
    private _curReplayArr: proto.newxxs.ICurScene[] | null = null;

    public async beginReplay(curSceneArr: proto.newxxs.ICurScene[]) {
        this._queue = new AbortableQueue();
        this._curReplayArr = curSceneArr;
        this._currentReplayIndex = 0;
        const initScene = curSceneArr[0];
        // 开始回放速率设回 NORMAL
        GameSpeedManager.GetInstance().tempSwitchToSpeed(E_GAME_SPEED_TYPE.NORMAL);
        this._queue.add(() => this._queue!.wait(this.dropOldColumns()));
        this._queue.add(() => this._queue!.wait(this.spawnNewColumns(initScene)));
        this._queue.add(() => this._queue!.wait(this._continueReplayLoopQueueStyle()));
        await this._queue.run();
    }
    private async _continueReplayLoopQueueStyle(): Promise<void> {
        if (!this._curReplayArr || !this._queue) return;
        let isEnterFree = false;
        while (this._currentReplayIndex < this._curReplayArr.length) {
            if (this._queue.isAborted) return;
            const curScene = this._curReplayArr[this._currentReplayIndex];
            switch (curScene.run) {
                case 1:
                    if (curScene?.free?.index) {
                        // 1.进入免费模式
                        isEnterFree = true;
                        this.updateChipGroup(curScene);
                        await this._queue.wait(this.stopEffect());
                        // await this._queue.wait(this.checkPlayLadybirdMultipleEffect(curScene), true);
                        if (this._queue.isAborted) return;
                        this.updateFreeCtrl(curScene, true);

                        const removeGridArr: Array<Array<{ effectName: string; wordPos: Vec3 }>> = curScene.free!.index.split(",").map((indexStr: string) => {
                            const node = this.getGridNode(indexStr);
                            return [
                                {
                                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                                    wordPos: node.getWorldPosition(),
                                },
                                {
                                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                                    wordPos: node.getWorldPosition(),
                                },
                                {
                                    effectName: `SlotEffectClear_${curScene.free.betArea}`,
                                    wordPos: node.getWorldPosition(),
                                },
                            ];
                        });
                        const popupMask = PopupManager.create<PopupMask>(this.popupMaskPrefab);
                        popupMask.setEffectCfg(removeGridArr);
                        await this._queue.wait(popupMask.show());
                        if (this._queue.isAborted) {
                            popupMask.close();
                            return;
                        }
                        // freegame载入动画
                        AudioControlManager.GetInstance().playBgmEnterFreeGame();
                        await this._queue.wait(EffectManager.playEffect("FreeGameLoadEffect", popupMask.node, new Vec3(0, 0, 0)));
                        this.toggleSceneNode(E_GAME_SCENE_TYPE.FREE_GAME);
                        if (this._queue.isAborted) {
                            popupMask.close();
                            return;
                        }
                        await this._queue.wait(popupMask.close());
                        this._currentReplayIndex++;
                        await this._queue.wait(this.dropOldColumns());
                        this.updLastFreeTimes(this._curReplayArr[this._currentReplayIndex]);
                        await this._queue.wait(this.spawnNewColumns(this._curReplayArr[this._currentReplayIndex]), true);
                    } else {
                        if (!curScene?.allCount && !curScene.freeCount) {
                            // 2.结束
                            await this._queue.wait(this.stopEffect(300));
                            if (curScene.curChips) {
                                await this._queue.wait(this.checkPlayLadybirdMultipleEffect(curScene));
                            }
                            if (this._queue.isAborted) return;
                            const isAttack = this.curComboCount >= 2;
                            this.comboAttack();
                            if (!curScene.curChips || isEnterFree) {
                                await this._queue.wait(this.updateFreeCtrl(curScene));
                            }
                            let delayTime = 0;
                            isAttack && (delayTime = 2400);
                            isEnterFree && (delayTime = 300);
                            console.log("isAttack", isAttack);
                            await this._queue.wait(LogicTools.Delay(delayTime), true);
                            EventManager.emit(E_GAME_EVENT.GAME_REPLAY_STOP);
                            return;
                        } else {
                            // 3.freeCombo结束
                            // checkFreeAddTimes
                            const gridArr = curScene.panel.split(",").map(Number);
                            const icon14 = 14;
                            if (gridArr.filter((i) => i == icon14).length > 2) {
                                for (let index = 0; index < gridArr.length; index++) {
                                    if (gridArr[index] == icon14) {
                                        EffectManager.playEffect(`SlotEffectClear_${icon14}`, this.getGridNode(index.toString()), new Vec3(0, 0, 0));
                                    }
                                }
                                await this._queue.wait(LogicTools.Delay(EffectManager.getEffectDuration(`SlotEffectClear_${icon14}`) * 1000));
                                gridArr.forEach((mId, index) => {
                                    if (mId == icon14) {
                                        EffectManager.playEffect(`SlotEffectClear_${icon14}`, this.getGridNode(index.toString()), new Vec3(0, 0, 0));
                                    }
                                });
                                await this._queue.wait(LogicTools.Delay(EffectManager.getEffectDuration(`SlotEffectClear_${icon14}`) * 1000));
                                this.freeTimes = this.freeTimes ??= find("Canvas/MainGame/Mode/FreeText/RemainingTimes/times");
                                AudioControlManager.GetInstance().playSfxFireExplosion();
                                await this._queue.wait(EffectManager.playEffect("FireMultiple", this.freeTimes.parent, Vec3.ZERO));
                                this.freeTimes.getComponent(Label).string = `${curScene.freeCount}`;
                            }
                            await this._queue.wait(this.stopEffect());
                            if (curScene.curChips) {
                                await this._queue.wait(this.checkPlayLadybirdMultipleEffect(curScene));
                            }
                            if (this._queue.isAborted) return;
                            this.comboAttack();
                            await this._queue.wait(this.updateFreeCtrl(curScene));
                            if (this._queue.isAborted) return;
                            this._currentReplayIndex++;
                            await this._queue.wait(this.dropOldColumns());
                            this.updLastFreeTimes(this._curReplayArr[this._currentReplayIndex]);
                            await this._queue.wait(this.spawnNewColumns(this._curReplayArr[this._currentReplayIndex]), true);
                        }
                    }
                    break;
                case 2:
                    // 4.combo
                    const { awardIndexArrs } = LogicTools.GetInstance().transGridInfo(curScene);
                    if (!awardIndexArrs.length) return;

                    this.curComboCount++;
                    this.clearAwardGrid(awardIndexArrs);
                    this.updateWinChipsText(curScene);
                    await this._queue.wait(this._waitGridDropEnd());
                    if (this._queue.isAborted) return;
                    const nextScene = this._curReplayArr[this._currentReplayIndex + 1];
                    if (!nextScene) return;
                    await Promise.all([this._queue.wait(this.comboEffect(curScene.comboCount)), this._queue.wait(this.refillColumns(nextScene))]);
                    await this._queue.wait(LogicTools.waitNextFrame(), true);
                    if (this._queue.isAborted) return;
                    this._currentReplayIndex++;
                    break;
            }
        }
    }

    private _gridDropHandler: Function | null = null;

    private _waitGridDropEnd(): Promise<void> {
        return new Promise((resolve) => {
            this._gridDropHandler = () => resolve();
            EventManager.once(E_GAME_EVENT.GAME_GRID_DROP_END, this._gridDropHandler);
        });
    }

    public pauseReplay() {
        this._queue?.pause();
    }

    public resumeReplay() {
        this._queue?.resume();
    }

    public async replayStop() {
        PopupManager.showLayer(PopupLayer.History);
        await this._queue?.safeAbort();
        EffectManager.stopEffect("FreeGameLoadEffect");
        if (this._gridDropHandler) {
            EventManager.off(E_GAME_EVENT.GAME_GRID_DROP_END, this._gridDropHandler);
            this._gridDropHandler = null;
        }
        this.dropOldColumns();
        const curScene = SocketManager.GetInstance().CurScene;
        this.spawnNewColumns(curScene, false);
        this.stopEffect();
        this.stopCheckLadybirdEffect();
        EventManager.emit(E_GAME_EVENT.GAME_HISTORY_REPLAY_END);
        this.toggleSceneNode(E_GAME_SCENE_TYPE.NORMAL);
        GameSpeedManager.GetInstance().restoreGameSpeed();
        this.curComboCount = 0;
    }
    //#endregion

    //#region 格子动画相关
    private oldColumsRealEnd = false;
    private isClickQuickDrop = false;

    private getGridNode(indexStr: string | number) {
        let index: number;
        if (typeof indexStr === "string") {
            index = parseInt(indexStr);
        } else {
            index = indexStr;
        }
        const col = index % this.cols;
        const row = ~~(index / this.cols);
        return this.columns[col].children[row];
    }

    /**
     * 所有旧列逐列掉下去
     * @returns
     */
    private dropOldColumns(): Promise<void> {
        return new Promise((resolve) => {
            this.oldColumsRealEnd = false;
            let totalItems = 0;
            let finished = 0;

            for (let c = 0; c < this.cols; c++) {
                const columnNode = this.columns[c];
                const oldItems = columnNode.children;
                totalItems += oldItems.length;
                const { columnInterval, dropTime, girdInterval } = GameSpeedManager.GetInstance().getOldColumnDropTimeConfig();
                oldItems.forEach((item, r) => {
                    tween(item)
                        .delay(columnInterval * c - girdInterval * r)
                        .to(dropTime, { position: new Vec3(0, -600, 0) })
                        .call(() => {
                            item.destroy();
                            finished++;
                            if (finished === 15) {
                                resolve();
                            }
                            if (finished === totalItems) {
                                this.oldColumsRealEnd = true;
                            }
                        })
                        .start();
                });
            }

            if (totalItems === 0) {
                resolve();
            }
        });
    }

    private OldspawnNewColumns(curScene: proto.newxxs.ICurScene, isPlayVoice = true): Promise<void> {
        const { gridInfo: newGridArrs } = LogicTools.GetInstance().transGridInfo(curScene);
        return new Promise((resolve) => {
            let finishedCount = 0;
            let totalNew = this.rows * this.cols;
            const { columnInterval, girdInterval, dropTime, boundDis, boundTime, voiceDelay } = GameSpeedManager.GetInstance().getNewColumnDropTimeConfig();
            if (isPlayVoice) {
                AudioControlManager.GetInstance().playSfxRefresh(voiceDelay * 1000);
            }
            for (let c = 0; c < this.cols; c++) {
                const columnNode = this.columns[c];
                this.grid[c] = [];

                for (let r = 0; r < this.rows; r++) {
                    const id = newGridArrs[c][r];
                    this.grid[c][r] = id;

                    const item = instantiate(this.slotItemPrefab);
                    item.setParent(columnNode);
                    item.setPosition(0, 400);
                    const slotItem = item.getComponent(SlotItem);
                    slotItem.SetData(id, { row: r, column: c });

                    const targetY = -r * this.cellHeight;
                    tween(item)
                        // 每列间隔，每个格子再叠加
                        .delay(columnInterval * c - girdInterval * r)
                        // 先快速下落，超过目标
                        .to(dropTime, { position: new Vec3(0, targetY - boundDis * r, 0) }, { easing: "quadIn" })
                        // 最后缓和落到目标
                        .to(boundTime, { position: new Vec3(0, targetY, 0) }, { easing: "quadOut" })
                        .call(async () => {
                            await slotItem.LadybirdMultipleEffect(
                                curScene.curMultiples.map((item) => {
                                    return {
                                        index: item.index,
                                        multiple: +item.multiple,
                                    };
                                }),
                                isPlayVoice
                            );
                            finishedCount++;
                            if (finishedCount === totalNew) {
                                resolve();
                            }
                        })
                        .start();
                }
            }
        });
    }

    private _cancelSpawnColumns?: () => void;
    /**
     * 新的逐列生成
     * @param arr
     * @returns
     */
    private spawnNewColumns(curScene: proto.newxxs.ICurScene, isPlayVoice = true): Promise<void> {
        // 如果上一次动画还没结束，先取消它
        if (this._cancelSpawnColumns) {
            this._cancelSpawnColumns();
            this._cancelSpawnColumns = undefined;
        }

        const { gridInfo: newGridArrs } = LogicTools.GetInstance().transGridInfo(curScene);
        return new Promise((resolve) => {
            let finishedCount = 0;
            const totalNew = this.rows * this.cols;

            const targets: Node[] = [];
            const finalYMap = new Map<Node, number>();
            const finishedSet = new Set<Node>();
            const speedCfg = this.isClickQuickDrop ? E_GAME_SPEED_TYPE.FAST : GameSpeedManager.GetInstance().speed;
            const { columnInterval, girdInterval, dropTime, boundDis, boundTime, voiceDelay } = GameSpeedManager.GetInstance().getNewColumnDropTimeConfig(speedCfg);

            if (isPlayVoice) {
                AudioControlManager.GetInstance().playSfxRefresh(voiceDelay * 1000);
            }

            const onItemFinish = async (node: Node, slotItem: SlotItem) => {
                if (finishedSet.has(node)) return;
                finishedSet.add(node);

                await slotItem.LadybirdMultipleEffect(
                    curScene.curMultiples.map((item) => ({
                        index: item.index,
                        multiple: +item.multiple,
                    })),
                    isPlayVoice
                );

                finishedCount++;
                if (finishedCount === totalNew) {
                    this._cancelSpawnColumns = undefined;
                    this.StopDropAniButton.active = false;
                    resolve();
                }
            };

            // 生成节点并记录
            for (let c = 0; c < this.cols; c++) {
                const columnNode = this.columns[c];
                this.grid[c] = [];

                for (let r = 0; r < this.rows; r++) {
                    const id = newGridArrs[c][r];
                    this.grid[c][r] = id;

                    const item = instantiate(this.slotItemPrefab);
                    item.setParent(columnNode);
                    item.setPosition(0, 400);

                    const slotItem = item.getComponent(SlotItem)!;
                    slotItem.SetData(id, { row: r, column: c });

                    const targetY = -r * this.cellHeight;
                    finalYMap.set(item, targetY);
                    targets.push(item);
                    tween(item)
                        .delay(columnInterval * c - girdInterval * r)
                        .to(dropTime, { position: new Vec3(0, targetY - boundDis * r, 0) }, { easing: "quadIn" })
                        .to(boundTime, { position: new Vec3(0, targetY, 0) }, { easing: "quadOut" })
                        .call(() => {
                            onItemFinish(item, slotItem).catch((e) => console.error("onItemFinish error:", e));
                        })
                        .start();
                }
            }
            // 快速时不需要取消下落
            if (GameSpeedManager.GetInstance().speed === E_GAME_SPEED_TYPE.FAST) return;
            this._cancelSpawnColumns = () => {
                // 视口之中的元素
                const viewArr = targets.filter((item) => item.getPosition().y < item.getComponent(UITransform).height);
                if (this.oldColumsRealEnd) {
                    targets.forEach((item, index) => {
                        if (index < Math.ceil(viewArr.length / this.rows) * this.rows) return;
                        Tween.stopAllByTarget(item);
                    });
                    for (let c = 0; c < this.cols; c++) {
                        const columnNode = this.columns[c];
                        const children = columnNode.children;
                        for (let r = 0; r < children.length; r++) {
                            const item = children[r];
                            if (c < Math.ceil(viewArr.length / this.rows)) continue;
                            item.setPosition(0, 400, 0);
                            const finalY = finalYMap.get(item);
                            const slotItem = item.getComponent(SlotItem);
                            if (!slotItem) continue;
                            const { girdInterval, dropTime, boundDis, boundTime } = GameSpeedManager.GetInstance().getNewColumnDropTimeConfig();
                            tween(item)
                                .delay(girdInterval * (children.length - r - 1))
                                .to(dropTime * 0.8, { position: new Vec3(0, finalY - boundDis * r * 0.5, 0) }, { easing: "cubicOut" })
                                .to(boundTime * 0.6, { position: new Vec3(0, finalY, 0) }, { easing: "quadOut" })
                                .call(() => {
                                    onItemFinish(item, slotItem).catch((e) => console.error("onItemFinish error:", e));
                                })
                                .start();
                        }
                    }
                    this._cancelSpawnColumns = undefined;
                } else {
                    this._cancelSpawnColumns = undefined;
                    (async () => {
                        for (const node of targets) {
                            if (!node || !node.isValid) continue;
                            Tween.stopAllByTarget(node);
                            node.setPosition(0, 400, 0);
                        }
                        await this.waitForIsEnd();
                        const { girdInterval, dropTime, boundDis, boundTime, columnInterval } = GameSpeedManager.GetInstance().getNewColumnDropTimeConfig(E_GAME_SPEED_TYPE.FAST);
                        for (let c = 0; c < this.cols; c++) {
                            const columnNode = this.columns[c];
                            const children = columnNode.children;
                            for (let r = 0; r < children.length; r++) {
                                const item = children[r];
                                const finalY = finalYMap.get(item);
                                const slotItem = item.getComponent(SlotItem);
                                if (!slotItem) continue;
                                tween(item)
                                    .delay(columnInterval * c - girdInterval * r)
                                    .to(dropTime, { position: new Vec3(0, finalY - boundDis * r, 0) }, { easing: "quadIn" })
                                    .to(boundTime, { position: new Vec3(0, finalY, 0) }, { easing: "quadOut" })
                                    .call(() => {
                                        onItemFinish(item, slotItem).catch((e) => console.error("onItemFinish error:", e));
                                    })
                                    .start();
                            }
                        }
                    })();
                }
            };
        });
    }

    private async waitForIsEnd(): Promise<void> {
        return new Promise((resolve) => {
            const check = () => {
                if (this.oldColumsRealEnd) {
                    resolve();
                } else {
                    LogicTools.Delay(20).then(check);
                }
            };
            check();
        });
    }

    public PreCancelSpawnColumnsAni() {
        this.StopDropAniButton.active = false;
        this.isClickQuickDrop = true;
        if (this._cancelSpawnColumns) {
            this._cancelSpawnColumns();
            this._cancelSpawnColumns = undefined;
        }
    }

    /**
     * 消除对应的格子
     * @param awardArrs
     * @returns
     */
    private async clearAwardGrid(
        awardArrs: Array<{
            betArea?: number;
            chips?: number;
            count?: number;
            index?: string;
        }>
    ): Promise<void> {
        let matchedAll: { gridIndex: number; removeId: number }[] = [];
        if (awardArrs.length > 0) {
            awardArrs.forEach((item) => {
                const awardIndexArrs = item.index.split(",");
                matchedAll = matchedAll.concat(
                    awardIndexArrs.map((indexStr) => {
                        const index = parseInt(indexStr);
                        return {
                            gridIndex: index,
                            removeId: item.betArea,
                        };
                    })
                );
            });
            await this.removeGridItem(matchedAll);
            awardArrs.forEach((item) => {
                EventManager.emit(E_GAME_EVENT.GAME_COMBO_HISTORY_ADD, { id: item.betArea, count: item.count, money: item.chips });
            });
            await LogicTools.waitNextFrame();
            // 加快
            // await this.collapseColumns();
            this.collapseColumns();
        }
        EventManager.emit(E_GAME_EVENT.GAME_GRID_DROP_END);
    }

    private async removeGridItem(matched: { gridIndex: number; removeId: number }[]): Promise<void> {
        if (!matched || matched.length === 0) return;
        // 1.原地消除
        // await Promise.all(
        //     matched.map(async (m) => {
        //         const node = this.getGridNode(m.gridIndex);
        //         if (!node || !node.isValid) return;
        //         const parent = node.parent;
        //         const pos = node.position.clone();
        //         // // 透明度
        //         const uiOpacity = node.getComponent(UIOpacity) || node.addComponent(UIOpacity);
        //         // 确保 initial opacity 为 255
        //         uiOpacity.opacity = uiOpacity.opacity ?? 255;
        //         tween(uiOpacity)
        //             .to(EffectManager.getEffectDuration(`SlotEffectClear_${m.removeId}`), { opacity: 0 })
        //             .start();
        //         // 特效
        //         await EffectManager.playEffect(`SlotEffectClear_${m.removeId}`, node, Vec3.ZERO);
        //         await EffectManager.playEffect(`SlotEffect_${m.removeId <= 5 ? "low" : "high"}_explode`, node, Vec3.ZERO);

        //         // 播放完销毁节点
        //         if (node.isValid) {
        //             node.destroy();
        //         }
        //     })
        // );

        // 2.弹窗消除
        const removeGridArr: Array<Array<{ effectName: string; effectName2?: string; wordPos: Vec3 }>> = [];
        for (const m of matched) {
            const node = this.getGridNode(m.gridIndex);
            if (node && node.isValid) {
                const pos = node.getWorldPosition();
                node.destroy();
                const isLowNumver = m.removeId <= 5;
                switch (GameSpeedManager.GetInstance().speed) {
                    case E_GAME_SPEED_TYPE.NORMAL:
                        const destoryEffectArr = [
                            {
                                effectName: `SlotEffectClear_${m.removeId}`,
                                wordPos: pos,
                            },
                            {
                                effectName: `SlotEffect_${isLowNumver ? "low" : "high"}_explode`,
                                wordPos: pos,
                            },
                        ];
                        removeGridArr.push(destoryEffectArr);
                        if (isLowNumver) {
                            removeGridArr.push([
                                {
                                    effectName: "SlotEffect_ring",
                                    wordPos: pos,
                                },
                            ]);
                        }
                        break;
                    case E_GAME_SPEED_TYPE.FAST:
                        removeGridArr.push([
                            { effectName: `SlotEffectQuickClear_${m.removeId}`, wordPos: pos },
                            {
                                effectName: `SlotEffect_quick_${isLowNumver ? "low" : "high"}_explode`,
                                wordPos: pos,
                            },
                        ]);
                        break;
                }
            }
        }
        const popupMask = PopupManager.create<PopupMask>(this.popupMaskPrefab, { maskOpacity: 80 });
        popupMask.setEffectCfg(removeGridArr);
        await popupMask.show();
        popupMask.close();
    }

    /** 剩余格子向下塌缩（压到底部） */
    private collapseColumns(): Promise<void> {
        return new Promise((resolve) => {
            let totalTweens = 0;
            let finished = 0;

            for (let c = 0; c < this.cols; c++) {
                const columnNode = this.columns[c];
                // 拿快照并过滤有效节点
                let items = columnNode.children.filter((n) => n && n.isValid);

                // 按 Y 从大到小排序（上 -> 下）
                items.sort((a, b) => b.position.y - a.position.y);

                const N = items.length;
                if (N === 0) continue;

                // 目标行从 rows - N ... rows - 1（底部 N 行）
                for (let i = 0; i < N; i++) {
                    const node = items[i];
                    const targetRow = this.rows - N + i;
                    const targetY = -targetRow * this.cellHeight;
                    const distFromBottom = this.rows - 1 - targetRow;
                    // 检查是否已经在目标位置
                    if (Math.abs(node.position.y - targetY) < 1e-2) {
                        // 已经在位，直接跳过
                        continue;
                    }
                    totalTweens++;
                    const { dropTime, girdInterval, boundTime, boundDis } = GameSpeedManager.GetInstance().getCollapseTimeConfig();
                    tween(node)
                        // 每个格子再叠加 0.02s
                        .delay(girdInterval * N)
                        // 先快速下落，超过目标
                        .to(
                            dropTime,
                            {
                                position: new Vec3(0, targetY - boundDis * distFromBottom, 0),
                            },
                            { easing: "quadIn" }
                        )
                        // 最后缓和落到目标
                        .to(boundTime, { position: new Vec3(0, targetY, 0) }, { easing: "quadOut" })
                        .call(() => {
                            // 精确设置位置以避免浮点误差
                            node.setPosition(0, targetY, 0);
                            finished++;
                            if (finished === totalTweens) resolve();
                        })
                        .start();
                }
            }

            // 没有任何需要移动的节点
            if (totalTweens === 0) resolve();
        });
    }

    /** 顶部补齐新的 slot（从上方掉落到空位） */
    private refillColumns(curScene: proto.newxxs.ICurScene): Promise<void> {
        const { gridInfo: newGridArrs } = LogicTools.GetInstance().transGridInfo(curScene);
        return new Promise((resolve) => {
            let totalNew = 0;
            let finished = 0;

            for (let c = 0; c < this.cols; c++) {
                const columnNode = this.columns[c];
                // 注意：children 在 collapse 后已经在底部排列
                const currentCount = columnNode.children.filter((n) => n && n.isValid).length;
                const need = this.rows - currentCount;
                if (need <= 0) continue;
                totalNew += need;

                // 新的应占顶端空位 row=0..need-1
                for (let g = 0; g < need; g++) {
                    // const id = Math.floor(Math.random() * this.icons.length);
                    const id = newGridArrs[c][g];
                    const item = instantiate(this.slotItemPrefab);

                    columnNode.insertChild(item, g);
                    const slotItem = item.getComponent(SlotItem);
                    slotItem.SetData(id, { row: g, column: c });

                    // 从上方很高的位置掉下来
                    const startY = this.cellHeight * (this.rows + g); // 足够高
                    const targetRow = g;
                    const targetY = -targetRow * this.cellHeight;
                    item.setPosition(0, startY, 0);
                    const { dropTime, boundTime, boundDis, girdInterval } = GameSpeedManager.GetInstance().getFillTimeConfig();
                    tween(item)
                        // 每格间隔
                        .delay(girdInterval * (need - g - 1))
                        // 先快速下落，超过目标
                        .to(dropTime, { position: new Vec3(0, targetY - boundDis, 0) }, { easing: "quadIn" })
                        // 最后缓和落到目标
                        .to(boundTime, { position: new Vec3(0, targetY, 0) }, { easing: "quadOut" })
                        .call(async () => {
                            // 精确对齐
                            item.setPosition(0, targetY, 0);
                            await slotItem.LadybirdMultipleEffect(
                                curScene.curMultiples.map((item) => {
                                    return {
                                        index: item.index,
                                        multiple: +item.multiple,
                                    };
                                })
                            );
                            finished++;
                            if (finished === totalNew) resolve();
                        })
                        .start();
                }
            }

            if (totalNew === 0) resolve();
        });
    }

    //#endregion

    //#region 筹码文本及提示文本
    private updateChipGroup(curScene: proto.newxxs.ICurScene) {
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(curScene);
        // Label
        if (this.chipLabel && this.chipLabel2) {
            UItools.GetInstance().showCurrencyValue(chipsInfo.havenChips, this.chipLabel);
            UItools.GetInstance().showCurrencyValue(chipsInfo.curBetChips, this.chipLabel2);
        }
    }

    private updateWinChipsText(curScene: proto.newxxs.ICurScene, voiceDuration?: number) {
        const { chipsInfo } = LogicTools.GetInstance().transGridInfo(curScene);
        if (this.chipLabel3) {
            const computeChips = chipsInfo.comboChips || chipsInfo.winChips;
            this.chipLabel3.node.active = computeChips > 0;
            if (+this.chipLabel3.string.replace(/,/g, "") >= computeChips) {
                this.chipLabel3.string = "0";
            }
            AudioControlManager.GetInstance().playSfShortGold();
            if (!voiceDuration) {
                voiceDuration = AudioManager.GetInstance().checkDuration(SfxEnum.ShortGold) * 800;
            }
            UItools.GetInstance().showCurrencyValue(computeChips, this.chipLabel3, true, voiceDuration, false, false);
        }
    }

    private updateRollButtonIsBan(isBanButton: boolean) {
        this.rolling = isBanButton;
        this.rollButton.interactable = !isBanButton;
        this.AddButton.getComponent(Button).interactable = !isBanButton;
        this.SubmitButton.getComponent(Button).interactable = !isBanButton;
        this.FreeGameButton.getComponent(Button).interactable = !isBanButton;
        this.HighButton.getComponent(Button).interactable = !isBanButton;
    }

    //#endregion

    //#region  自动模式相关

    /** 检查自动模式 */
    private async checkAutoMode() {
        const isAuto = AutoManager.GetInstance().isAutoIng;
        if (isAuto) {
            let autoTimes = AutoManager.GetInstance().autoTimes;
            if (autoTimes > 0) {
                this.updateRollButtonIsBan(true);
            }
            if (autoTimes > 0) {
                await LogicTools.Delay(GameSpeedManager.GetInstance().getRoundEndBackTime() * 1000);
            }
            autoTimes = AutoManager.GetInstance().autoTimes;
            if (autoTimes <= 0) {
                this.updateRollButtonIsBan(false);
            }
            AutoManager.GetInstance().continueAuto();
            if (autoTimes <= 0) {
                EventManager.emit(E_GAME_EVENT.GAME_BET_END);
            }
        } else {
            EventManager.emit(E_GAME_EVENT.GAME_BET_END);
        }
    }

    private async autoModeBegin() {
        EventManager.emit(E_GAME_EVENT.GAME_NEW_BET);
        this.updateRollButtonIsBan(true);
    }
    //#endregion

    //#region 特效相关
    /** 根据次数判断是否播放grid特效与升级弓 */
    private async comboEffect(comboCount: number) {
        if (comboCount == 2) {
            EventManager.emit(E_GAME_EVENT.GAME_MORO_UPGRADE_BOW, { lev: 2 });
            AudioControlManager.GetInstance().playSfxBowUpgrade1();
            await this.comboRoundEffect();
            return await LogicTools.Delay(100);
        } else if (comboCount === 4) {
            EventManager.emit(E_GAME_EVENT.GAME_MORO_UPGRADE_BOW, { lev: 3 });
            AudioControlManager.GetInstance().playSfxBowUpgrade2();
            await this.comboGridEffect();
            return await LogicTools.Delay(100);
        } else if (comboCount === 6) {
            EventManager.emit(E_GAME_EVENT.GAME_MORO_UPGRADE_BOW, { lev: 4 });
            AudioControlManager.GetInstance().playSfxBowUpgrade3();
            await this.comboBackgroundEffect();
            return await LogicTools.Delay(100);
        }
    }

    /** 每回合结束后根据次数判断是否攻击 */
    private async comboAttack() {
        if (this.curComboCount >= 2) {
            EventManager.emit(E_GAME_EVENT.GAME_MORO_ATTACK, { times: this.curComboCount });
            await AudioControlManager.GetInstance().playSfxMoroAttackBow();
            AudioControlManager.GetInstance().playSfxMoroAttackArrow();
        }
        this.curComboCount = 0;
    }

    /** 累计甲虫倍率后的攻击 */
    private async multipleAttack() {
        EventManager.emit(E_GAME_EVENT.GAME_MORO_ATTACK2, { times: this.curComboCount });
        this.curArrowLev = 0;
        this.curComboCount = 0;
        await AudioControlManager.GetInstance().playSfxMoroAttackBow();
        AudioControlManager.GetInstance().playSfxMoroAttackArrow();
    }

    /** combo Round特效 */
    private async comboRoundEffect() {
        EffectManager.stopEffect("ComboRoundSustainEffect");
        const pos = new Vec3(0, this.node.parent.position.y, 0);
        const oncePromise = EffectManager.playEffect("ComboRoundOnceEffect", this.node.parent.parent, pos);
        oncePromise.then(() => {
            EffectManager.playEffect("ComboRoundSustainEffect", this.node.parent.parent, pos);
        });
        return oncePromise;
    }

    /** combo Grid特效 */
    private async comboGridEffect() {
        EffectManager.stopEffect("ComboGridSustainEffect");
        const pos = new Vec3(-1, this.node.parent.position.y, 0);
        const oncePromise = EffectManager.playEffect("ComboGridOnceEffect", this.node.parent.parent, pos);
        oncePromise.then(() => {
            EffectManager.playEffect("ComboGridSustainEffect", this.node.parent.parent, pos);
        });
        return oncePromise;
    }

    /** combo Background特效 */
    private async comboBackgroundEffect() {
        EffectManager.stopEffect("ComboBackgroundOnceEffect");
        // const pos = new Vec3(0, this.node.parent.position.y, 0);
        const currentSiblingIndex = this.node.getSiblingIndex();
        return EffectManager.playEffect("ComboBackgroundOnceEffect", this.node.parent, new Vec3(0, 0, 0), { siblingIndex: currentSiblingIndex });
    }

    /**
     * 停止combo持续性特效
     * @param StartupTime 停止前摇时间
     */
    private async stopEffect(StartupTime?: number): Promise<void> {
        // const pos = new Vec3(1, this.node.parent.position.y, 0);
        const tasks: Promise<void>[] = [];

        // 回退效果
        // if (EffectManager.isEffectActive("ComboRoundSustainEffect")) {
        //     tasks.push(EffectManager.playEffect("ComboRoundOnceStopEffect", this.node.parent.parent, pos));
        // }
        // if (EffectManager.isEffectActive("ComboGridSustainEffect")) {
        //     tasks.push(EffectManager.playEffect("ComboGridOnceStopEffect", this.node.parent.parent, pos));
        // }
        // if (EffectManager.isEffectActive("ComboBackgroundOnceEffect")) {
        //     const currentSiblingIndex = this.node.getSiblingIndex();
        //     tasks.push(EffectManager.playEffect("ComboBackgroundOnceStopEffect", this.node.parent, new Vec3(0, 0, 0), { siblingIndex: currentSiblingIndex }));
        // }

        // 停特效前摇
        if (StartupTime) {
            await LogicTools.Delay(300);
        }

        // 同时停掉持续特效
        EffectManager.stopEffect("ComboRoundSustainEffect");
        EffectManager.stopEffect("ComboGridSustainEffect");
        EffectManager.stopEffect("ComboBackgroundOnceEffect");

        // 如果没有需要播放一次性停止特效，直接resolve
        if (tasks.length === 0) {
            return Promise.resolve();
        }

        // 全部播放完才resolve
        return Promise.all(tasks).then(() => {});
    }

    //#endregion

    //#region 甲虫倍率效果相关
    public stopCheckLadybirdEffect() {
        this._ladybirdCancel = true;
        this.node.parent.parent.children.slice(3).forEach((c) => c.destroy());
        EffectManager.stopEffect("MultipleBoxFireing");
        EffectManager.stopEffect("MultipleBoxFire");
        EffectManager.stopEffect("MultipleBox");
        if (this._midRectTween) {
            this._midRectTween.stop();
            this._midRectTween = null;
            const midRect = this.chipLabel3.node.parent.parent;
            midRect.setScale(1, 1, 1);
        }
        const multipleLabel = this.chipLabel3.node.parent.getChildByName("Multiple");
        if (this._midRectTween2) {
            this._midRectTween2.stop();
            this._midRectTween2 = null;
            multipleLabel.setScale(1, 1, 1);
        }
        multipleLabel.active = false;
    }
    private _ladybirdCancel = false;
    private _midRectTween: Tween<Node> = null;
    private _midRectTween2: Tween<Node> = null;

    public async checkPlayLadybirdMultipleEffect(curScene: proto.newxxs.ICurScene): Promise<void> {
        if (curScene.curMultiples.length == 0) return;
        this._ladybirdCancel = false;
        const gatherNode = this.node.parent;
        const gatherPos = gatherNode.getWorldPosition();
        const myCurMultiples = curScene.curMultiples.sort((a, b) => {
            const slotA = this.getGridNode(a.index);
            const slotB = this.getGridNode(b.index);
            const posA = slotA.getWorldPosition();
            const posB = slotB.getWorldPosition();
            const dxA = posA.x - gatherPos.x;
            const dyA = posA.y - gatherPos.y;
            const dxB = posB.x - gatherPos.x;
            const dyB = posB.y - gatherPos.y;
            const distA = dxA * dxA + dyA * dyA;
            const distB = dxB * dxB + dyB * dyB;
            return distA - distB;
        });
        let firstFont: Node = null;
        let curMultip: number = 0;
        // 各甲虫倍数移动
        for (let i = 0; i < myCurMultiples.length; i++) {
            if (this._ladybirdCancel) return;
            const item = myCurMultiples[i];
            const slotItem = this.getGridNode(item.index);
            if (!slotItem) {
                console.log("意外跳过", item.index);
                continue;
            }
            const multipleFont = slotItem.getChildByName("MultipleFont");
            if (i === 0) {
                firstFont = multipleFont;
                curMultip = item.multiple;
            }
            multipleFont.setParent(this.node.parent.parent);
            await UItools.moveEffectWorld(slotItem, gatherPos, "", 0.7, {
                target: multipleFont,
                autoDestroy: i !== 0,
                easing: "backIn",
            });
            if (this._ladybirdCancel) return;
            if (i !== 0) {
                firstFont.getComponent(Label).string = `x${(curMultip += item.multiple)}`;
            }
            this.curArrowLev = i + 1;
            EventManager.emit(E_GAME_EVENT.GAME_MORO_UPGRADE_ARROW, { arrowLev: this.curArrowLev });
            AudioControlManager.GetInstance().playSfxBeetleMultipleAdd();
            await EffectManager.playEffect("MultipleMove", firstFont.parent, new Vec3(0, this.node.parent.getPosition().y), { siblingIndex: 3 });
        }
        this.multipleAttack();
        // free累计倍数移动
        if (curScene.allMultiple > curScene.curMultiple) {
            if (this._ladybirdCancel) return;
            const totalPengaliFatherNode = new Node();
            totalPengaliFatherNode.setParent(this.node.parent.parent);
            const cloneWorldPos = this.freePengali.getWorldPosition();
            totalPengaliFatherNode.setWorldPosition(cloneWorldPos);
            const cloneFreePengali = instantiate(this.freePengali);
            cloneFreePengali.setParent(totalPengaliFatherNode);
            cloneFreePengali.setPosition(0, 8, 0);
            this.freePengali.active = false;
            await UItools.moveEffectWorld(cloneWorldPos, new Vec3(gatherPos.x + 100, gatherPos.y), "TotalMultiple", 0.7, {
                target: totalPengaliFatherNode,
                autoDestroy: false,
                insertIndex: 0,
            });
            if (this._ladybirdCancel) return;
            await UItools.moveEffectWorld(totalPengaliFatherNode, gatherPos, "", 0.6, {
                target: totalPengaliFatherNode,
                easing: "quadIn",
                scale: new Vec3(1.3, 1.3, 1.3),
            });
            if (this._ladybirdCancel) return;
            firstFont.getComponent(Label).string = `x${curScene.allMultiple}`;
            AudioControlManager.GetInstance().playSfxBeetleMultipleAdd();
            await EffectManager.playEffect("MultipleMove", firstFont.parent, new Vec3(0, this.node.parent.getPosition().y), { siblingIndex: 3 });
        }
        if (this._ladybirdCancel) return;
        const midRect = this.chipLabel3.node.parent.parent;
        // 火效果只有free有
        if (curScene.scene === E_GAME_SCENE_TYPE.FREE_GAME) {
            AudioControlManager.GetInstance().playSfxFireBurning();
            await EffectManager.playEffect("MultipleBoxFire", midRect, new Vec3(0, 3, 0));
            if (this._ladybirdCancel) return;
            EffectManager.playEffect("MultipleBoxFireing", midRect, new Vec3(0, 28, 0));
        }
        AudioControlManager.GetInstance().playSfxMergeDisperse();
        await UItools.moveEffectWorld(gatherPos, this.chipLabel3.node.parent.parent, "", 0.4, {
            target: firstFont,
            easing: "quadIn",
        });
        if (this._ladybirdCancel) return;
        AudioControlManager.GetInstance().playSfxMerge();
        EffectManager.playEffect("MultipleBox", midRect.getChildByName("Mask"), new Vec3(0, -203));
        if (this._ladybirdCancel) return;
        this._midRectTween = tween(midRect)
            .to(0.2, { scale: new Vec3(0.7, 1) }, { easing: "quadIn" })
            .to(0.2, { scale: new Vec3(1, 1) }, { easing: "quadOut" })
            .start();
        await LogicTools.Delay(200);
        if (this._ladybirdCancel) return;
        const multipleLabel = this.chipLabel3.node.parent.getChildByName("Multiple");
        multipleLabel.active = true;
        multipleLabel.getComponent(Label).string = `x${curScene.allMultiple ?? curScene.curMultiple}`;
        multipleLabel.scale = new Vec3(2, 2, 2);
        this._midRectTween2 = tween(multipleLabel)
            .to(0.6, { scale: Vec3.ONE }, { easing: "backIn" })
            .call(async () => {
                if (!this._ladybirdCancel) {
                    await LogicTools.waitNextFrame();
                    if (this._ladybirdCancel) return;
                    AudioControlManager.GetInstance().playSfxDingling();
                    const localPosIn = multipleLabel.parent.parent.inverseTransformPoint(new Vec3(), multipleLabel.worldPosition);
                    await EffectManager.playEffect("MultipleMoveLight", multipleLabel.parent.parent, new Vec3(localPosIn.x, localPosIn.y - 75), { siblingIndex: 2 });
                    multipleLabel.active = false;
                    if (this._ladybirdCancel) return;
                    this.updateWinChipsText(curScene, 800);
                }
            })
            .start();

        await LogicTools.Delay(1500);
        if (this._ladybirdCancel) return;
        EffectManager.stopEffect("MultipleBoxFireing", midRect);
    }
    //#endregion
}

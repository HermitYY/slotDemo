import { _decorator, Component, Label, Node, Prefab, Vec3 } from "cc";
import { BasePopup, PopupLayer } from "./BasePopup";
import { CommonList } from "../../common/CommonList";
import { SlotItem } from "../SlotItem";
import { UItools } from "../../Tools/UItools";
import { HistoryItem } from "../HistoryItem";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { HistoryWindowManager } from "../../managers/HistoryWindowManager";
import { E_POPUP_TYPE, PopupManager } from "./PopupManager";
import { PopupMask } from "./PopupMask";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

type HistoryItemData = {
    model: {
        gameKind: number;
        gameType: number;
        betChip: number;
        winChip: number;
        fee: number;
        moroSlotTracks: {
            result: string;
            initFreeResult: string;
            multiples: string;
            curMultiple: number;
            upMultiple: number;
            allMultiple: number;
            awardResult: string;
            freeCount: number;
            curChips: number;
            allChips: number;
            comboCout: number;
            awardResults: string[];
            ieEnd: number;
            isFeee: number;
        }[];
    };
    batchNo: string;
    roundId: string;
    tabletime: string;
};

@ccclass("PopupHistoryDetail")
export class PopupHistoryDetail extends BasePopup {
    @property(Label)
    private tabletimeLabel: Label = null;
    @property(Label)
    private batchNoLabel: Label = null;
    @property(Label)
    private betChipLabel: Label = null;
    @property(Label)
    private winChipLabel: Label = null;
    @property(Label)
    private timesLabel: Label = null;

    @property(Node)
    private leftButton: Node = null;
    @property(Node)
    private rightButton: Node = null;
    @property(Node)
    private playButton: Node = null;
    @property(Node)
    private totalChipsNode: Node = null;
    @property(Label)
    private totalChipsLabel: Label = null;
    @property(Node)
    private multipleNode: Node = null;
    @property(Label)
    private multipleLabel: Label = null;

    private curPage: number = 1;
    private listData: HistoryItemData = null;

    private isInit = false;

    private popupMask: PopupMask = null;

    override onLoad(): void {
        super.onLoad();
        this.isInit = true;
        if (this.listData) {
            this.updateContent();
        }
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY, this.playLoadDataEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY_RETURN, this.responseReplayQuery, this);
    }

    protected onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }

    public SetData(data: HistoryItemData) {
        this.listData = data;
        if (this.isInit) {
            this.updateContent();
        }
    }

    updateContent() {
        this.updateTitle();
        this.updateList();
        this.updateButtons();
    }

    updateTitle() {
        this.tabletimeLabel.string = this.listData.tabletime;
        this.batchNoLabel.string = this.listData.batchNo;
        this.betChipLabel.string = UItools.GetInstance().formatCurrency(this.listData.model.betChip, false);
        this.winChipLabel.string = UItools.GetInstance().formatCurrency(this.listData.model.winChip, false);
        const { awardList } = this.parseInfo();
        this.playButton.active = !!awardList.length;
    }

    updateList() {
        const { allList, curPageGirdData, awardIdArr, multipleArr } = this.parseInfo();
        const list = this.getComponentInChildren(CommonList);
        list.setData(curPageGirdData);
        list.getItemArray().forEach((item, index) => {
            const id = curPageGirdData[index];
            const slotItem = item.getComponent(SlotItem);
            slotItem.SetData(id, { isSelect: !!~awardIdArr.indexOf(id), myGridIndex: index });
            slotItem.historyDetailSelectedEffect();
            slotItem.LadybirdMultipleEffect(multipleArr);
        });
        this.timesLabel.string = `${this.curPage}/${allList.length}`;
        this.updateAwardList();
    }

    updateAwardList() {
        const { awardList, curpageInfo } = this.parseInfo();
        this.getComponentsInChildren(HistoryItem).forEach((item, index) => {
            if (!awardList.length || !awardList[index]) {
                item.node.active = false;
            } else {
                item.node.active = true;
                item.getComponent(HistoryItem).SetData({
                    id: awardList[index][0],
                    count: awardList[index][1],
                    money: awardList[index][2],
                });
            }
        });
        this.totalChipsNode.active = curpageInfo.ieEnd == 2 && curpageInfo.curChips > 0;
        this.totalChipsLabel.string = UItools.GetInstance().formatCurrency(curpageInfo.curChips ?? 0, false);
        this.multipleNode.active = curpageInfo.ieEnd == 1;
        this.multipleLabel.string = curpageInfo.curMultiple + "";
    }

    updateButtons() {
        this.leftButton.active = this.curPage > 1;
        this.rightButton.active = this.curPage < this.listData.model.moroSlotTracks.length;
    }

    onLeftButton() {
        if (this.curPage == 1) return;
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.curPage--;
        this.updateList();
        this.updateButtons();
    }

    onRightButton() {
        if (this.curPage == this.listData.model.moroSlotTracks.length) return;
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.curPage++;
        this.updateList();
        this.updateButtons();
    }

    public onClickPlayButton() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        HistoryWindowManager.GetInstance().preReqGetorderdetailback(this.listData.batchNo, this.listData.roundId);
    }

    onClickClose() {
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
        this.close();
    }

    private parseInfo() {
        const allList = this.listData.model.moroSlotTracks;
        const curpageInfo = allList[this.curPage - 1];
        const curPageAwardInfo = curpageInfo.awardResult.split("|").filter(Boolean);
        const awardList = curPageAwardInfo.map((item) => item.split(",").map(Number));
        const awardIdArr = awardList.map((item) => item[0]);

        const curPageInfo = allList[this.curPage - 1].result.split("|");
        const curPageGirdData = curPageInfo[curPageInfo.length - 1].split(",").map(Number);

        const multipleArr = allList[this.curPage - 1].multiples
            .split("|")
            .filter(Boolean)
            .map((item) => {
                const numberDataArr = item.split(",").map(Number);
                return {
                    multiple: numberDataArr[0],
                    index: numberDataArr[1],
                };
            });

        return { allList, curpageInfo, awardList, curPageGirdData, awardIdArr, multipleArr };
    }

    private responseReplayQuery(data) {
        this.removeLoadDataEffect();
        PopupManager.hideLayer(PopupLayer.History);
        PopupManager.show(E_POPUP_TYPE.Replay);
    }

    /** 播放加载效果 */
    async playLoadDataEffect() {
        this.removeLoadDataEffect();
        this.popupMask = await PopupManager.create<PopupMask>(E_POPUP_TYPE.Mask, { layer: PopupLayer.History, maskOpacity: 50 });
        this.popupMask.setEffectCfg([
            [
                {
                    effectName: "HistoryLoadDataEffect",
                    wordPos: this.node.getWorldPosition(),
                },
            ],
        ]);
        this.popupMask.show();
    }

    /** 删除加载效果 */
    removeLoadDataEffect() {
        this.popupMask && this.popupMask.close();
    }
}

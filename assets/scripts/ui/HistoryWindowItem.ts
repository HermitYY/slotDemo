import { _decorator, Component, Label, Node, Sprite } from "cc";
import { UItools } from "../Tools/UItools";
import { HistoryWindowManager } from "../managers/HistoryWindowManager";
const { ccclass, property } = _decorator;

type HistoryItemData = {
    lastcoin: number;
    curcoin: number;
    ip: string;
    baseChips: number;
    betChips: number;
    payChips: number;
    isFree: number;
    fillOnOff: number;
    isFill: number;
    swapOnOff: number;
    isSwap: number;
    multiple: number;
    multiples: number;
    freeCount: number;
    gameCount: number;
    comboCout: number;
    freeComboCout: number;
    isWater: number;
    element: string;
    flagName: string;
    topMultiple: number;
    topChips: number;
    isEnd: number;
    validCount: number;
    allCount: number;
    batchno: string;
    roundId: string;
    gameKind: number;
    gameType: number;
    roomid: string;
    betsource: string;
    playerId: string;
    nickname: string;
    username: string;
    agentId: string;
    status: number;
    txorderid: string;
    currencyCode: string;
    betCoin: number;
    isFinishe: number;
    online: number;
    id: number;
    createTime: string;
    modifyTime: string;
    splitDate: string;
};

@ccclass("HistoryWindowItem")
export class HistoryWindowItem extends Component {
    @property(Label)
    timeLabel: Label = null;
    @property(Label)
    tokenLabel: Label = null;
    @property(Label)
    payBetLabel: Label = null;
    @property(Label)
    awardChipsLabel: Label = null;
    @property(Sprite)
    bgSprite: Sprite = null;

    private myData: HistoryItemData;
    start() {}

    Setup(data, isShowBg: boolean) {
        if (!data) return;
        this.timeLabel.string = data.createTime;
        this.tokenLabel.string = data.batchno;
        this.payBetLabel.string = UItools.GetInstance().formatCurrency(data.betChips, false);
        this.awardChipsLabel.string = UItools.GetInstance().formatCurrency(data.payChips, false);
        this.bgSprite.node.active = isShowBg;
        this.myData = data;
    }

    onClickReqHistoryDetail() {
        HistoryWindowManager.GetInstance().preReqHistoryDetail(this.myData.batchno, this.myData.roundId, this.myData.createTime);
    }
}

import GlobalConfig from "../common/GlobalConfig";
import { Singleton } from "../common/Singleton";
import { getHistoryList, getHistoryDetail, getHistoryPlaybackDetail } from "../network/request";
import { E_GAME_EVENT, EventManager } from "./EventManager";
import { Debounce, Throttle } from "../Tools/LogicTools";

export class HistoryWindowManager extends Singleton {
    public readonly onceRequestPageSize = 10;
    private curRequestPageNum = 1;

    public async preReqHistoryList() {
        EventManager.emit(E_GAME_EVENT.GAME_HISTORY_LIST_QUERY);
        this.reqHistoryList();
    }
    @Throttle({ wait: 500, leading: false, trailing: true })
    private async reqHistoryList() {
        try {
            const res = await getHistoryList({
                pageSize: this.onceRequestPageSize,
                currentPage: this.curRequestPageNum,
                gameKind: 3,
                gameType: +GlobalConfig.ptype,
                roomId: GlobalConfig.roomId,
                token: GlobalConfig.token,
            });
            if (res.code !== 200) throw new Error("请求历史记录失败");
            EventManager.emit(E_GAME_EVENT.GAME_HISTORY_LIST_QUERY_RETURN, res.data);
            this.curRequestPageNum++;
        } catch (e) {
            console.error("reqHistoryList() 失败:", e);
        }
    }

    public preReqHistoryDetail(batchNo: string, roundId: string, tabletime: string) {
        EventManager.emit(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY);
        this.reqHistoryDetail(batchNo, roundId, tabletime);
    }
    @Throttle(1000)
    public async reqHistoryDetail(batchNo: string, roundId: string, tabletime: string) {
        try {
            const res = await getHistoryDetail({
                gameKind: 3,
                gameType: +GlobalConfig.ptype,
                roomId: GlobalConfig.roomId,
                batchNo,
                round: roundId,
                tabletime,
                token: GlobalConfig.token,
            });
            if (res.code !== 200) throw new Error("请求历史记录详情失败");
            EventManager.emit(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY_RETURN, { ...res.data, batchNo, roundId, tabletime });
        } catch (error) {
            console.error("reqHistoryDetail() 失败:", error);
        }
    }

    public preReqGetorderdetailback(batchNo: string, roundId: string) {
        EventManager.emit(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY);
        this.reqGetorderdetailback(batchNo, roundId);
    }
    @Throttle({ wait: 100, leading: false, trailing: true })
    public async reqGetorderdetailback(batchNo: string, roundId: string) {
        try {
            const res = await getHistoryPlaybackDetail({
                gameType: +GlobalConfig.ptype,
                batchNo,
                round: roundId,
                token: GlobalConfig.token,
            });
            if (res.code !== 200) throw new Error("请求历史记录回放失败");
            EventManager.emit(E_GAME_EVENT.GAME_HISTORY_REPLAY_QUERY_RETURN, res.data.mlist);
            console.log("回放详情", res.data);
        } catch (error) {
            console.error("reqGetorderdetailback() 失败:", error);
        }
    }

    public clearData() {
        this.curRequestPageNum = 1;
    }
}

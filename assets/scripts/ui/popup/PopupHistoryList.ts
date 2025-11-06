import { _decorator, Component, Node, Prefab } from "cc";
import { BasePopup, PopupLayer } from "./BasePopup";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { EffectManager } from "../../managers/EffectManager";
import { HistoryWindowManager } from "../../managers/HistoryWindowManager";
import { CommonList } from "../../common/CommonList";
import { HistoryWindowItem } from "../HistoryWindowItem";
import { PopupManager } from "./PopupManager";
import { PopupHistoryDetail } from "./PopupHistoryDetail";
import { PopupMask } from "./PopupMask";
const { ccclass, property } = _decorator;

@ccclass("PopupHistoryList")
export class PopupHistoryList extends BasePopup {
    @property(Node)
    list: Node = null;
    @property(Prefab)
    historyDetailWindowPrefab: Prefab = null;
    @property(Prefab)
    public popupMaskPrefab: Prefab = null;

    private popupMask: PopupMask = null;
    private curPage: number = 1;

    override onLoad(): void {
        super.onLoad();
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_LIST_QUERY, this.playLoadDataEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY, this.playLoadDataEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY_RETURN, this.removeLoadDataEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_LIST_QUERY_RETURN, this.responeListData, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY_RETURN, this.responeListDetail, this);
    }

    onDestroy(): void {
        EventManager.removeAllByTarget(this);
    }
    start() {
        HistoryWindowManager.GetInstance().preReqHistoryList();
    }

    update(deltaTime: number) {}

    onClickClose() {
        HistoryWindowManager.GetInstance().clearData();
        this.curPage = 1;
        this.close();
    }

    responeListData(data) {
        this.removeLoadDataEffect();
        const listData = data.mlist;
        console.log("历史数据", listData);
        const list = this.list.getComponent(CommonList);
        list.addData(listData);
        list.setOnScrollToBottom(() => {
            HistoryWindowManager.GetInstance().preReqHistoryList();
        });
        list.getItemArray()
            .slice((this.curPage - 1) * HistoryWindowManager.GetInstance().onceRequestPageSize, this.curPage * HistoryWindowManager.GetInstance().onceRequestPageSize)
            .forEach((node: Node, index) => {
                node.getComponent(HistoryWindowItem).Setup(listData[index], index % 2 !== 0);
            });
        this.curPage++;
    }

    /** 播放加载效果 */
    async playLoadDataEffect() {
        this.removeLoadDataEffect();
        this.popupMask = PopupManager.create<PopupMask>(this.popupMaskPrefab, { layer: PopupLayer.History, maskOpacity: 50 });
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

    responeListDetail(data) {
        console.log("历史详情数据", data);
        const detailWindow = PopupManager.create<PopupHistoryDetail>(this.historyDetailWindowPrefab);
        detailWindow.SetData(data);
        detailWindow.show();
    }
}

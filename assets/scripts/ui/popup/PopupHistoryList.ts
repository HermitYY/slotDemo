import { _decorator, Button, Component, Node, Prefab, Vec3 } from "cc";
import { BasePopup, PopupLayer } from "./BasePopup";
import { E_GAME_EVENT, EventManager } from "../../managers/EventManager";
import { EffectManager } from "../../managers/EffectManager";
import { HistoryWindowManager } from "../../managers/HistoryWindowManager";
import { CommonList } from "../../common/CommonList";
import { HistoryWindowItem } from "../HistoryWindowItem";
import { E_POPUP_TYPE, PopupManager } from "./PopupManager";
import { PopupHistoryDetail } from "./PopupHistoryDetail";
import { PopupMask } from "./PopupMask";
import { AudioControlManager } from "../../managers/AudioControlManager";
const { ccclass, property } = _decorator;

@ccclass("PopupHistoryList")
export class PopupHistoryList extends BasePopup {
    @property(Node)
    list: Node = null;
    private popupMask: PopupMask = null;
    private curPage: number = 1;
    private curClickitemIndex: number = 0;

    override onLoad(): void {
        super.onLoad();
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_LIST_QUERY, this.playLoadDataEffect, this);
        EventManager.on(E_GAME_EVENT.GAME_HISTORY_DETAIL_QUERY, this.playLoadDataEffect, this);
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
        AudioControlManager.GetInstance().playSfxNormalButtonClick();
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
        const pageNum = HistoryWindowManager.GetInstance().onceRequestPageSize;
        const startIndex = (this.curPage - 1) * pageNum;
        list.getItemArray()
            .slice(startIndex, this.curPage * pageNum)
            .forEach((node: Node, index) => {
                const globalIndex = startIndex + index;
                node["globalIndex"] = globalIndex;
                const btn = node.getComponent(Button);
                if (btn && !node["clickAdded"]) {
                    node["clickAdded"] = true;
                    btn.node.on(Button.EventType.CLICK, () => {
                        this.curClickitemIndex = globalIndex;
                    });
                }
                // 间隔压黑
                node.getComponent(HistoryWindowItem).Setup(listData[index], index % 2 !== 0);
            });
        this.curPage++;
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

    async responeListDetail(data) {
        console.log("历史详情数据", data);
        this.removeLoadDataEffect();
        const list = this.list.getComponent(CommonList);
        const curClickItem = list.getItemNodeAt(this.curClickitemIndex);
        const detailWindow = await PopupManager.create<PopupHistoryDetail>(E_POPUP_TYPE.HistoryDetail, {
            fromButtonPos: curClickItem.getWorldPosition().clone(),
            curstomAniCfg: { customAniOut: "expoOut", customAniIn: "expoIn" },
        });
        detailWindow.SetData(data);
        detailWindow.show();
    }
}

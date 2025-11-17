import { _decorator, Component, Label, Sprite, SpriteFrame } from "cc";
import { UItools } from "../Tools/UItools";
import { SlotItem } from "./SlotItem";
const { ccclass, property } = _decorator;

interface HistoryAwardInfo {
    id: number;
    count: number;
    money: number;
}

@ccclass("HistoryItem")
export class HistoryItem extends Component {
    @property([Label])
    private countLabels: Label[] = [];

    @property([Label])
    private moneyLabels: Label[] = [];

    private _data: HistoryAwardInfo | null = null;
    private _inited = false;
    onLoad() {
        this._inited = true;
        if (this._data) {
            this.setUp();
        }
    }

    private setUp() {
        const { id, count, money } = this._data!;
        const slot = this.getComponentInChildren(SlotItem);
        if (slot) {
            slot.SetData(id);
        }
        this.countLabels.forEach((label) => {
            label.string = `x${count}`;
        });
        this.moneyLabels.forEach((label) => {
            label.string = UItools.GetInstance().formatCurrency(money);
        });
    }

    public SetData(data: HistoryAwardInfo) {
        this._data = data;
        if (this._inited) {
            this.setUp();
        }
    }
}

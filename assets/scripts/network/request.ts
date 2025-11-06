// API.ts
import { game } from "cc";
import * as HTTPService from "./HTTPService";

// 登录接口
export function loginByToken(data: { username: string; password: string }) {
    return HTTPService.post("player/loginByToken", data);
}

// 获取房间详情接口
export function getdetailSlot(data: { token: string; roomid: string }) {
    return HTTPService.get("room/getdetailSlot", data);
}

// 历史记录list查询
export function getHistoryList(data: { currentPage: number; pageSize: number; gameKind: number; gameType: number; roomId: string; token: string }) {
    return HTTPService.get("precord/getorderlist", data);
}

// 某条历史记录详情
export function getHistoryDetail(data: { gameKind: number; gameType: number; roomId: string; batchNo: string; round: string; tabletime: string; token: string }) {
    return HTTPService.get("precord/getorderdetaillist", data);
}

/** 某条记录的回放详情 */
export function getHistoryPlaybackDetail(data: { gameType: number; batchNo: string; round: string; token: string }) {
    return HTTPService.get("precord/getorderdetailback", data);
}

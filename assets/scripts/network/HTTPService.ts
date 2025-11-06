// HTTPService.ts
import GlobalConfig from "../common/GlobalConfig";

declare const CC_DEBUG: boolean;
export async function get(url: string, params?: any) {
    let query = "";
    if (params) {
        query = "?" + new URLSearchParams(params).toString();
    }

    try {
        const res = await fetch((CC_DEBUG ? GlobalConfig.developmentUrl : GlobalConfig.productionUrl) + url + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if (data.code === 200) return data;
        return data;
    } catch (err) {
        console.error("GET request error:", err);
        throw err;
    }
}

// 封装 POST 请求
export async function post(url: string, data?: any) {
    const formData = new FormData();
    if (data) {
        for (const key in data) {
            formData.append(key, data[key]);
        }
    }

    try {
        const res = await fetch((CC_DEBUG ? GlobalConfig.developmentUrl : GlobalConfig.productionUrl) + url, {
            method: "POST",
            body: formData,
        });

        const result = await res.json();
        if (result.code === 200) return result;
        return result;
    } catch (err) {
        console.error("POST request error:", err);
        throw err;
    }
}

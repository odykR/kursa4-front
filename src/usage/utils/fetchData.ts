import {getRefreshToken} from "@/usage/utils/postData";

export const fetchData = async <T, >(url: string): Promise<T | undefined> => {
    const data = await fetch(url, {
        method: "GET",
    });
    if (data.status === 403) {
        window.location.replace("/");
        return
    }
    if (data.status === 401) {
        const refresh = await getRefreshToken()
        if (!refresh) {
            return undefined
        }
        fetchData(url)
        return
    }
    if (data.status !== 200 && data.status !== 201) {
        return undefined
    }
    return await data.json()
}
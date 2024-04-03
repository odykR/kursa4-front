import {getRefreshToken} from "@/usage/utils/postData";

export const deleteData = async <T, >(url: string): Promise<T | undefined> => {
    const headers = new Headers({
        'Accept': 'application/json',
        "Content-Type": "application/json",
    })
    const data = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        credentials: "same-origin",
        headers: headers,
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
        deleteData(url)
        return
    }
    if (data.status !== 200 && data.status !== 201) {
        return undefined
    }
    return await data.json()
}
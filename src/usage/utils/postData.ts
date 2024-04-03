import {AuthPaths} from "@/usage/utils/constPaths";

export const postData = async <T, >(body: unknown, url: string): Promise<T | undefined> => {
    const headers = new Headers({
        'Accept': 'application/json',
        "Content-Type": "application/json",
    })
    const data = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: headers,
        body: JSON.stringify(body)
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
        postData(body, url)
        return
    }
    if (data.status !== 200 && data.status !== 201) {
        return undefined
    }
    return await data.json()
}

export const getRefreshToken = async (): Promise<boolean> => {
    try {
        const headers = new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
        })
        await fetch(AuthPaths.REFRESH, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: headers,
            body: JSON.stringify({
                refreshToken: localStorage.getItem("refresh")
            })

        });
        return true
    } catch (e) {
        return false
    }

}
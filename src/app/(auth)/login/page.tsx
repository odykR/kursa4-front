"use client"

import React, {useState} from 'react';
import {Button, Card, Input, message} from "antd";
import {AuthPaths} from "@/usage/utils/constPaths";
import {postData} from "@/usage/utils/postData";
import {useRouter} from "next/navigation";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import {INIT_STATE_LOGIN, INIT_STATE_NAMES_LOGIN} from "@/usage/pages/login/consts/login.consts";
import {initStateLogin, LoginJWTResponse, loginRefresh} from "@/usage/pages/login/types/login.interfaces";

const LoginPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<initStateLogin>(INIT_STATE_LOGIN)
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async (): Promise<void> => {
        if (Object.values(userData).every(key => key.length < 3)) {
            messageApi.error({
                type: 'error',
                content: 'Данные не соответвуют требованиям',
            })
            return
        }
        setIsLoading(true)
        const data: loginRefresh | undefined = await postData<loginRefresh>({name: userData.login, password: userData.password}, AuthPaths.LOGIN)
        const cookies = Cookies.get("Cookie")
        setIsLoading(false)
        if (!data) {
            messageApi.error({
                type: 'error',
                content: 'Проверьте введенные данные',
            })
            return
        }
        if (!cookies) {
            messageApi.error({
                type: 'error',
                content: 'Произошла ошибка на сервере, повторите позже',
            })
            return
        }
        localStorage.setItem("refresh", data?.refreshToken)
        const decodedCookie: LoginJWTResponse = jwtDecode(cookies)
        if (decodedCookie.role === "admin") {
            router.push("/admin/posts")
            return
        }
        router.push("/")
        messageApi.error({
            type: 'error',
            content: 'Не удалось войти, проверьте введенные данные',
        })
    }
    return (
        <>
            <h1 style={{textAlign: "center", margin: "0 auto"}}>Войти</h1>
            <div style={{width: "25vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div style={{margin: "20px 0 0 0"}}>
                    <Input value={userData.login} name={INIT_STATE_NAMES_LOGIN.login} placeholder="login"
                           onChange={(event) => handleChange(event)}/>
                </div>
                <div style={{margin: "20px 0 20px 0"}}>
                    <Input.Password style={{width: "100%"}} value={userData.password}
                                    name={INIT_STATE_NAMES_LOGIN.password} placeholder="password"
                                    onChange={(event) => handleChange(event)}
                                    visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
                    />
                </div>
                <Button loading={isLoading} onClick={() => handleSubmit()}>
                    Зайти
                </Button>
                {contextHolder}
            </div>
        </>
    );
};

export default LoginPage;
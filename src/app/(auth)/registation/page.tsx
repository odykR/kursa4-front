"use client"

import React, {useState} from 'react';
import {Button, Card, Input, message} from "antd";
import {AuthPaths} from "@/usage/utils/constPaths";
import {postData} from "@/usage/utils/postData";
import { useRouter } from 'next/navigation';
import {initStateRegistration} from "@/usage/pages/registration/types/reg.interfaces";
import {INIT_STATE_NAMES_REGISTRATION, INIT_STATE_REGISTRATION} from "@/usage/pages/registration/consts/reg.consts";

const LoginPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<initStateRegistration>(INIT_STATE_REGISTRATION)
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
        if (Object.values(userData).every(key => key.length < 5)) {
            messageApi.error({
                type: 'error',
                content: 'Данные не соответвуют требованиям',
            })
            return
        }
        setIsLoading(true)
        const data = await postData({name: userData.login, password: userData.password, email: userData.email}, AuthPaths.REG)
        setIsLoading(false)
        if (data?.status === 500) {
            messageApi.error({
                type: 'error',
                content: 'Произошла ошибка на сервере',
            })
            return
        }
        if (!data) {
            messageApi.error({
                type: 'error',
                content: 'Проверьте введенные данные',
            })
            return
        }
        router.push("/login")
        messageApi.success({
            type: 'success',
            content: 'Регистрация пройдена',
        })
    }
    return (
        <>
            <h1 style={{textAlign: "center", margin: "0 auto"}}>Регистрация</h1>
            <div style={{width: "25vw", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div style={{margin: "20px 0 0 0"}}>
                    <Input value={userData.login} name={INIT_STATE_NAMES_REGISTRATION.login} placeholder="login"
                           onChange={(event) => handleChange(event)}/>
                </div>
                <div style={{margin: "20px 0 0 0"}}>
                    <Input value={userData.email} name={INIT_STATE_NAMES_REGISTRATION.email} placeholder="email"
                           onChange={(event) => handleChange(event)}/>
                </div>
                <div style={{margin: "20px 0 20px 0"}}>
                    <Input.Password style={{width: "100%"}} value={userData.password}
                                    name={INIT_STATE_NAMES_REGISTRATION.password} placeholder="password"
                                    onChange={(event) => handleChange(event)}
                                    visibilityToggle={{
                                        visible: passwordVisible,
                                        onVisibleChange: setPasswordVisible
                                    }}
                    />
                </div>
                <Button loading={isLoading} onClick={() => handleSubmit()}>
                    Зарегистироваться
                </Button>
                {contextHolder}
            </div>
        </>
    );
};

export default LoginPage;
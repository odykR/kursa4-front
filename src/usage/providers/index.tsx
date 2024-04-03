"use client"

import React, {useEffect, useState} from 'react';
import Exit from "../components/exit";
import {Layout, Menu} from "antd";
import Link from "next/link";
import {Header} from "antd/es/layout/layout";
import {MAIN_PAGES_ITEMS} from "../consts/mainLayout.consts";
import {LoginOutlined, UserOutlined} from "@ant-design/icons";
import {CheckJWT} from "../hooks/checkJWT";

interface ProvidersProps {
    children: React.ReactNode
}

const Providers = ({children}: ProvidersProps) => {
    const {isAdmin, isAuthCompleted, path, isLoading} = CheckJWT()
    return (
        <Layout style={{width: "100vw", minHeight: '100vh'}}>
            <Header style={{width: "100vw", display: 'flex', alignItems: 'center'}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{flex: 1, minWidth: 0}}
                >
                    {
                        isAdmin && (
                            <Menu.Item icon={<UserOutlined/>}>
                                <Link href="/admin/posts">Админ</Link>
                            </Menu.Item>
                        )
                    }
                    {MAIN_PAGES_ITEMS.map(item => (
                        <Menu.Item icon={item.icons} key={item.key}>
                            <Link href={item.link}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                    {
                        !isAuthCompleted ? (
                            <>
                                <Menu.Item icon={<LoginOutlined/>}>
                                    <Link href="/login">Войти</Link>
                                </Menu.Item>
                                <Menu.Item icon={<LoginOutlined/>}>
                                    <Link href="/registation">Зарегистироваться</Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <Exit/>
                        )
                    }
                </Menu>
            </Header>
            {children}
        </Layout>
    );
};

export default Providers;
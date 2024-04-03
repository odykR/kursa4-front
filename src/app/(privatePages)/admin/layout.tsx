"use client"
import React, {useState} from 'react';
import {Content} from "antd/es/layout/layout";
import {Layout, Menu, theme} from "antd";
import Link from 'next/link';
import Sider from "antd/es/layout/Sider";
import {PAGE_ITEMS} from "@/usage/consts/adminLayout.consts";

interface AdminLayout {
    children: React.ReactNode
}

const AdminLayout = ({children}: AdminLayout): React.ReactNode => {
    const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken()
    const [collapsed, setCollapsed] = useState<boolean>(true)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu
                    theme="dark"
                    mode="inline"
                    style={{flex: 1, minWidth: 0}}
                >
                    {PAGE_ITEMS.map(item => (
                        <Menu.Item icon={item.icons} key={item.key}>
                            <Link href={item.link}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Content style={{height: "80vw", padding: '20px 48px'}}>
                <main
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}>
                    {children}
                </main>
            </Content>
        </Layout>
    );
};

export default AdminLayout;
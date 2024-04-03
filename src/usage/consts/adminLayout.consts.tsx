import React from "react";
import {CopyOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";

export const PAGE_ITEMS = [
    {
        key: 1,
        label: "Посты",
        link: "/admin/posts",
        icons: <CopyOutlined />
    },
    {
        key: 2,
        label: "Пользователи",
        link: "/admin/users",
        icons: <UserOutlined />
    },
    {
        key: 3,
        label: "Токены",
        link: "/admin/tokens",
        icons: <UserSwitchOutlined />
    },
]
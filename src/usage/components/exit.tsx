import {LogoutOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import React from 'react';
import Cookies from 'js-cookie'
import {useRouter} from "next/navigation";

const Exit = () => {
    const router = useRouter()
    const handleExit = () => {
        Cookies.remove('Cookie')
        router.push("/login")
    }
    return (
        <Menu.Item style={{paddingLeft: "26px"}} onClick={() => handleExit()} key={3} icon={<LogoutOutlined />}>
            Выйти
        </Menu.Item>
    );
};

export default Exit;
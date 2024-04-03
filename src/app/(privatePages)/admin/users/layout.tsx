import React from 'react';
import Title from "antd/es/typography/Title";

interface usersLayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: usersLayoutProps) => {
    return (
        <div>
            <Title style={{margin: "20px 0 0 0"}}>Пользователи</Title>
            {children}
        </div>
    );
};

export default Layout;
import React from 'react';
import Title from "antd/es/typography/Title";

interface PostsLayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: PostsLayoutProps) => {
    return (
        <div>
            <Title style={{margin: "20px 0 0 0"}}>Посты</Title>
            {children}
        </div>
    );
};

export default Layout;
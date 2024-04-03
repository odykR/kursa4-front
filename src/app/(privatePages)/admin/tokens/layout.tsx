import React from 'react';
import Title from "antd/es/typography/Title";

interface TokensLayoutProps {
    children: React.ReactNode
}

const Layout = ({children}: TokensLayoutProps) => {
    return (
        <div>
            <Title style={{margin: "20px 0 0 0"}}>Токены</Title>
            {children}
        </div>
    );
};

export default Layout;
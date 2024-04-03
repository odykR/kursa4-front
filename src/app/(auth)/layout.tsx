import React from 'react';
import {Card} from "antd";
interface AuthLayoutProps {
    children: React.ReactNode
}
const AuthLayout = ({children}: AuthLayoutProps): React.ReactNode => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "30vh 0 0 0"}}>
            <Card>
                {children}
            </Card>
        </div>);
};

export default AuthLayout;
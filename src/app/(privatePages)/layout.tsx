"use client"

import React from 'react';
import {Spin} from 'antd';
import {CheckJWTWithRedirect} from "@/usage/hooks/checkJWT";

interface PrivatePagesLayout {
    children: React.ReactNode
}

const PrivatePagesLayout = ({children}: PrivatePagesLayout) => {
    const {isAdmin, isLoading} = CheckJWTWithRedirect()
    if (!isAdmin && isLoading) {
        return <Spin/>
    }
    return children

};

export default PrivatePagesLayout;
"use client"

import React, {useEffect, useState} from 'react';
import {ITokens} from "@/usage/pages/tokens/types/tokens.interfaces";
import {fetchData} from "@/usage/utils/fetchData";
import {AuthPaths} from "@/usage/utils/constPaths";
import TokensTable from "@/usage/pages/tokens/tokensTable/tokensTable";
import TokensStats from "@/usage/pages/tokens/tokensStats/tokensStats";


const TokensPage = async () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tokens, setTokens] = useState<ITokens | undefined>()
    const getTokens = async () => {
        setIsLoading(true)
        const data = await fetchData<ITokens>(AuthPaths.TOKENS)
        setTokens(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getTokens()
    }, []);

    return (
        <>
            <TokensStats tokens={tokens} isLoading={isLoading} />
            <TokensTable tokens={tokens} getTokens={getTokens} />
        </>
    );
};

export default TokensPage;
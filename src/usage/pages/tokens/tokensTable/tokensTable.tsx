import React, {useState} from 'react';
import {Table} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru"
import {ITokens} from "../types/tokens.interfaces";
import {LoginJWTResponse} from "../../login/types/login.interfaces";
import { jwtDecode } from 'jwt-decode';
dayjs.locale('ru');

interface tokensTableProps {
    tokens: ITokens | undefined,
    getTokens: () => void
}

const TokensTable = ({tokens, getTokens}: tokensTableProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const columns = [
        {
            title: 'Ключ',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'ID пользователя',
            dataIndex: 'token',
            key: 'clientID',
            render: (text: string) => {
                const decodedToken: LoginJWTResponse = jwtDecode(text);
                return (
                    <div>
                        {decodedToken.id}
                    </div>
                )
            }
        },
        {
            title: 'Роль',
            dataIndex: 'token',
            key: 'role',
            render: (text: string) => {
                const decodedToken: LoginJWTResponse = jwtDecode(text);
                return (
                    <div>
                        {decodedToken.role}
                    </div>
                )
            }
        },
        {
            title: 'Токен',
            dataIndex: 'token',
            key: 'token',
            render: (text: string) => <div style={{width: "50vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{text}</div>
        },
    ];
    return (
            <Table dataSource={tokens} columns={columns}/>
    )

};

export default TokensTable;
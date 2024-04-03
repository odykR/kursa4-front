import React, {useState} from 'react';
import {Button, Table} from "antd";
import { EditOutlined,} from '@ant-design/icons';
import dayjs from "dayjs";
import "dayjs/locale/ru"
import {IUser, IUsers} from "../types/users.interfaces";
import UsersPatchModal from "../usersModal/usersPatch.modal";
dayjs.locale('ru');

interface usersTableProps {
    users: IUsers | undefined,
    getUsers: () => void
}

const UsersTable = ({users, getUsers}: usersTableProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Пароль",
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Эл. почта',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Изменить роль',
            key: 'updateUser',
            render: (text: string, record: IUser) => (
                <>
                    <Button type="primary" onClick={() => setOpen(prevState => !prevState)}>
                        <EditOutlined/>
                    </Button>
                    <UsersPatchModal getUsers={getUsers} open={open} setOpen={setOpen} userData={record}/>
                </>
            ),
        },
    ];
    return (
            <Table dataSource={users} columns={columns}/>
    )

};

export default UsersTable;
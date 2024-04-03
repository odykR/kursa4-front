import React, {useState} from 'react';
import {Button, Modal, Table} from "antd";
import {IPost, IPosts} from "../types/posts.interfaces";
import PostsPatchModal from "../modal/postsPatch.modal";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import dayjs from "dayjs";
import "dayjs/locale/ru"
import {deleteData} from "@/usage/utils/deleteData";
import {PostPaths} from "@/usage/utils/constPaths";
dayjs.locale('ru');

interface PostTablesProps {
    posts: IPosts | undefined,
    getPosts: () => void
}

const PostTables = ({posts, getPosts}: PostTablesProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const {confirm} = Modal

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Контент',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Создано',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string, record: IPost) => (
                <>
                    {dayjs(record.createdAt).locale("ru").toString()}
                </>
            )
        },
        {
            title: 'Последнее изменение',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string, record: IPost) => (
                <>
                    {dayjs(record.updatedAt).locale("ru").toString()}
                </>
            )
        },
        {
            title: 'Изменить пост',
            key: 'UpdatePost',
            render: (text: string, record: IPost) => (
                <>
                    <Button type="primary" onClick={() => setOpen(prevState => !prevState)}>
                        <EditOutlined/>
                    </Button>
                    <PostsPatchModal getPosts={getPosts} open={open} setOpen={setOpen} postData={record}/>
                </>
            ),
        },
        {
            title: 'Удалить пост',
            key: 'action',
            render: (text: string, record: IPost) => (
                <Button danger onClick={() => deletePost(record.id)}>
                    <DeleteOutlined/>
                </Button>
            ),
        },
    ];
    const deletePost = async (id: number) => {
        confirm({
            title: 'Вы уверены, что хотите удалить этот пост?',
            icon: <ExclamationCircleFilled/>,
            content: 'Его невозможно будет восстановить',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                return new Promise<void>((resolve, reject) => {
                    deleteData(PostPaths.POST + "/" + id).then(() => {
                        getPosts()
                        resolve()
                    }).catch(() => reject()).finally(() => resolve())
                })
            },
            onCancel() {
            },
        });
    }
    return (
            <Table dataSource={posts} columns={columns}/>
    )

};

export default PostTables;
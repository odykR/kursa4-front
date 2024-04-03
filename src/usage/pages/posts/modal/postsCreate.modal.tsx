import React, {useState} from 'react';
import {Input, message, Modal} from "antd";
import {INIT_STATE_NAMES_POSTS, INIT_STATE_POSTS} from "../consts/posts.consts";
import {initStateCreatePosts} from "../types/posts.interfaces";
import TextArea from 'antd/es/input/TextArea';
import {postData} from "@/usage/utils/postData";
import {PostPaths} from "@/usage/utils/constPaths";


interface PostsCreateModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    getPosts: () => void
}

const PostsCreateModal = ({open, setOpen, getPosts}: PostsCreateModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [userData, setUserData] = useState<initStateCreatePosts>(INIT_STATE_POSTS)
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = event.target
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async () => {
        setConfirmLoading(true)
        const data = await postData(userData, PostPaths.POST)
        if (data) {
            messageApi.error({
                type: 'error',
                content: 'Не удалось создать пост',
            })
            setConfirmLoading(false)
            return
        }
        messageApi.success({
            type: 'success',
            content: 'Пост успешно создан!',
        })
        getPosts()
        closeModal()
        setConfirmLoading(false)
    }
    const closeModal = () => {
        setOpen(false)
        setUserData(INIT_STATE_POSTS)
    }
    return (
        <Modal open={open} confirmLoading={confirmLoading} title="Создать пост" onOk={() => handleSubmit()}
               onCancel={() => closeModal()} okText="Создать пост" cancelText="Отменить">
                <div style={{margin: "20px 0 20px 0"}}>
                    <Input placeholder="Название поста" name={INIT_STATE_NAMES_POSTS.title}
                           onChange={(event) => handleChange(event)} value={userData.title}/>
                </div>
                <div>
                    <TextArea rows={6} placeholder="Содержание поста" name={INIT_STATE_NAMES_POSTS.content}
                           onChange={(event) => handleChange(event)} value={userData.content}/>
                </div>
            {contextHolder}
        </Modal>
    );
};

export default PostsCreateModal;
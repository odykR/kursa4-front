import React, {useState} from 'react';
import {message, Modal, Select} from "antd";
import {UsersPaths} from "@/usage/utils/constPaths";
import {patchData} from "@/usage/utils/patchData";
import {IUser} from "../types/users.interfaces";
import {USERS_ROLE} from "../consts/users.consts";
import {CloseSquareFilled} from "@ant-design/icons";


interface PostsCreateModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    getUsers: () => void,
    userData: IUser
}

const UsersPatchModal = ({open, setOpen, getUsers, userData}: PostsCreateModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [role, setRole] = useState<string | undefined>()
    const [messageApi, contextHolder] = message.useMessage();
    const handleSubmit = async () => {
        setConfirmLoading(true)
        const dataForReq = {
            role: role
        }
        const data = await patchData(dataForReq, `${UsersPaths.USERS}/${userData.id}`)
        if (data) {
            messageApi.error({
                type: 'error',
                content: 'Не удалось обновить пользователя',
            })
            setConfirmLoading(false)
            return
        }
        messageApi.success({
            type: 'success',
            content: 'Пользователь успешно изменен!',
        })
        getUsers()
        closeModal()
        setConfirmLoading(false)
    }
    const closeModal = () => {
        setOpen(false)
        setRole(undefined)
    }
    return (
        <Modal open={open} confirmLoading={confirmLoading} title="Изменить пользователя" onOk={() => handleSubmit()}
               onCancel={() => closeModal()} okText="Изменить" cancelText="Отменить">
            <div style={{margin: "20px 0 20px 0"}}>
                <Select
                    showSearch
                    placeholder="Выберите роль"
                    style={{width: "100%"}}
                    options={USERS_ROLE}
                    value={role}
                    onChange={(event) => setRole(event)}
                    filterOption={(inputValue, option) =>
                        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    allowClear={{clearIcon: <CloseSquareFilled/>}}
                />
            </div>
            {contextHolder}
        </Modal>
    );
};

export default UsersPatchModal;
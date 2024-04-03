"use client"

import React, {useEffect, useState} from 'react';
import {IUsers} from "@/usage/pages/users/types/users.interfaces";
import {fetchData} from "@/usage/utils/fetchData";
import {UsersPaths} from "@/usage/utils/constPaths";
import UserStats from "@/usage/pages/users/usersStats/userStats";
import UsersTable from "@/usage/pages/users/usersTable/usersTable";


const CreatePost = async () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<IUsers | undefined>()
    const getUsers = async () => {
        setIsLoading(true)
        const data = await fetchData<IUsers>(UsersPaths.USERS)
        setUsers(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <>
            <UserStats users={users} isLoading={isLoading} />
            <UsersTable getUsers={getUsers} users={users}/>
        </>
    );
};

export default CreatePost;
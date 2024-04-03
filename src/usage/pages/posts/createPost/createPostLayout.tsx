"use client"
import React, {useState} from 'react';
import PostsCreateModal from "../modal/postsCreate.modal";
import {Button} from "antd";

interface CreatePostLayoutProps {
    getPosts: () => void
}
const CreatePostLayout = ({getPosts}: CreatePostLayoutProps) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <Button onClick={() => setOpen(prevState => !prevState)}>
                Создать пост
            </Button>
            <PostsCreateModal getPosts={getPosts} open={open} setOpen={setOpen} />
        </>
    );
};

export default CreatePostLayout;
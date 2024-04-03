"use client"

import React, {useEffect, useState} from 'react';
import {fetchData} from "@/usage/utils/fetchData";
import {PostPaths} from "@/usage/utils/constPaths";
import {IPosts} from "@/usage/pages/posts/types/posts.interfaces";
import PostsStats from "@/usage/pages/posts/postsStats/postsStats";
import CreatePostLayout from "@/usage/pages/posts/createPost/createPostLayout";
import PostTables from "@/usage/pages/posts/postTable/postTables";


const CreatePost = async () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<IPosts | undefined>()
    const getPosts = async () => {
        setIsLoading(true)
        const data = await fetchData<IPosts>(PostPaths.POST)
        setPosts(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <>
            <PostsStats posts={posts} isLoading={isLoading} />
            <div style={{margin: "0 0 20px 0"}}>
                <CreatePostLayout getPosts={getPosts}/>
            </div>
            <PostTables getPosts={getPosts} posts={posts}/>
        </>
    );
};

export default CreatePost;
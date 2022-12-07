"use client";

import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import PostImages from '../SinglePostComps/PostImages';
import PostText from '../SinglePostComps/PostText';

export default function PostContent({postId}) {

    const [posts, setPosts] = useState([{
        content: ""
    }]);

    useEffect( () => {

        const getPostGivenId = async () => {
            try {
                const response = await axios.get("/api/get_single_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.log(error, 'error! while getting post using id');    
            }
        }    
        getPostGivenId();
    }, [postId])


    return (
        <>
            <h1 className="mb-4 ml-6 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">{posts && posts[0]?.content ? posts[0]?.content.split("\n")[0] : ""}</h1>
            {
                posts ? posts[0].content.split("\n").map( line => line.startsWith("![]") ? <PostImages postImageUrl={line} /> : <PostText text={line}/>) : ""
            }
        </>
    )
}

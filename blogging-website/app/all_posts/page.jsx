"use client";

import React, { useEffect } from 'react'
import axios from 'axios';
import PostsFromSameUser from "../../components/UserPosts/UserPosts";
import { useState } from 'react';


export default  function page() {
    // make the search part and if something on input then search and return the results
   const [posts, setPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: "",
        username: "",
   }]);

    // for getting all posts here and showing in here without using hooks

    useEffect( () => {

        const getRecentPosts = async () => {
            try {
                const response = await axios.get("/api/get_all_posts");
                setPosts(response.data.latestPosts);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        getRecentPosts();
    }, []);

    return (
        <>
            {
                    posts ? posts.map( item => 
                        <PostsFromSameUser
                            id={item?.id} 
                            key={item?.date} 
                            content={item?.content}
                            title={item?.content.split("\n")[0]} 
                            date={item?.date}
                            username={item?.poster} 
                        />
                    ): ""
            }
        </>
    )
}

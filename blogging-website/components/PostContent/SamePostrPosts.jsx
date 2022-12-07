import axios from 'axios';
import Link from 'next/link';

import React, { useState } from 'react'
import { useEffect } from 'react'
import { moveToTopOfDocument } from '../../functions/MovtToTop/MoveToTop';

export default function SamePostrPosts({postId}) {

    const [sameUserPosts, setSameUserPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: ""
    }]);
    const [id, setId] = useState(null);

    // now should make another component when it's mounted
    // so that it shows the recent posts of the same user.

    useEffect( () => {
        const getSameUserPosts = async () => {
            setId(postId);
            try {
                const response = await axios.get("/api/get_same_user_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                setSameUserPosts(response.data.samePosts);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }

        getSameUserPosts();
    }, [postId, id]);

    // when clicked on the link mov to top of the screen


    return (
        <>
            {
                sameUserPosts ? sameUserPosts.map( item => {
                    return (
                        <div className="w-fit p-4 " key={item?.id}>
                            <div className="flex items-start justify-between">
                                <span className="text-sm font-light text-gray-600 dark:text-gray-400 ">{item?.date.split("T")[0] || "2022-12-4"}</span>
                                <span className="text-sm font-light text-gray-600 dark:text-gray-400 "> {item?.username || ""} </span> 
                            </div> 
                            <div className="mt-2">
                                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{item.content.split("\n")[0] || ""}</Link> 
                                <p className="line-clamp-3 overflow-ellipsis mt-2 text-gray-600 dark:text-gray-300 text-sm ">{item?.content || ""}</p>
                            </div> 
                        
                            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="text-blue-300 transition-all duration-300 hover:underline text-sm" id={item?.id}>Read more ⟶</Link> 
                        </div>
                    )
                }) : ""
            }
        </>
    )
}

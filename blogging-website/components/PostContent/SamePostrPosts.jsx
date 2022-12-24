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
                        <div className="md:w-fit w-[95%] mx-auto p-4 bg-[#f5f5f5] rounded-lg md:ml-2  mt-2 " key={item?.id}>
                            <div className="flex items-start justify-between">
                                <span className="text-sm font-light text-black">{item?.date.split("T")[0] || ""}</span>
                                <span className="text-sm font-light text-black"> {item?.username || ""} </span> 
                            </div> 
                            <div className="mt-2">
                                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-black hover:underline">{item.content.split("\n")[0] || ""}</Link> 
                                <p className="line-clamp-3 overflow-ellipsis mt-2 text-black/80 text-sm mb-4">{item?.content || ""}</p>
                            </div> 
                        
                            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="text-black/70 transition-all duration-300 hover:underline text-sm " id={item?.id}>{item?.username ? "Read more ⟶" : null}</Link> 
                        </div>
                    )
                }) : ""
            }
        </>
    )
}

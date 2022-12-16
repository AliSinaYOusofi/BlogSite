import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { moveToTopOfDocument } from '../../functions/MovtToTop/MoveToTop';
import { useSpacexProvider } from '../../context/appContext';

export default function ViewUserPosts({}) {
    
    const userEmail = useSearchParams().get("email");
    const {setViewDataUser} = useSpacexProvider();
    const [posts, setPosts] = useState([{
        title: "",
        content: "",
        date: "",
    }]);

    useEffect( () => {
    
        const getPosts = async () => {
          try { 
            const response = await axios.post("/api/get_view_posts", {
                email: userEmail
            });
            // this should do it.
            setPosts(response.data.posts);
            setViewDataUser(response.data.userData);
        
          } catch (error) { console.log(error, '*************************')}
        }
        getPosts();
    }, [userEmail]);

    
    return (
        <div className="flex flex-col mt-10 gap-y-3">
            {
                posts ? posts.map( item => {
                    return (
                        <div className="md:w-fit w-[95%] mx-auto p-4 bg-[#f5f5f5] rounded-lg md:ml-2  mt-2 " key={item?.id}>
                            <div className="flex items-start justify-between">
                                <span className="text-sm font-light text-black">{item?.date.split("T")[0] || "2022-12-4"}</span>
                                <span className="text-sm font-light text-black"> {item?.username || ""} </span> 
                            </div> 
                            <div className="mt-2">
                                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-black hover:underline">{item.content.split("\n")[0] || ""}</Link> 
                                <p className="line-clamp-3 overflow-ellipsis mt-2 text-black/80 text-sm mb-4">{item?.content || ""}</p>
                            </div> 
                        
                            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="text-black/70 transition-all duration-300 hover:underline text-sm " id={item?.id}>Read more ⟶</Link> 
                        </div>
                    )
                }) : ""
            }
        </div>
    )
}

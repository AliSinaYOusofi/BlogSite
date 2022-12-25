import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { moveToTopOfDocument } from '../../functions/MovtToTop/MoveToTop';
import { useSpacexProvider } from '../../context/appContext';
import MiniMenu from './MiniMenu';

export default function ViewUserPosts({}) {
    
    const userEmail = useSearchParams().get("email");
    const {setViewDataUser} = useSpacexProvider();
    const [posts, setPosts] = useState([{
        title: "",
        content: "",
        date: "",
    }]);
    const [miniMenu, setMiniMenu] = useState(false);

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

    // show the menu of copy link of profile
    const showMinMenu = () => {
        setMiniMenu(!miniMenu);

    }

    return (
        <div className="flex flex-col mt-12 gap-y-3">
            {
                Object.keys(posts[0]).length ? posts.map( item => {
                    return (
                        <div className="md:w-fit w-[95%] mx-auto px-7 py-10 bg-[#f5f5f5] rounded-lg md:ml-2  mt-2 " key={item?.id || item?._id}>
                            <div className="flex items-start justify-between relative">
                                <span className="text-sm font-light text-black">{item?.date.split("T")[0] || ""}</span>
                                <span onClick={showMinMenu} className="text-sm font-light text-black cursor-pointer"> <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg></span> 
                                {
                                    miniMenu && item?.id ? <MiniMenu postId={item?.id}/> : ""
                                }
                            </div> 
                            <div className="mt-4">
                                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-black hover:underline">{item.content.split("\n")[0] || ""}</Link> 
                                <p className="line-clamp-4 overflow-ellipsis mt-2 text-black/80 text-sm mb-4">{item?.content || ""}</p>
                            </div> 
                        
                            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: item?.id} }} className="text-black/70 transition-all duration-300 hover:underline text-sm " id={item?.id}>{item?.id ? "Read more ⟶" : null}</Link> 
                        </div>
                    )
                }) : ""
            }
        </div>
    )
}

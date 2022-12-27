"use client";

import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import AllPostsCard from '../../components/AllPostsCard/AllPosts';
import SearchAndResult from '../../components/SearchInput/SearchAndResult';
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default  function page() {
    // make the search part and if something on input then search and return the results
    const {token} = useSpacexProvider();
    let [posts, setPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: "",
        username: "",
    }]);
    let [reverse, setReverse] = useState(false);
    const router = useRouter();
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
   
    const makeRepliesReverse = () => posts = posts.reverse()
    
    return (
        <div className="md:w-[40%] w-full  mx-auto rounded-lg px-10 py-5 mt-10">
            <SearchAndResult />
            <div className="mt-10" onClick={makeRepliesReverse}>
                <p className="flex items-center gap-x-1 hover:cursor-pointer group relative text-xs p-3 bg-white rounded-full w-fit" onClick={() => setReverse(!reverse)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>                      
                </p>
            </div>

            {
                posts ? posts.map( item => 
                <AllPostsCard
                    id={item?.id} 
                    key={item?.date} 
                    content={item?.content}
                    title={item?.content.split("\n")[0]} 
                    date={item?.date}
                    username={item?.poster} 
                />
                ): null
            }
        </div>
    )
}

"use client";

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation';

import UserCard from '../../components/SinglePostComps/UserCard';

import PostIneraction from '../../components/SinglePostComps/PostIneraction';

import PostContent from '../../components/PostContent/PostContent';
import RecentPosts from '../../components/PostContent/RecentPosts';
    
export default function page() {
    
    const postId = useSearchParams().get("post");
    
    return (
        <>
            <div className="w-[100%] mx-auto  mt-10 py-4
                flex flex-row justify-center relative">
                <PostIneraction />
                <div className="w-[70%] shadow-sm mx-2 rounded-lg h-fit pb-4 blogText shadow-current">
                    <UserCard postId={postId}/>
                    
                    {/* so now for showing the real post content
                    to components one for the image and one for the content of the 
                    page 
                    */}
                    
                    
                    <PostContent postId={postId}/>
                </div>
                <div className="w-[25%] relative shadow-sm mr-3 rounded-lg h-fit shadow-current">
                    <RecentPosts postId={postId}/>
                </div>
            </div>
        </>
    )
}

/*
    make a loader compoenent work
    just work on it Ali.
    front-end is depressing but you should make the loader component
*/
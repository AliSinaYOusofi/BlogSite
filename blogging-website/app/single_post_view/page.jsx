"use client";

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation';

import UserCard from '../../components/SinglePostComps/UserCard';

import PostIneraction from '../../components/SinglePostComps/PostIneraction';

import PostContent from '../../components/PostContent/PostContent';
import SameUserPosts from '../../components/PostContent/SameUserPosts';
    
export default function page() {
    
    const postId = useSearchParams().get("post");
    
    return (
        <>
            <div className="w-[100%] mx-auto  mt-10 py-4
                flex flex-row justify-center relative">
                <PostIneraction />
                <div className="w-[70%] bg-[#1F2937] mx-2 rounded-lg h-fit">
                    <UserCard postId={postId}/>
                    
                    {/* so now for showing the real post content
                    to components one for the image and one for the content of the 
                    page 
                    */}
                    
                    
                    <PostContent postId={postId}/>
                </div>
                <div className="w-[25%] relative bg-[#1F2937] mr-3 rounded-lg h-fit">
                    <SameUserPosts postId={postId}/>
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
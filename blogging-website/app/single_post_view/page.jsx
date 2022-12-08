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
                flex flex-row justify-center relative bg-[#d1d3ce]">
                <PostIneraction />
                <div className="w-[70%] h-fit pb-4 blogText shadow-current">
                    <UserCard postId={postId}/>
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
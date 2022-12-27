"use client";

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

import UserCard from '../../components/SinglePostComps/UserCard';

import PostIneraction from '../../components/SinglePostComps/PostIneraction';

import PostContent from '../../components/PostContent/PostContent';
import RecentPosts from '../../components/PostContent/RecentPosts';
import CommentSection from '../../components/Comments/CommentSection';
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';
    
export default function page() {
    
    const postId = useSearchParams().get("post");

    return (
        <>
            <div className="w-[100%] mx-auto  mt-10 py-4
                flex md:flex-row flex-col justify-center relative overflow-hidden">
                <PostIneraction postId={postId}/>
                <div className="md:w-[70%] w-full h-fit pb-4 overflow-x-hidden blogText shadow-current bg-[whitesmoke] rounded-lg">
                    <UserCard postId={postId}/>
                    <PostContent postId={postId}/>
                    <hr className="mt-10"/>
                    <h1 className="text-3xl ml-20 mt-10 text-black font-extrabold tracking-wide"> Comments</h1>
                    <CommentSection postId={postId}/>
                </div>
                <div className="md:w-[25%] w-full relative md:mr-3 rounded-md h-fit">
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
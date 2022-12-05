"use client";
import React, { useEffect, useState } from 'react'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import { useSpacexProvider } from '../../context/appContext'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import UserCard from '../../components/SinglePostComps/UserCard';
import PostImages from '../../components/SinglePostComps/PostImages';
import PostText from '../../components/SinglePostComps/PostText';
import PostIneraction from '../../components/SinglePostComps/PostIneraction';
import PosterCard from '../../components/SinglePostComps/PosterCard';

export default function Layout() {

    const [posts, setPosts] = useState([{
        content: ""
    }]);
    // what should the laout be like: sidebar for navigation in the middle show the
    // post itself and in the right side show other posts
    const {} = useSpacexProvider();
    // nicely done
    const postId = useSearchParams().get("post");

    useEffect( () => {
        const getPostGivenId = async () => {
            try {
                const response = await axios.get("/api/get_single_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.log(error, 'error! while getting post using id');    
            }
        }
        getPostGivenId();
    });

    // so i will make 3 components one the parent image and text
    // i will check if its' a text then i will pass data to the text
    // otherwise i will pass it to the image component.
    // thats the solution for now.
    return (
        <>
            <UserNavbar />
            <div className="w-[100%] mx-auto bg-gray-800 mt-10 py-4
            flex flex-row justify-center relative">
                
                <PostIneraction />
                <div className="w-[80%]">
                    <UserCard postDate={posts ? posts[0]?.date : "NA"}/>
                    {/* so now for showing the real post content
                    to components one for the image and one for the content of the 
                    page */}
                    <h1 class="mb-4 ml-6 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">{posts && posts[0]?.content ? posts[0]?.content.split("\n")[0] : ""}</h1>
                    
                    {
                        posts[0].content.split("\n").map( line => line.startsWith("![]") ? <PostImages postImageUrl={line} /> : <PostText text={line}/>)
                    }
                </div>
                <div className="w-[15%]">
                    <PosterCard />
                </div>
            </div>
        </>
    ) // testing the component with an image
}

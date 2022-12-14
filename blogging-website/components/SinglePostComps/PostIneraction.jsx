"use client";

import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpacexProvider } from '../../context/appContext';
import SocialIcons from '../ShareIcons/SocialIcons';

export default function PostIneraction({postId}) {

    const [dots, setDots] = useState(false); // the dot svg
    const [likes, setLikes] = useState(false);
    const [postLikes, setPostLikes] = useState(0);
    const[updateLikes, setUpdateLikes] = useState(false);
    // for nunmber of people saved to their accounts
    const [countSaved, setCountSaved] = useState(0);
    // for saving to account a post
    const {token} = useSpacexProvider();
    // should i add the comments count or not
    const [commentCount, setCommentCount] = useState(0);
    // saving icon change
    const [save, setSave] = useState(false);
    // how to handle the
    const likesRef = useRef(null);
    // first the schema for the post must change and 
    // likes should be added to the schema

    // now is should increment the likes when pressed and comment section
    // will be later.

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("link copied");
    };
    
    const handleLike = async () => {
        // how to handle likes
        //  1: make backgroud red
        //  2: wait for some seconds before sending to back-end the like addition with id of post
        //  3: that might be it
        if (likesRef.current && likesRef.current.style.backgroundColor === "red") {
            likesRef.current.style.backgroundColor = "white"
            setLikes(!likes);
        } else {
            likesRef.current.style.backgroundColor = "red"
            setLikes(!likes);
        }
        
        // liking the post given the postID
        // how to like is done
        // but how to unlike is another way, another bug.
        try {
            await axios.get("/api/update_post_likes", {
                params: {
                    postId,
                    token
                }
            });
            // no more toast messages i will replace it with self-made toast messages
            // since react-toast is not good for pro
            
        }catch(error) { console.log("Error! updating posts_likes", error);}
        setUpdateLikes(!updateLikes);
    }
    
    useEffect( () => {
        const getPostLikes = async () => {
            try {
                const response = await axios.get("/api/get_post_likes", {
                    params: {
                        postId,
                        token
                    }
                });
                setPostLikes(response.data.likes);
                if (response.data.userLoves)  likesRef.current.style.backgroundColor = "red";
            }catch(error) { console.log("Error! liking an image", error);}
        }
        getPostLikes();
    }, [updateLikes, postId]);

    useEffect( () => {
        const getCommentCounts = async() => {
            try {
                const response = await axios.get("/api/get_comment_count", {
                    params: {
                        postId
                    }
                });
                setCommentCount(response.data.commentCount);
            }catch(error) { console.log("Error! liking an image", error);}
        }

        const getSavedToAccountsCount = async() => {
            try {
                const response = await axios.get("/api/get_saved_count", {
                    params: {
                        postId
                    }
                });
                setCountSaved(response.data.savedToAccounts);
            }catch(error) { console.log("Error! liking an image", error);}
        }
        getCommentCounts();
        getSavedToAccountsCount();
    }, [save, postId]);

    // now saving the post to the user account. just make an array of comments
    const savePostToAccount = async () => {
        
        setSave(prev => !prev);

        try {
            const response = await axios.get("/api/save_post_to_account", {
                params: {
                    postId,
                    token,
                    saved: save ? 1 : 0
                }
            });
            console.log(response.data);
        }catch(error) { console.log("Error! liking an image", error);}

        setTimeout(() => setSave(prev => !prev), 2000);
    }

    const moveToCommentSection = () => document.getElementById("comment").scrollIntoView({behavior: "smooth"})
    return (
        <div className="w-[5%] text-white absolute top-[10rem] flex flex-col items-center justify-start
         gap-y-10 md:sticky md:top-0  h-full mt-10 md:ml-0 ml-4 z-[999]">
            
            <div onClick={handleLike} className="flex flex-col items-center ">
                <div ref={likesRef} className="mt-24 w-fit cursor-pointer bg-white text-black rounded-full p-3 transition-all duration-300 hover:-translate-y-[1px] shadow-current shadow-sm">
                    <svg  className="md:w-6 md:h-6 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
                <p className="mx-auto text-black">{postLikes}</p>
            </div>

            <div className="flex flex-col items-center " onClick={moveToCommentSection}>
                <div className="w-fit cursor-pointer bg-white text-black rounded-full p-3 transition-all duration-300 hover:-translate-y-[1px] shadow-current shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                </div>
                <p className="mx-auto text-black">{commentCount}</p>
            </div>
            
           
            <div className="flex flex-col items-center ">
                <div className="cursor-pointer bg-white text-black rounded-full p-3 transition-all duration-300 hover:-translate-y-[1px] shadow-current shadow-sm" onClick={savePostToAccount}>
                    {
                        !save
                        ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-4 w-4 transition-all duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                
                            </svg>
                        :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-4 w-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                      
                    }
                </div>
                <p className="mx-auto text-black"> {countSaved}</p>
            </div>
            
            <div onClick={copyToClipboard} className="cursor-pointer bg-white text-black rounded-full p-3 transition-all duration-300 hover:-translate-y-[1px] shadow-current shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
            </div>
            
            <div onClick={() => setDots(!dots)} className="cursor-pointer bg-white text-black rounded-full p-3 transition-all duration-300 hover:-translate-y-[1px] shadow-current shadow-sm">
                <svg className="md:w-6 md:h-6 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </div>
            {
                dots ? <SocialIcons /> : null
            }
            <ToastContainer
                position='bottom-left'
                autoClose={"1000"}
                newestOnTop
                pauseOnHover
                theme="light"
                draggable={false}
                closeOnClick={true}
            />
        </div>
    );
}

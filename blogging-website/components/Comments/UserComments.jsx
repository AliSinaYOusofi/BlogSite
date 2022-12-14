import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSpacexProvider } from '../../context/appContext';
import DisplayReplay from './DisplayReplay';
import ReplayComment from './ReplayComment';

export default function UserComments({postId, profileUrl, username, date, data, commentId, rep}) {
    
    const [commentLikes, setCommentLikes] = useState(0);
    const [hearted, setHearted] = useState(false);
    const [updateLoves, setUpdateLoves] = useState(false);
    
    const {token} = useSpacexProvider();
    
    const [reply, setReply] = useState(false); // for showing reply part 
    const [reverse, setReverse] = useState(true);
    const [eye, setEye] = useState(false);

    const likesRef = useRef(null);

   

    // how should be the reply of the comment. the reply part should be shown when
    // the reply button is clicked. and the logic for adding it, the function will
    // take care of the rest so it should have the same format excpet the reply
    // part

    const handleReply = () => { setReply(!reply); } // display the reply part

    // the remainging part is the liking: count of likes

    useEffect( () => {
        const makeRepliesReverse = () => {
            if (rep)
                rep = rep.reverse();
        }
        makeRepliesReverse();
    }, [reverse]);

    const likeAComment = async () => {
        setHearted(!hearted)
        
        // take the id of the comment and send it to back-end
    
        try {
            const response = await axios.get("/api/like_a_comment", {
                params: {
                    commentId,
                    token
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error, 'while getting likes for a comment');
        }

        setUpdateLoves(!updateLoves)
    }

    // useEffecti() for taking the likes

    useEffect( () => {
        const getCommentLikes = async () => {
            try {
                const response = await axios.get("/api/get_comment_likes", {
                    params: {
                        commentId,
                        token
                    }
                });
                setCommentLikes(response.data.loves);
                setHearted(response.data.userLoves);

            }catch(error) { console.log("Error! liking an image", error);}
        }
        getCommentLikes();
    }, [postId, updateLoves]);

    // how to rerun the useEffect() any deps already

    return (
        <>
        <div className=" h-fit " id={commentId}>
            
            <div className="flex flex-col items-start justify-between mt-4 w-fit py-3 rounded-lg px-4">
                <div className="flex items-center">
                    <img src={profileUrl || "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                    <span className="font-bold text-black/80">{username || ""}</span>
                    <span className="ml-3 font-bold text-black/80">{date ? date.split("T")[0] : ""}</span>
                </div>
                <div className="mt-2 ml-5 rounded-lg">
                    <p>
                        {data}
                    </p>
                    
                    <div className="flex items-start justif-start mt-2 gap-x-3">
                        
                        <span className="flex items-center gap-x-1 hover:cursor-pointer text-xs " onClick={likeAComment}>
                            {
                                !hearted
                                ?
                                <svg ref={likesRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>  
                            }
                            {commentLikes} Likes
                        </span>
                        
                        <span className="flex items-center gap-x-1 hover:cursor-pointer text-xs" onClick={handleReply}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            Reply
                        </span>
                        {
                            rep ? (
                                rep.length >= 2 ?
                                <span className="flex items-center gap-x-1 hover:cursor-pointer group relative text-xs" onClick={() => setReverse(!reverse)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                    Sort
                                    
                                </span>
                                : ""
                            )
                        : ""
                        }
                        <span onClick={() => setEye(!eye)} className="cursor-pointer flex-row items-center flex gap-x-1 text-xs">
                            {
                                eye 
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            }
                            Show/Hide
                        </span>
                        
                    </div>
                </div>
            </div>

            {
                reply  ? <div> <DisplayReplay key={commentId} postId={postId} commentId={commentId}/>  </div> : ""
            }
            
        </div>
        
            <div>
                {
                    eye ? (

                        rep ? rep.map(item => <ReplayComment reverse={reverse} username={item?.username} key={item?.replyId} data={item?.data} date={item?.date} profileUrl={item?.profileUrl} repId={item?.replyId}/>): ""
                    )
                    : ""
                }
            </div>

        
        </>
    )
}

// a way to hide and unhied the replies to the respective comment
// how to add that new feature:
// ?

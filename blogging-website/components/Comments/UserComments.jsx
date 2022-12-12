import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
import DisplayReplay from './DisplayReplay';
import ReplayComment from './ReplayComment';

export default function UserComments({postId, profileUrl, username, date, data, commentId, rep}) {
    
    const [commentLikes, setCommentLikes] = useState(0);
    const [reply, setReply] = useState(false); // for showing reply part 
    const [reverse, setReverse] = useState(true);

    const handleLikes = () => {
        // like the post using the post id or like the
        // reply of the comment;
    }

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
    }, [reverse])

    return (
        <>
        <div className=" h-fit " id={commentId}>
            
            <div className="flex flex-col items-start justify-between mt-4 w-fit py-3 rounded-lg px-4">
                <div className="flex items-center">
                    <img src={profileUrl || "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                    <span className="font-bold text-black/80">{username || "username"}</span>
                    <span className="ml-3 font-bold text-black/80">{date ? date.split("T")[0] : "20xx-xx-xx"}</span>
                </div>
                <div className="mt-2 ml-5 rounded-lg">
                    <p>
                        {data}
                    </p>
                    
                    <div className="flex items-start justif-start mt-2 gap-x-3">
                        
                        <span className="flex items-center gap-x-1 hover:cursor-pointer" onClick={handleLikes}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            {commentLikes} Likes
                        </span>
                        
                        <span className="flex items-center gap-x-1 hover:cursor-pointer" onClick={handleReply}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            Reply
                        </span>
                        {
                            rep ? (
                                rep.length >= 2 ?
                                <span className="flex items-center gap-x-1 hover:cursor-pointer group relative" onClick={() => setReverse(!reverse)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                    Sort
                                    
                                </span>
                                : ""
                            )
                        : ""
                        }
                    </div>
                </div>
            </div>

            {
                reply ? <div> <DisplayReplay key={commentId} postId={postId} commentId={commentId}/>  </div> : ""
            }
            
        </div>
        {
            rep ? rep.map(item => <ReplayComment reverse={reverse} username={item?.username} key={item?.replyId} data={item?.data} date={item?.date} profileUrl={item?.profileUrl} repId={item?.replyId}/>): ""
        }
        </>
    )
}

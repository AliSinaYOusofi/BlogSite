import React, { useRef, useState } from 'react'

export default function ReplayComment({ profileUrl, username, date, data, likes, repId}) {
    
    // console.log(profileUrl, username, date, data, likes);
    const [commentReplyLikes, setCommentReplyLikes] = useState(0);
    const [replyHearted, setReplyHearted] = useState(false);
    const [updateLoves, setUpdateLoves] = useState(false);
    const likesRef = useRef(null);

    useEffect( () => {
        const getReplyCommentsLikes = async () => {
            try {
                const response = await axios.get("/api/get_comment_likes", {
                    params: {
                        commentId,
                        token
                    }
                });
                setCommentReplyLikes(response.data.loves);
                setHearted(response.data.userLoves);

            }catch(error) { console.log("Error! liking an image", error);}
        }
        getReplyCommentsLikes();
    }, [postId, updateLoves]);
 
    const likeAReplyComment = async () => {
        setReplyHearted(!replyHearted);

        try {
            const response = await axios.get("/api/like_a_reply_comment", {
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
    return (
        <div className="ml-10 flex flex-col items-start justify-between mt-4 w-fit py-3 rounded-lg px-4 transition-all duration-[10000]" id={repId}>
            <div className="flex items-center">
                <img src={profileUrl || "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                <span className="font-bold text-black/80">{username || "username"}</span>
                <span className="ml-3 font-bold text-black/80">{date ? date.split("T")[0]: "20xx-xx-xx"}</span>
            </div>
            <div className="mt-2 ml-5 rounded-lg">
                <p>
                   {data}
                </p>
                
                <div className="flex items-start justif-start mt-2 gap-x-3">
                    
                    <span className="flex items-center gap-x-1 hover:cursor-pointer text-xs " onClick={likeAReplyComment}>
                        {
                            !replyHearted
                            ?
                            <svg ref={likesRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>  
                        }
                        {commentReplyLikes} Likes
                    </span>
                </div>
            </div>
        </div>
    )
}

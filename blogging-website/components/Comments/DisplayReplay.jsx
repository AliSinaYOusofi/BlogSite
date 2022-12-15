import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useSpacexProvider } from '../../context/appContext';


export default function DisplayReplay({postId, commentId}) {
    
    const {token, setRefresh} = useSpacexProvider();
    const [ comment, setComment ] = useState('');
    const [successIcon, setSuccessIcon] = useState(true);
    

    const submitComment = async () => {
        if (comment.length < 1) return toast.error("can't post an empty comment", {pauseOnHover: true});

        try {
            const response = await axios.post("/api/post_reply", {
                reply: comment,
                token,
                postId,
                commentId
            });
            if (response.data.message === "saved") {
                setTimeout( () => setSuccessIcon(!successIcon), 2000);
            }
            setRefresh("refreshing" + Math.random() * 100)
        } catch (error) {
            console.log("Error! posting comment: %s", error);
            toast.error("failed to post comment");
        }
        
    }
    return (
        <div className="mt-2 w-[80%] mx-auto transition-all duration-300 flex flex-col items-start justify-start
            gap-y-4 py-3">

            <textarea id="message" 
                onChange={(e) => setComment(e.target.value)} 
                rows="4" className="bg-neutral-100 border-none outline-none p-2.5 w-full text-xl text-gray-900 rounded-md" 
                placeholder="Reply ..." >
            </textarea>
                    
            <button onClick={submitComment} className="bg-neutral-100 px-6 py-3  hover:text-white hover:shadow-[inset_13rem_0_0_0] rounded-md hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]
            flex items-center justify-center">
                Reply
                {
                    successIcon
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    :
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                }
            </button>
        </div>
    )
}

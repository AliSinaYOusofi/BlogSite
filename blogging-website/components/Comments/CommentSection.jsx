import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSpacexProvider } from '../../context/appContext';


import UserComments from './UserComments';


export default function CommentSection({postId}) {

    const [ comment, setComment ] = useState('');
    const [successIcon, setSuccessIcon] = useState(true);

    const [ postedComments, setPostedComments ] = useState([{
        // what we need from this req who: [profile username posted comment data and date]
        username: "", profileUrl: "", data: "", date: "", commentId: "", reply: [{}]
    }]);

    const {token, refresh} = useSpacexProvider();
    // so for the token as well need it

    // first i must reset the postSchema and posts and other things
    // add likes and comments and more
    // so the schema should be reset before moving


    // and before making this compo make sure you have the functionlity as you expecteed
    // like commnet: whow commented their photo username and more
    // date of comment. can you reply to a comment or not if yese make sure you think of that as well
    // and for the likes store who liked the post and the date username nad other data which might be usefull


    // 

    const submitComment = async () => {
        if (comment.length < 1) return toast.error("can't post an empty comment", {pauseOnHover: true});

        try {
            const response = await axios.post("/api/post_comment", {
                comment,
                token,
                postId
            });

            if (response.data.message === "saved") {
                setTimeout( () => setSuccessIcon(!successIcon), 2000);
            } else toast.error("failed to comment! try again")
        } catch (error) {
            console.log("Error! posting comment: %s", error);
            toast.error("failed to post comment");
        }
    }

    // now making a get req for the get_comments and display the comments
    // with that specific post using the postId

    useEffect( () => {
        const getComments = async () => {

            try {
                const response = await axios.get("/api/get_user_comments", {
                    params: {
                        postId   
                    }   
                });

                if (response.data.message !== "no comment on this post") {
                    setPostedComments(response.data.comments);
                } else {
                    setPostedComments([{}]);
                }
            } catch (error) {
                console.log("Error! Failed to get Comments: %s", error);
            }
        }
        getComments();
    }, [postId, refresh]);
    
    return (
        <>
            <div className="mt-10 w-[80%] mx-auto bg-inherit flex flex-col items-start justify-start
            gap-y-4 relative">
               
                <textarea id="message" 
                    onChange={(e) => setComment(e.target.value)} 
                    rows="4" className="bg-neutral-200 border-none outline-none p-2.5 w-full text-xl text-gray-900 rounded-md" 
                    placeholder="your comment..." >
                </textarea>
                        
                <button onClick={submitComment} className="bg-neutral-200 px-6 py-3  hover:text-white hover:shadow-[inset_13rem_0_0_0] rounded-md hover:shadow-blue-400 duration-[400ms,700ms] transition-[color,box-shadow]
                flex items-center justify-center relative">
                    Comment
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
            <div className="bg-neutral-50 relative shadow-black/20 shadow-sm rounded-lg mt-10 w-[80%] mx-auto ">
                {
                    Object.keys(postedComments[0]).length ?  postedComments.map(item => {
                        return (
                            <UserComments
                                key={item?.commentId}
                                commentId={item?.commentId}
                                postId={postId} data={item?.data}
                                date={item?.date} profileUrl={item?.profileUrl}
                                username={item?.username}
                                rep={item?.reply}
                            />
                        )
                    }): ""
                }
            
            </div>
        </>
    );
}


// where to show the replies of the comments.
// make a new one or just make use of this compoenent
// i think make another component and pass data as props to it.
// and the other comp just shows the data => done


// now how to disply the data in the order they are sent
import React from 'react'
import { useSpacexProvider } from '../../context/appContext';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ViewUserCard() {
    
    const [followed, setFollowed] = useState(0);
    const [clickedFollow, setClickedFollow] = useState(false);

    const {viewUserData, token} = useSpacexProvider();
    const email = useSearchParams().get("email");

    // TODO: add the follow functionality for every user and little message.
    const handleFollowing = async () => {

        try {
            await axios.post("/api/follow_user", { 
                email,
                token
            });
            setClickedFollow(!clickedFollow);            
        }catch(error) { console.log("Error! updating posts_likes", error);}
    }

    useEffect( () => {
        const isFollowing = async () => {
            const response = await axios.get("/api/is_following", {
                params: {
                    email,
                    token
                }
            });
            setFollowed(response.data.message);
        }
        isFollowing();
    }, [clickedFollow]);

    return (
        <div className="w-full mt-14 ml-10 max-w-sm bg-[#F5F5F5] border-gray-200 rounded-lg shadow-md">
           
            <div className="flex flex-col items-center pb-4 pt-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={ viewUserData ? viewUserData[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="profile"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{viewUserData ? viewUserData[0]?.username : ""}</h5>
                <span className="text-sm text-gray-800">{viewUserData ? viewUserData[0]?.title : ""}</span>
                <h5 className="text-sm px-3 mt-3 text-gray-800">{viewUserData ? viewUserData[0]?.bio : ""}</h5>
                <div className="flex mt-4 space-x-3 md:mt-6 w-full items-center px-10">
                    <button onClick={handleFollowing} type="button" href="#" className="flex justify-center rounded-md items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-400 w-full">{followed ? "Following" : "Follow"}</button>  
                </div>
            </div>
        </div>
    )
}

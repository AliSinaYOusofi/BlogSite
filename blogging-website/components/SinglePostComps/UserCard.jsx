"use client";
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function UserCard({postId}) {

    // this component shoudl show the poster of the blog. not the user that is logged in.
    // so make a get req based on the id of the post and return prfile url and username and email and post date
    //
    const [profile, setProfile] = useState([{
        profileUrl: "",
        username: "",
        email: "",
        date: ""
    }]);


    useEffect( () => {
        const getPosterInfo = async () => {
            try {
                const response = await axios.get("/api/get_poster_info",{
                    params: {
                       postId
                    }
                });

            setProfile(response.data.posterData);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        getPosterInfo();
    }, [postId])

    return (
        <address className="flex items-center mb-6 not-italic rounded-md">
            <div className="inline-flex justify-center  p-4 items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img className="mr-4 w-16 h-16 rounded-full object-cover" src={profile ? profile[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="User profile picture" />
                <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{profile ? profile[0]?.username : "username"}</p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">{profile ? profile[0]?.email : "email@domain.com"}</p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022"> posted on {profile ? profile[0]?.date.split("T")[0] : "NA"}</time></p>
                </div>
            </div>
        </address>
    )
}

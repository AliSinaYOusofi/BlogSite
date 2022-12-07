"use client";

import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function PosterCard({postId}) { // from the postId we can get poster

    const [posterData, setPosterData] = useState([{
        username: "", bio: "", profileUrl: "", title: "",
        place: "", email: "", date: ""
    }])
    // thsese data are from the user that is cucrrently logged in.
    // so these data should be instead from the poster of the card
    
    // all these should be changed to a single array which includes
    // all the info about the current user logged in.

    // so i have the field id and poster which is the poster
    // so i will get the data of those fields and show them in the user card


    // should not user that think throughly before moving on to the next comp
    
    useEffect( () => {    
        const getPosterDetails = async () => {    
            // getting poster details given an id
            try {
                const response = await axios.get("/api/get_poster_info", {
                    params: {
                       postId
                    }
                });
                setPosterData(response.data.posterData);
            } catch (error) {
                console.log(error, 'getPosterDteails()')
            }
        }
        getPosterDetails();
    }, [postId]);


    
    return (
        <div className="rounded-lg text-white mt-10">
            <div className="flex flex-col justify-center items-center ">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={posterData ? posterData[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="profile image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{posterData ? posterData[0]?.username: "NA"}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{posterData ? posterData[0]?.title : "NA title"}</span>
                <p className="line-clamp-1 overflow-ellipsis"> {posterData ? posterData[0]?.title : "NA Bio"}</p>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">View</a>
                </div>
            </div>
        </div>

    )
}

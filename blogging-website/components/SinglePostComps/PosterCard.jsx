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
        <div className="rounded-lg text-white  bg-[#f5f5f5] ml-2 py-4 flex items-between justify-center">
            <div className="flex flex-row  justify-around gap-x-4  items-center">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={posterData ? posterData[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="profile image"/>
                <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xl font-medium text-gray-900 flex items-center justify-center">{posterData ? posterData[0]?.username: "NA"} <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-4 h-4">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        </span>
                    </p>
                    <p className="text-sm text-gray-800">{posterData ? posterData[0]?.title : "NA title"}</p>
                </div>
            </div>
        </div>

    )
}

import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSpacexProvider } from '../../context/appContext';
import axios from 'axios';

export default function UserNavbar() {

    const [loggedInData, setLoggedInData] = useState([{
        inUsername: "",
        inEmail : "",
        inProfile: ""
    }]);
    // todo: 1: get the token
    // send to to backend
    // the backend will send all posts a user posted 
    // so just take the data,
    // map through the data and display them
    // use some key so that when clicked show the details of that user only.

    // show the username email and picture of the logged in user
    // passing them from the layout page.

    const {token} = useSpacexProvider();

    // make a req using jwt token
    // and decode it and send it back to here and show it

    useEffect( () => {
        const getProfile = async () => {
            try {
                const response = await axios.get("/api/get_logged_in_user",{
                    params: {
                       token
                    }
                });
                setLoggedInData(response.data.logged);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        getProfile();
    }, [])
    
    return (
        
        <nav className="sticky top-3 z-[999]  px-2 sm:px-4 py-1  rounded-lg w-[92%] mx-auto  backdrop-blur-sm
        ">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-xl">
                <Link href="#" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="48" height="48"
                        className="transition-all duration-300 hover:animate-none animate-spin"
                        viewBox="0 0 48 48">
                        <path fill="#29b6f6" fillRule="evenodd" d="M24,4C12.96,4,4.01,12.954,4.01,24	c0,10.141,7.545,18.519,17.325,19.823v-4.03c0-1.136-0.716-2.158-1.793-2.519c-5.643-1.897-9.68-7.293-9.531-13.611	c0.181-7.692,6.444-13.74,14.133-13.662c7.662,0.078,13.849,6.316,13.849,14c0,0.72-0.056,1.44-0.164,2.151	c-1.713,11.291-16.412,17.637-16.492,17.672C22.208,43.939,23.097,44,24,44c11.04,0,19.99-8.954,19.99-20S35.04,4,24,4" clipRule="evenodd"></path>
                    </svg>
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Bloggy</span>
                </Link>
                <div className="flex items-center md:order-2 group relative">
                    
                    <img src={loggedInData ? loggedInData[0].inProfile : "https://stackdiary.com/140x100.png"} alt="profile image" className="h-10 object-cover w-10 rounded-full"/>
                    <div className="z-50 rounded-md hidden right-6 top-6 absolute group-hover:block  my-4 text-base list-none bg-[#FDF8F5]" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-300">{loggedInData ? loggedInData[0]?.inUsername : "username"}</span>
                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{loggedInData ? loggedInData[0]?.inEmail : "email"}</span>
                        </div>
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                            <li className="mr-2">
                                <Link href="#" className="inline-flex p-4 rounded-t-lg group transition-all duration-300 hover:translate-x-1">
                                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Profile
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href="#" className="inline-flex p-4 transition-all duration-300 hover:translate-x-1 rounded-t-lg  group" aria-current="page">
                                    <svg aria-hidden="true" className="mr-2 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Dashboard
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href="#" className="inline-flex p-4 rounded-t-lg group transition-all duration-300 hover:translate-x-1">
                                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>Settings
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href="#" className="inline-flex p-4 rounded-t-lg  group transition-all duration-300 hover:translate-x-1">
                                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Contacts
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href="#" className="inline-flex p-4 rounded-t-lg  group transition-all duration-300 hover:translate-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                Sing out
                                </Link>
                            </li>
                        
                        </ul>
                    </div>
                </div>
                
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 text-sm md:font-medium">
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-800 transition-all duration-300 hover:bg-gray-200  rounded-md" aria-current="page">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-800 transition-all duration-300 hover:bg-gray-200  rounded-md">About</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-800 transition-all duration-300 hover:bg-gray-200  rounded-md">Services</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-800 transition-all duration-300 hover:bg-gray-200  rounded-md">Pricing</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4  text-gray-800 transition-all duration-300 hover:bg-gray-200  rounded-md">Contact</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

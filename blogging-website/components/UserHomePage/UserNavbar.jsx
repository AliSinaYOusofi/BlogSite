import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSpacexProvider } from '../../context/appContext';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function UserNavbar() {

    const [loggedInData, setLoggedInData] = useState([{
        inUsername: "",
        inEmail : "",
        inProfile: ""
    }]);
    const router = useRouter();
    // todo: 1: get the token
    // send to to backend
    // the backend will send all posts a user posted 
    // so just take the data,
    // map through the data and display them
    // use some key so that when clicked show the details of that user only.

    // show the username email and picture of the logged in user
    // passing them from the layout page.

    const {token, setAccessToken} = useSpacexProvider();

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
                console.log(response.data)  
                setLoggedInData(response.data.logged);
            } catch (error) {
                console.log("failed to get logged in user: ", error);
            }
        }
        getProfile();
    }, [])
    
    const handleSignout = () => {
        setAccessToken("");
        router.push("/");
    }
    return (
        
        <nav className="sticky translate-x-2 top-3 z-[999] md:w-[35%] bg-white/40  px-2 sm:px-4 py-1  rounded-lg w-[92%] mx-auto  backdrop-blur-sm
        ">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-xl">
                <Link href="/" className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="48" height="48"
                       
                        viewBox="0 0 48 48">
                        <path fill="#29b6f6" fillRule="evenodd" d="M24,4C12.96,4,4.01,12.954,4.01,24	c0,10.141,7.545,18.519,17.325,19.823v-4.03c0-1.136-0.716-2.158-1.793-2.519c-5.643-1.897-9.68-7.293-9.531-13.611	c0.181-7.692,6.444-13.74,14.133-13.662c7.662,0.078,13.849,6.316,13.849,14c0,0.72-0.056,1.44-0.164,2.151	c-1.713,11.291-16.412,17.637-16.492,17.672C22.208,43.939,23.097,44,24,44c11.04,0,19.99-8.954,19.99-20S35.04,4,24,4" clipRule="evenodd"></path>
                    </svg>
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-black">Bloggy</span>
                </Link>
                <div className="flex items-center md:order-2 group relative">
            
                    <img sc={loggedInData ? loggedInData[0].inProfile : "https://stackdiary.com/140x100.png"} alt="" className="h-10 object-cover w-10 rounded-full shadow-current shadow-sm"/>
                        
                    <div className="z-50 rounded-md hidden right-6 top-6 absolute group-hover:block  my-4 text-base list-none bg-[#FDF8F5]" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-300">{loggedInData ? loggedInData[0]?.inUsername : "username"}</span>
                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{loggedInData ? loggedInData[0]?.inEmail : "email"}</span>
                        </div>
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                            <li className="mr-2">
                                <Link href="/user_home_page" className="inline-flex p-4 rounded-t-lg group transition-all duration-300 hover:translate-x-1">
                                    <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Profile
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href={{pathname: "/all_posts", query: {}}} className="inline-flex p-4 transition-all duration-300 hover:translate-x-1 rounded-t-lg  group" aria-current="page">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                    <span className="ml-1">Posts</span>
                                </Link>
                            </li>
                            <li className="mr-2">
                                <Link href={{pathname: "/make_post"}} className="inline-flex p-4 rounded-t-lg group transition-all duration-300 hover:translate-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                    </svg>
                                    <span className="ml-1">Write</span>
                                </Link>
                            </li>
                            
                            <li onClick={handleSignout} className="mr-2 flex cursor-pointer gap-x-1">
                                <span className="inline-flex p-4 rounded-t-lg  group transition-all duration-300 hover:translate-x-1 ml-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    <span className="ml-1">Signout</span>
                                </span>
                            </li>
                        
                        </ul>
                    </div>
                </div>
                
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                   
                </div>
            </div>
        </nav>
    )
}

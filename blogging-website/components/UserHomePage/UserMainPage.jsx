"use client";

import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSpacexProvider } from '../../context/appContext';
import ReRegister from '../UserFormReReg/ReRegister';
import UserImage from './UserImage';

export default function UserMainPage() {

    const {token} = useSpacexProvider();
    
    const [profile, setProfile] = useState([{
        email: "",
        username: "",
        place: "",
        visibilty: false,
        bio: "",
        university: "",
        title: "",
        profileUrl: ""
    }]);

    useEffect( () => {
        
        const getUserProfile = async () => {
            try {
                const profileResponse = await  axios.get("/api/my_profile", {
                    params: {
                        token
                    }
                });
                setProfile(await profileResponse.data.profileData);
            } catch(error) { console.log(error); }  
        }
        getUserProfile();
    }, []);

    // now show the posts that are created by the user aftter the profile section
    // solv then code

    const scrollToViewEditPage = () => document.getElementById("edit_page").scrollIntoView({behavior: 'smooth'});

    return (
        <>
        <main className="mt-[22rem] ">
            <section className="relative py-16">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-[#d1d3ce] w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center items-center mt-3 flex-col">
                                
                                <div className=" lg:w-[25%] w-[50%] px-4  flex justify-center">
                                    <UserImage profileUrl={ profile ? profile[0]?.profileUrl : ""}/>    
                                </div>

                                <div onClick={scrollToViewEditPage}  className="mt-3">
                                    <button type="button" className="text-white transition-all duration-300 hover:-translate-y-1 bg-[#29B6F6] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Edit Profile</button>
                                </div>

                            </div>
                            <div className="text-center mt-12">
                                
                                <h3 className="text-xl leading-normal mb-2 text-gray-900">
                                    Username: {profile ? profile[0]?.username : ""}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 ">

                                    <i className="mr-2 text-xl text-gray-900"></i>
                                        Location: {profile ? profile[0]?.place : ""}
                                </div>
                                <div className="mb-2 ">
                                    Title: <i className="fas fa-briefcase mr-2 text-lg text-gray-900"></i>{profile ? profile[0]?.title : ""}
                                </div>
                                <div className="mb-2 ">
                                    University: <i className="fas fa-university mr-2 text-lg text-gray-900"></i>{profile ? profile[0]?.university : ""}
                                </div>
                            </div>
                            <div  className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-gray-900">
                                        { profile ? profile[0]?.bio : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <section id="edit_page">
            <ReRegister />
        </section>
        </>
    );
}

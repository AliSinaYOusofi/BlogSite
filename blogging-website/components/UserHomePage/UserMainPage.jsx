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
                console.log(profileResponse);
                setProfile(await profileResponse.data.profileData);
            } catch(error) { console.log(error); }  
        }
        getUserProfile();
    }, [])

    return (
        // <!-- component -->
        <>
        <main className="mt-[22rem] ">
           
            <section className="relative py-16">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-[#1F2937] w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center items-center mt-3 flex-col">
                                
                                <div className=" lg:w-[25%] w-[50%] px-4  flex justify-center">
                                    <UserImage profileUrl={profile[0].profileUrl}/>    
                                </div>

                                <div className="w-full -mt-2">
                                    <div className="flex justify-center">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-white">22</span><span className="text-sm text-white">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-white">10</span><span className="text-sm text-white">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-white">89</span><span className="text-sm text-white">Comments</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <button type="button" className="text-white transition-all duration-300 hover:-translate-y-1 bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Profile</button>
                                </div>

                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                                {profile[0]?.username}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-white font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-white"></i>
                                    {profile[0]?.place}
                                </div>
                                <div className="mb-2 text-white mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-white"></i>{profile[0]?.title}
                                </div>
                                <div className="mb-2 text-white">
                                    <i className="fas fa-university mr-2 text-lg text-white"></i>{profile[0]?.university}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-white">
                                        {profile[0]?.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <ReRegister />
        </>
    );
}

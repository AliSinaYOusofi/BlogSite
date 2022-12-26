import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSpacexProvider } from '../../context/appContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';



export default function Followers() {

    const [following, setFollowing] = useState([]);
    const {token} = useSpacexProvider();
    const userEmail = useSearchParams().get("email");
    
    useEffect( () => {
        const isFollowing = async () => {
            const response = await axios.get("/api/get_following", {
                params: {
                    email: userEmail 
                }
            });
            console.log(response.data);
            if (response.data.message === "data")
                setFollowing(response.data?.following || []);
            else
                setFollowing([])
        }
        isFollowing();
    }, []);
    
    return (

        <div className="w-full  ml-10 mt-4 max-w-sm p-4 border-none outline-none bg-white rounded-lg shadow-md sm:p-8">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900">FOLLOWING {following?.length}</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-300">
                    {
                        following.map(item => (
                            <li key={""} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-12 h-12 rounded-full object-cover" src={`${item?.profileImageUrl}`} alt="avatar" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {item?.profileUsername}
                                        </p>
                                        <Link href={{ pathname:"/view_user", query: {"email": item?.profileEmail}}} className="text-sm text-gray-700 truncate">
                                            {item?.profileEmail}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

import Link from 'next/link'
import React from 'react'

export default function UsersList({profileImageUrl, profileUsername, profileEmail, profileJoinDate}) {

    return (
        <div className="mt-4 w-full px-4 border-none outline-none bg-white rounded-lg shadow-md flex justify-between items-center">
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-300">
                    <li key={""} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img 
                                    className="w-12 h-12 rounded-full object-cover" 
                                    src={profileImageUrl || "https://stackdiary.com/140x100.png"} 
                                    alt="avatar" 
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {profileUsername}
                                </p>
                                <Link 
                                    href={{ pathname:"/view_user", query: {"email": profileEmail}}} 
                                    className="text-sm text-gray-700 truncate">
                                    {profileEmail}
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <span>{profileJoinDate ?"joined " + profileJoinDate?.split("T")[0] : ""}</span>
            </div>
        </div>
    )
}

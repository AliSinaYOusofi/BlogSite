import React from 'react'
import { useSpacexProvider } from '../../context/appContext';

export default function UserCard({postDate}) {

    const {dataEmail, dataUsername, dataProfileUrl} = useSpacexProvider();
    return (
        <address className="flex items-center mb-6 not-italic rounded-md">
            <div className="inline-flex justify-center  p-4 items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img className="mr-4 w-16 h-16 rounded-full object-cover" src={dataProfileUrl || "https://flowbite.com/docs/images/people/profile-picture-2.jpg"} alt="User profile picture" />
                <div>
                    <p   className="text-xl font-bold text-gray-900 dark:text-white">{dataUsername || "username"}</p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">{dataEmail || "email@domain.com"}</p>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022"> posted on {postDate ? postDate.split("T")[0] : "NA"}</time></p>
                </div>
            </div>
    </address>
    )
}

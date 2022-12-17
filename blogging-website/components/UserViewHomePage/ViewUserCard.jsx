import React from 'react'
import { useSpacexProvider } from '../../context/appContext';

export default function ViewUserCard() {
    
    const {viewUserData} = useSpacexProvider();

    // TODO: add the follow functionality for every user and little message.
    return (
        <div className="w-full stcicky top-0 mt-14 ml-10 max-w-sm bg-[#F5F5F5] border-gray-200 rounded-lg shadow-md">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                </button>
            </div>
            <div className="flex flex-col items-center pb-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={ viewUserData ? viewUserData[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="profile"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{viewUserData ? viewUserData[0]?.username : ""}</h5>
                <span className="text-sm text-gray-800">{viewUserData ? viewUserData[0]?.title : ""}</span>
                <h5 className="text-sm text-gray-800">{viewUserData ? viewUserData[0]?.bio : ""}</h5>
                <div className="flex mt-4 space-x-3 md:mt-6 w-full items-center px-10">
                    <button type="button" href="#" className="flex justify-center rounded-md items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-400 w-full">Follow</button>  
                </div>
            </div>
        </div>

    )
}

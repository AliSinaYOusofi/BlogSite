import React from 'react'
import { useSpacexProvider } from '../../context/appContext';

export default function PosterCard() {
    
    const {dataEmail, dataUsername, dataProfileUrl, dataTitle, dataBio} = useSpacexProvider();
    // all these should be changed to a single array which includes
    // all the info about the current user logged in.

    // should not user that think throughly before moving on to the next comp
    return (
        <div className="rounded-lg text-white">
            <div className="flex flex-col justify-center items-center pb-10 ">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={dataProfileUrl || ""} alt="profile image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dataUsername || "NA"}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{dataTitle || "NA title"}</span>
                <p className="line-clamp-1 overflow-ellipsis"> {dataBio || "NA Bio"}</p>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">View</a>
                </div>
            </div>
        </div>

    )
}

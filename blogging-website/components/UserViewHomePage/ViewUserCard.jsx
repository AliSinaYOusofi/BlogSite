import React from 'react'
import { useSpacexProvider } from '../../context/appContext';

export default function ViewUserCard() {
    
    const {viewUserData} = useSpacexProvider();

    return (
        <div className="w-full stcicky top-0 mt-12 ml-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex justify-end px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </button>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover" src={ viewUserData ? viewUserData[0]?.profileUrl : "https://stackdiary.com/140x100.png"} alt="profile"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">{viewUserData ? viewUserData[0]?.username : ""}</h5>
                <span className="text-sm text-gray-800">{viewUserData ? viewUserData[0]?.title : ""}</span>
                <h5 className="text-sm text-gray-800">{viewUserData ? viewUserData[0]?.bio : ""}</h5>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                </div>
            </div>
        </div>

    )
}

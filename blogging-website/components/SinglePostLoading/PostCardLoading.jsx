import React from 'react'


export default function PostCardLoading() {
    return (
        <div className="mt-20 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            
            <div className="ml-10">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-14 mb-2.5"></div>
                <div className="h-2 mt-4 bg-gray-200 w-10 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 w-10 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 w-10 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
           
        </div>
    );
}

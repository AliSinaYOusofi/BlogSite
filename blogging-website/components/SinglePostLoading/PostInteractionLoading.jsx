import React from 'react'


export default function PostIneractionLoading() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-10 animate-pulse">
            
            <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
           
        </div>
    );
}

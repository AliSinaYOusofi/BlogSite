import React from 'react'

export default function SingleLoading() {
    return (
        <div role="status" className="flex flex-col items-start justify-start">
            <div className="w-full px-2">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-4"></div>
            </div>
        </div>
    );
}

import React from 'react'


export default function PostIneractionLoading() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-10 animate-pulse mt-24">
            <div className="h-10 p-2 bg-white rounded-full w-10 mb-4 animate-pulse"></div>
            <div className="h-10 bg-white rounded-full  w-10 mb-4 p-2"></div>
            <div className="h-10 bg-white rounded-full w-10 mb-4 p-2"></div>
            <div className="h-10 bg-white rounded-full w-10 mb-4 p-2"></div>
        </div>
    );
}

import React from 'react'

export default function SingleLoading() {
    return (
        <div className="mt-4 w-full bg-[#F5F5F5] rounded-lg py-4 px-2 animate-pulse">
            <div class="mb-4 h-1.5 w-44 px-2 rounded-full bg-gray-200"></div>
            <div class="mb-2.5 h-1.5 w-full px-2 rounded-full bg-gray-200"></div>
            <div class="mb-2.5 h-1.5 w-full rounded-full bg-gray-200 px-2"></div>
            <div class="mb-2.5 h-1.5 w-full rounded-full bg-gray-200 px-2"></div>
            <div class="mb-2.5 h-1 w-10 rounded-full bg-gray-200 px-2"></div>
        </div>
    );
}

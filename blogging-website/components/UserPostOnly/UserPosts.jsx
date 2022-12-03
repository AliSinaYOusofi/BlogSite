import Link from 'next/link'
import React from 'react'

export default function UserPosts() {
    return (
        <div className="max-w-2xl px-8 py-4 mx-auto  rounded-lg shadow-md bg-gray-800 mt-10">
            <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400">Jan 15, 2022</span> 
            </div> 
            <div className="mt-2">
                <Link href="https://stackdiary.com/" className="text-2xl font-bold text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">How to sanitiz array() in JS</Link> 
                <p className="mt-2 text-gray-600 dark:text-gray-300">Dui urna vehicula tincidunt pretium consequat luctus mi, platea fermentum conubia tempus ac orci. Pellentesque dictum malesuada cubilia faucibus dignissim mi nascetur senectus, augue ad libero efficitur dolor duis lobortis, non etiam sociosqu.</p>
            </div> 
            <div className="flex items-center justify-between mt-4">
                <Link href="#LinkToUserPost" className="text-blue-300 transition-all duration-300 hover:underline">Read more ⟶</Link> 
                <div className="flex items-center">
                    <img src="https://stackdiary.com/140x100.png" alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                    <Link href="#linkToUserProfile" className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">John Doe</Link>
                </div>
            </div>
        </div>
    )
}

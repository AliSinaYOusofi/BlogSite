import Link from 'next/link'
import React from 'react'

export default function UserPosts({content, title, username, profileUrl, date, id}) {
    
    // so when clicked on the Links we will go to the sing_post_view page
    // with passing the id as they query.

    // in the single_post_view page we get the id. search the database for that
    // id and view all the results in the single_post_view page.
    return (
        <div className="max-w-2xl px-8 py-4 mx-auto  rounded-lg shadow-md bg-gray-800 mt-10" key={id}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400">{date}</span> 
            </div> 
            <div className="mt-2">
                <Link href={{ pathname:"/single_post_view", query: id}} className="overflow-ellipsis line-clamp-1 text-2xl font-bold text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{title}</Link> 
                <p className="line-clamp-4 overflow-ellipsis mt-2 text-gray-600 dark:text-gray-300">{content}</p>
            </div> 
            <div className="flex items-center justify-between mt-4">
                <Link href={{ pathname:"/single_post_view", query: id}} className="text-blue-300 transition-all duration-300 hover:underline" id={id}>Read more ⟶</Link> 
                <div className="flex items-center">
                    <img src={profileUrl || "https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                    <span className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{username}</span>
                </div>
            </div>
        </div>
    )
}

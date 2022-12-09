import React from 'react'

export default function ReplayComment() {
    return (
        <div className="ml-5 flex flex-col items-start justify-between mt-4 w-fit py-3 rounded-lg px-4">
            <div className="flex items-center">
                <img src={"https://stackdiary.com/140x100.png"} alt="Author Photo" className=" object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
                <span className="font-bold text-black/80">username</span>
                <span className="ml-3 font-bold text-black/80">2022-10-2</span>
            </div>
            <div className="mt-2 ml-5 rounded-lg">
                <p>
                    A couple of things I didn’t know that I’ve picked up over the last year.

                    In some ways OpenAPI is a perfectly fine REST alternative
                    GraphQL is for larger complex projects with many moving parts, don’t add it to just any project
                    It works under the hood like a regular API and it’s mainly just an abstraction at the end of the day
                    JavaScript fetch is all you need to make a query, no libraries required from a client
                </p>
                
                <div className="flex items-start justif-start mt-2 gap-x-3">
                    
                    <span className="flex items-center gap-x-1 hover:cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        {3} Likes
                    </span>
                </div>
            </div>
        </div>
    )
}

"use client";

import { useRef, useEffect } from 'react'
import React from 'react'

export default function Success({message, timeoutInMs = 2000}) {

    let toastRef = useRef(null);

    

    useEffect( () => {
        
        const hideToastMessage = () => {
            if (toastRef.current) {
                if ( toastRef.current.style.display === "none") {
                    toastRef.current.style.display = "block";
                }
                else  toastRef.current.style.display = "none";
            }
        }
        
        setTimeout(hideToastMessage, timeoutInMs);
    }, []);

    return (
        <div ref={toastRef}  className="w-[20rem] transition-all duration-300 left-[0%];  text-black absolute  top-[3%] flex items-center p-4 space-x-4 max-w-xs text-gray-500 bg-[#1B1B1B] rounded-lg shadow-white/90 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-[red]`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
           <span className="text-white ml-10"> {message}</span>
        </div>
    )
}

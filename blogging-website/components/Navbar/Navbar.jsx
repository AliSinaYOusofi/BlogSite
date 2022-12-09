"use client"; // useing csr
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default  function Navbar() {
    
    const [dropdown, setDropdown] = useState(false);
    // for sticky position to work you must specify the bounds that
    // it should stick to. like: top-0;


    // adding box shadow when we react 150px from the top
    
    return ( 
        <nav className="sticky mx-auto top-0  px-2 sm:px-4 py-2.5" >
            <div className="container  flex flex-wrap items-center justify-between mx-auto backdrop-blur-sm p-2 rounded-md">
                <a href="" className="flex items-center gap-x-1">
                
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="48" height="48"
                    viewBox="0 0 48 48">
                    <path fill="#29b6f6" fill-rule="evenodd" d="M24,4C12.96,4,4.01,12.954,4.01,24	c0,10.141,7.545,18.519,17.325,19.823v-4.03c0-1.136-0.716-2.158-1.793-2.519c-5.643-1.897-9.68-7.293-9.531-13.611	c0.181-7.692,6.444-13.74,14.133-13.662c7.662,0.078,13.849,6.316,13.849,14c0,0.72-0.056,1.44-0.164,2.151	c-1.713,11.291-16.412,17.637-16.492,17.672C22.208,43.939,23.097,44,24,44c11.04,0,19.99-8.954,19.99-20S35.04,4,24,4" clip-rule="evenodd"></path>
                </svg>

                    <span className="self-center text-xl font-semibold whitespace-nowrap text-">Bloggy</span>
                </a>
                <div className="flex md:order-2">
                    <Link href="/signup">
                        <button type="button" className="text-white bg-[#29B6F6] font-medium rounded-md text-sm px-5 py-3 text-center mr-3 md:mr-0">Sign Up</button>
                    </Link>
                    <button onClick={() => setDropdown(previouse => ! previouse)} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="items-center  justify-between hidden  w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex divide-dotted flex-col p-4 mt-4  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className="">
                            <Link href="/login" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-gray-200  rounded-md" aria-current="page">Sign In</Link>
                        </li>
                        <li>
                            <a href="#" className="block text py-2 pl-3 pr-4 transition-all duration-300 hover:bg-gray-200  rounded-md">Our Story</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-gray-200  rounded-md">Write</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-gray-200  rounded-md">For Extra</a>
                        </li>
                    </ul>
                </div>
                {
                    dropdown ? <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col p-4 mt-4 text-black  rounded-lg bg-gray-300 md:flex-row gap-y-4">
                        <li className="">
                            <a href="#" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-white rounded-md " aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block text py-2 pl-3 pr-4 transition-all duration-300 hover:bg-white rounded-md ">About</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-white rounded-md ">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 transition-all duration-300 hover:bg-white rounded-md ">Contact</a>
                        </li>
                    </ul>
                </div>
                : ""
                }
            </div>
        </nav>
    );
}

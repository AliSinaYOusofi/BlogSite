import React from 'react'

export default function Footer() {
    
  return (
    
    <footer className="p-4 w-[95%] mt-14  mx-auto  bg-[#d1d3ce] rounded-lg md:flex md:items-center md:justify-between md:p-6 ">
        <span className="text-sm text-[#1D1C1D]">© 2022 <a href="https://flowbite.com/" className="hover:underline">MeStory™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-[#1D1C1D] sm:mt-0">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>

  )
}

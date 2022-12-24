"use client";

import React from 'react'
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewsLetter() {

    const [email, setEmail] = useState("");

    const showToast = (e) => {
        e.preventDefault();

        if (email.length)
            toast.success("you are a memeber");
        else
            toast.warn("provide an email");
    }
    return (
        <section className=" w-[95%] mx-auto mt-2 rounded-md">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md sm:text-center">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-black">Sign up for our newsletter</h2>
                    <p className="mx-auto mb-8 max-w-2xl font-light text-black md:mb-12 sm:text-xl ">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                    <form action="#">
                        <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                            <div className="relative w-full">
                                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-">Email address</label>
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} className="block p-3 pl-10 w-full" placeholder="Enter your email" type="email" id="email"  required autoComplete/>
                            </div>
                            <div className="ml-1">
                                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-black rounded-sm border cursor-pointer bg-white" onClick={showToast}>Subscribe</button>
                            </div>
                        </div>
                        <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data.</div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
  );
}

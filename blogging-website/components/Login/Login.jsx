"use client";

import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
// toast
import toast, {Toaster} from 'react-hot-toast';


export default function Login() {
    
    // creds
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // checking the creds.
    const handleLogin = async (e) => {
        e.preventDefault();

        let isFilled = password && email;

        if (!email) toast.error("provida an email");
        else if (!password) toast.error("provide a password");

        if (! isFilled) return;
        
        // we are good to make the rq

        try {
            const response = await axios.post("/api/check_creds", {email, password});

        } catch (error) { console.log(error); }
    }
    return (
        <div className="w-full mt-20 mx-auto max-w-sm p-4  border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 border-none outline-none dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-none outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 ">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
            </form>
            <Toaster/>
        </div>
  );
}

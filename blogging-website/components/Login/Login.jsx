"use client";

import axios from 'axios';
import Link from 'next/link'
import React, { useRef, useState } from 'react'
// changed from react-host-toast to react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';


export default function Login() {
    
    // creds
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();
    // toast to dismiss
    
    // our context provider
    const {setAccessToken} = useSpacexProvider();

    // for delaying 
    const handleLogin = async (e) => {
        
        toast.loading("checking your credentials");
        e.preventDefault();

        let isFilled = password && email;

        if (!email) toast.error("provida an email");
        else if (!password) toast.error("provide a password");

        if (! isFilled) return;
        
        try {
            
            const response = await axios.post("/api/auth/check_creds", {email, password});
            const {accessToken, message} = await response.data;
        
            setAccessToken(accessToken); // that's good. access token is set.
            toast.dismiss();
            
            if (message === "success") {
                router.push("/make_post"); // TODOif user has a post id then redirect to that post TODO
            }
            else if (message === "notyou" || message === null) toast.error("invalid credentials");
            else if (message === "unreged") toast.error("invalid credentials");
        
        } catch (error) { console.log(error, "here is the error"); }
    }
    return (
        <div className="w-full mt-20 mx-auto max-w-sm p-4 my-auto rounded-lg bg-[#d1d3ce] md:py-10">
            <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h5>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" text-gray-900 text-sm rounded-lg  block w-full p-2.5 border-none outline-none" placeholder="name@company.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Your password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="????????????????????????" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-none outline-none block w-full p-2.5" />
                </div>
                
                <button type="submit" className="w-full text-white bg-[#29B6F6] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <Link href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                </div>
            </form>
            <ToastContainer
                position='top-center'
                autoClose={"2000"}
                newestOnTop
                pauseOnHover
                theme="light"
                draggable={false}
                closeOnClick={true}
            />
        </div>
  );
}

"use client";

import Link from 'next/link';
import React, { useState } from 'react';
// validator funcs
import { emailValidator } from '../../functions/validators/emailValidator';
import { usernameValidator } from '../../functions/validators/usernameValidator';
import { passwordValidator } from '../../functions/validators/passwordValidator';
// our router to redirect to /signup with data as query
import {useRouter} from 'next/navigation';

// for toasts notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// sleep
import { sleep } from '../global/sleep';
import axios from 'axios';

export default function ReRegister() {

     // router
     const router = useRouter();
     // for controlled inputs
     const [email, setEmail] = useState("");
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     // for public or private chceckbox
     const [visibility, setVisibility] = useState(null);
 
     // for routing
     
     // our refs for our checkboxed
     let publicRef = React.useRef(null);
     let privateRef = React.useRef(null);
     
     const handleSubmit = async (e) => {
         toast.loading("saving your credentials");
         e.preventDefault(); // prevent the refresh behaviour
         
         let isValid = true;
         // validators are tested and they are working fine
         if (!emailValidator(email)) {
             toast.error("email is invalid", { duration: 2000,});
             isValid = false;
         }
         else if (!usernameValidator(username)) {
             toast.error("user name can't have spaces", {duration: 2000});
             isValid = false;
         }
         else if (!passwordValidator(password)) {
             toast.error("valid password example: 1 lowercase && 1 number && length > 6.", { duration: 2000,});
             isValid = false;
         }
         else if (visibility === null) {
             toast.error("Account visibility not selected.", {duration: 2000});
             isValid = false;
         }
 
         else if(password !== confirmPassword) {
             toast.error("passwords don't match", {
                 duration: 2000,
             });
         }
         
         // next: setup the api paths
         // inside the app folder
         if (! isValid) return;
 
         try {
             const response = await axios.post("/api/auth/save_creds", {
                 email,
                 username,
                 password,
                 visibility
             });
             const {message} = await response.data
             toast.dismiss();
 
             if (message === "created") {
                 
                 toast.success("you are now a member");
                 await sleep(1000);
                 router.push("/login");
             }
             else if (message === "duplicate") toast.error("email already registred.");
             else if(message === "server") toast.error("503 internal server error.");
         }catch(error) {
             console.log(error);
         }
    }
    
    function selectOnlyOneCheckbox(whichOne) {
        let visibiltyIsPublic = true;
        if (publicRef.current && privateRef.current) {
            if(whichOne === "public") {
                privateRef.current.checked = false;
                publicRef.current.checked = true;
            }
            else {
                privateRef.current.checked = !false;
                publicRef.current.checked = !true;
                visibiltyIsPublic = false;
            }
        }
        setVisibility(visibiltyIsPublic);
    }
    return (
        <>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
            </h1>
                
                <form className="flex md:flex-row flex-col flex-wrap justify-center items-center bg-gray-800 
                h-full w-[92%] rounded-md mx-auto gap-x-14 p-4" onSubmit={handleSubmit}>
                    
                    <div className="md:gap-y-10 gap-y-7 flex flex-col w-full md:w-[40%] items-start justify-start
                    md:px-0">
                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50  border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 w-full  dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Userame</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="username e g jhon" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="flex items-center mr-4 gap-x-6">
                            <p className="text-white">Set account visibilty: </p>
                            <div>
                                <input ref={publicRef}  onClick={() => selectOnlyOneCheckbox("public")}id="public"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                <label  htmlFor="public" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public</label>
                            </div>
                            
                            <div>

                                <input ref={privateRef} onClick={() => selectOnlyOneCheckbox("private")} id="private"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                <label htmlFor="private" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private</label>
                            
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-col flex flex-wrap md:w-[30%] w-full  md:gap-y-10 gap-y-7 mt-4 justify-center items-center
                    ">
                        
                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50  border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 w-full  dark:placeholder-gray-400 dark:text-white" placeholder="USA, California" required />
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50  border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 w-full  dark:placeholder-gray-400 dark:text-white" placeholder="front-end developer, photographer" required />
                        </div>
                        
                        
                        <div className="w-full">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write you bio ..."></textarea>
                        </div>
                        
                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50  border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 w-full  dark:placeholder-gray-400 dark:text-white" placeholder="front-end developer, photographer" required />
                        </div>
                    </div>
                    
                   
                    <div className="flex items-center justify-center w-[70%] mx-auto mt-4 group">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400 transition-all duration-300
                                group-hover:-translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="w-full text-center mt-5 flex items-center justify-center">
                        <button  type="submit" className="w-fit flex items-center justify-center text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center  gap-x-2 group">
                        Submit
                        <svg className="transition-all duration-150 group-hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            
                        </button> 
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
           
       </>
    )
}

"use client";
import Link from 'next/link';
import React, { useState } from 'react';
// validator funcs
import { emailValidator } from '../../functions/validators/emailValidator';
import { usernameValidator } from '../../functions/validators/usernameValidator';
import { passwordValidator } from '../../functions/validators/passwordValidator';

// for toasts notifications
import toast, {Toaster} from 'react-hot-toast';
//
import axios from 'axios';

export default function Signup() {
    
    // for controlled inputs
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // for public or private chceckbox
    const [visibility, setVisibility] = useState(null);

    // our refs for our checkboxed
    let publicRef = React.useRef(null);
    let privateRef = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the refresh behaviour
        
        // validators are tested and they are working fine
        if (!emailValidator(email)) {
            toast.error("email is invalid", {
                duration: 2000,
                style: {
                    backgroundColor: ""
                },
                icon:"",

            });
        }
        
        else if (!usernameValidator(username)) {
            toast.error("user name can't have spaces", {
                duration: 2000,
                style: {
                    backgroundColor: "darkslategrey"
                },
            });
        }

        else if (!passwordValidator(password)) {
            toast.error("valid password example: asdfasD3", {
                
                duration: 2000,
            });
        }

        // else if(password !== confirmPassword) {
        //     toast.error("passwords don't match", {
        //         duration: 2000,
        //     });
        // }
        // next: setup the api paths
        // inside the app folder
        try {
            const response = await axios.post("/api/save_creds", {
                email,
                username,
                password,
                visibility
            });
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }

    // handling the checkbox
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
        <section className=" dark:bg-gray-900 mt-20">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Userame</label>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="username e g jhon" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <div>
                                <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            
                            <div class="flex items-center mr-4 gap-x-10">
                                <p className="text-white">Set account visibilty: </p>
                                <div>
                                    <input ref={publicRef}  onClick={() => selectOnlyOneCheckbox("public")}id="public"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                    <label  for="public" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Public</label>
                                </div>
                                
                                <div>

                                    <input ref={privateRef} onClick={() => selectOnlyOneCheckbox("private")} id="private"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                    <label for="private" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private</label>
                                
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            
                            <button  type="submit" className="w-full text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </section>
  );
}

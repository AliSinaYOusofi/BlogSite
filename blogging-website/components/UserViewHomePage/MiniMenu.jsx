import axios from 'axios';
import React, { useState } from 'react'
import { useSpacexProvider } from '../../context/appContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MiniMenu({postId}) {

    const [clipboard, setClipboard] = useState(false);
    const [savetToAccount, setSaveToAccount] = useState(false);
    const {token} = useSpacexProvider();

    // TODO: to change this url in production. some links can be addedd if nedded in ul.
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`/single_post_view?post=${postId}`); // to be changed
        setClipboard(true);  
    }

    const savePostToAccountHandler = async () => {
        // set it according of result from the server
        setSaveToAccount(prev => !prev);

        try {
            const response = await axios.post("/api/view_save_post_save", {
                postId,
                token
            });
            console.log(response.data);
            if (response.data.message === "update")
                toast.success("saved post to account");
            else if(response.data.message === "delete")
                toast.warning("removed from your saved posts");
            else
                toast.error("failed to save to account", );
            
        }catch(error) { console.log("Error! liking an image", error);}
    }

    return (
        <div className="bg-white rounded-md absolute top-5 right-5 px-8 py-4 text-gray-400">
            <ul className="z-[40]">
                
                <li onClick={copyToClipboard} className=" hover:text-black cursor-pointer text-gray-600 w-fit text-sm h-fit flex items-center justify-center">
                    Copy link
                    {
                        clipboard ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex items-center ml-2">
                            <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clipRule="evenodd" />
                        </svg>
                        : null
                    }
                </li>
                
                <li onClick={savePostToAccountHandler} className="cursor-pointer hover:text-black text-gray-600 w-fit text-sm h-fit mt-2 flex items-center justify-center">
                    Save post
                    {
                        savetToAccount
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 ml-2 flex items-center mt-1 h-4">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                        </svg>
                        : null
                    }
                </li>
            </ul>
            <ToastContainer 
                position="top-right"
                hideProgressBar={false}
                autoClose={5000}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
                theme="light"
            />
        </div>
    )
}

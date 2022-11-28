"use client"; // ssr to false
import React, { useCallback, useMemo, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import StaticButton from '../../components/MakePost/StaticButtons';
import LoadingButton from '../../components/MakePost/LoadingButton';

let initialState = {content: ""}
export default function CreatePost() {
    // styling the mde
    const [text, setText] = useState(initialState);
    const [postMyStory, setPostMyStory] = useState(false);

    const style = { backgroundColor: "aliceblue"}
    
    let delay = 1000;

    const handleImagePreview = () => { console.log("preview")}
    
    const handleImageUpload = () => {
        if (postMyStory) { // if post is clicked only then process the posting
            console.log("clicked posting");
            return
        }
    }

    const anOptions = useMemo(() => {
        return {
          autosave: {
            enabled: true,
            uniqueId: "demo",
            delay,
          },
          spellChecker: true,
          autoFocus: true,
          previewImagesInEditor: true,
          imagesPreviewHandler: handleImagePreview,
          lineNumbers: true,
          uploadImage: true,
          imageUploadFunction: handleImageUpload,
          errorCallback: errorMessage => toast.error(errorMessage),
          timeFormat: {
            locale: 'en-US',
            format: {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                },
            },
        };
      }, [delay]);

    return (
        <div className="w-[90%] mx-auto mt-20">
            <SimpleMDE 
                className="placeholder: pl placeholder:lg rounded-md z-0" placeholder='Start you great story' 
                style={style}
                options={anOptions} 
                value={text.post} onChange={value => setText({...text, content: value})}
            />
            <button onClick={() => setPostMyStory(!postMyStory)} className="text-white mt-5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-6 py-2 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {
                    postMyStory ?
                    <span>
                         Posting
                        <svg aria-hidden="true" role="status" className="inline ml-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                    </span>

                    : "Post"
                }
            </button>
        </div>
    );
}

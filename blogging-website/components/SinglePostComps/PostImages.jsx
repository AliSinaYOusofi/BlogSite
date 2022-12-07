"use client";
import React from 'react'

export default function PostImages({postImageUrl}) {

    const getFullScreen = () => {
        
        let image = document.getElementById("postImage");
        
        if ( typeof window !== "undefined" && typeof document !== "undefined" && !document.fullscreenElement) {
          return image.requestFullscreen().catch(error => alert("error: can't make image fullscreen"))
        }
        
        document.exitFullscreen();
      
    }
    return (
        <div className="mx-auto mt-5 mb-5 rounded-md w-[98%]">
            <img onClick={getFullScreen} id="postImage" src={postImageUrl.split("(")[1].split(")")[0] || ""} alt="post image" 
            className="object-contain w-full h-full px-7  rounded-lg cursor-pointer"/>
        </div>
    )
}

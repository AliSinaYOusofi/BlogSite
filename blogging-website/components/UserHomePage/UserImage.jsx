"use client";

import Image from 'next/image'
import React from 'react'
import { useRef } from 'react'

export default function UserImage({profileUrl}) {

    const getFullScreen = () => {
      let image = document.getElementById("image");
      if ( typeof window !== "undefined" && typeof document !== "undefined" && !document.fullscreenElement) {
        image.style.width = "100vw";
        image.style.height = "100vh";
        return image.requestFullscreen().catch(error => alert("error: can't make image fullscreen"))
      }
      
      image.style.width = "250px";
      image.style.height = "250px";
      document.exitFullscreen();
    
    }
    return (
      <div onClick={getFullScreen} id="image" className="cursor-pointer">
        <img className="rounded-full w-[250px] h-[250px] ob object-cover"   src={profileUrl || "https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png"} alt="hey"/>
      </div>
    )
}

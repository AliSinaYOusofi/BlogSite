"use client";

import Image from 'next/image'
import React from 'react'
import { useRef } from 'react'

export default function UserImage() {

    const getFullScreen = () => {
      let image = document.getElementById("image");
      if ( typeof window !== "undefined" && typeof document !== "undefined" && !document.fullscreenElement) {
        return image.requestFullscreen().catch(error => alert("error: can't make image fullscreen"))
      }
      document.exitFullscreen();
    }
    return (
      <div onClick={getFullScreen} id="image" className="cursor-pointer">
        <img className=""   src={"https://www.pngmart.com/files/22/User-Avatar-Profile-Background-Isolated-PNG.png"} alt="hey"/>
      </div>
    )
}

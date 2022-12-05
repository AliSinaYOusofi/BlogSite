import React from 'react'

export default function PostImages({postImageUrl}) {

    return (
        <div className="w-full mt-5 mb-5 rounded-md">
            <img src={postImageUrl.split("(")[1].split(")")[0] || ""} alt="post image" 
            className="object-contain w-full h-full px-7  rounded-lg"/>
        </div>
    )
}

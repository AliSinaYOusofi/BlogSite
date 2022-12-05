import React from 'react'

export default function PostImages({postImageUrl}) {
    return (
        <div className="w-full">
            <img src={postImageUrl} alt="post image" 
            className="object-contain w-full h-full px-7 rounded-md"/>
        </div>
    )
}

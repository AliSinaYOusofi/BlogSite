import React from 'react'

export default function PostText({text}) {
    return (
        <div className="text-white px-8 leading-relaxed tracking-[0.050rem]  text-xl">
            <p> {text}</p>
        </div>
    )
}

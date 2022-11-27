"use client"; // ssr to false
import React, { useCallback, useMemo, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
export default function CreatePost() {
    // styling the mde
    const [text, setText] = useState("");
    const onChangeText = useCallback( (value) => setText(value), [text]);

    const autoFocuseAndSpellChecker = useMemo(
        () => {
            return {
                spellChecker: true,
                autoFocus: true
            }
        }
    , []) 
    
    console.log(text);
    
    const style = {
        backgroundColor: "aliceblue",
    }
    return (
        <div className="w-[90%] mx-auto mt-20">
            <SimpleMDE className="placeholder: pl placeholder:lg rounded-md" placeholder='Start you great story' options={autoFocuseAndSpellChecker} style={style} value={text} onChange={onChangeText}/>
        </div>
    );
}

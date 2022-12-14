"use client";

import React, { useEffect, useState } from 'react'
import SingleUserPosts from '../../components/UserPostOnly/UserPosts'
import { useSpacexProvider } from '../../context/appContext'
import axios from 'axios';

export default function UserPosts () {
    const 
    {
        token, 
        setDataEmail, dataEmail,
        setDataUsername, dataUsername,
        setDataSetProfileUrl, dataProfileUrl,
        setDataTitle, setDataBio
    } = useSpacexProvider();

    const [posts, setPosts] = useState([{
        title: "",
        content: "",
        date: "",
    }]);


    useEffect( () => {
    
        const getPosts = async () => {
          try { 
            const response = await axios.get("/api/get_posts", {
              params: { 
                token
              }    
            });
            // this should do it.
            setPosts(response.data.posts || [{}]);
            setDataUsername(response.data.username);
            setDataSetProfileUrl(response.data.profileUrl);
            setDataEmail(response.data.profileEmail);
            setDataBio(response.data.bio || "NA Bio");
            setDataTitle(response.data.title || "NA Title");
          } catch (error) { console.log(error)}
        }
        getPosts();
    }, []);

    return (
        <>
            
            <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
            flex items-center flex-col
            w-[100%] mx-auto bg-slate-400">
            {
             posts.map( item => <SingleUserPosts date={item.date} 
                username={dataUsername} profileUrl={dataProfileUrl}
                content={item.content} title={item.content?.split("\n")[0]}
                key={item?.id} id={item?.id}
                />)
            }
        </div>
        
        </>
    )
}
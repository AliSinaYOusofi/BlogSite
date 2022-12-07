"use client";

import React, { useEffect, useState } from 'react'
import UserPosts from '../../components/UserPostOnly/UserPosts'
import { useSpacexProvider } from '../../context/appContext'
import axios from 'axios';

export default function page () {
    const {token} = useSpacexProvider();

    const [posts, setPosts] = useState([{
        title: "",
        content: "",
        date: "",
    }]);

    const [profile, setProfile] = useState([{
      username: "",
      profileUrl: "",
      profileEmail: "",
      bio: "",
      title: ""
    }])


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
            setProfile(response.data.userData);
          } catch (error) { console.log(error)}
        }
        getPosts();
    }, []);
    
    console.log(profile);
    return (
        <>
        
            <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
            flex items-center flex-col
            w-[92%] mx-auto ">
            {
            posts.map( item => <UserPosts date={item.date} 
                username={profile ? profile[0]?.username : ""} profileUrl={profile ? profile[0]?.profileUrl : ""}
                content={item.content} title={item.content?.split("\n")[0]}
                key={item?.id} id={item?.id}
                />)
            }
        </div>
        
        </>
    )
}
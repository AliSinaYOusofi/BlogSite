"use client";

import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import UserMainPage from '../../components/UserHomePage/UserMainPage'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import UserPosts from '../../components/UserPostOnly/UserPosts'
import { useSpacexProvider } from '../../context/appContext'

export default function Layout () {
    // get the data for the posts for the current logged in user
    // and map through it
  const 
  {
    token, 
    setDataEmail, dataEmail,
    setDataUsername, dataUsername,
    setDataSetProfileUrl, dataProfileUrl,
    setDataTitle, setDataBio
  } = useSpacexProvider();
  
  // user posts data
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
        console.log(response.data.bio, response.data.title);
      } catch (error) { console.log(error)}
    }
    getPosts();
  }, []) // run once when comp mounts
  console.log()
  return (
    <>
      <UserNavbar />
      <UserMainPage />
      <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
      flex items-center flex-col
      w-[92%] mx-auto">
       {
        posts.map( item => <UserPosts date={item.date} 
          username={dataUsername} profileUrl={dataProfileUrl}
          content={item.content} title={item.content?.split("\n")[0]}
          key={item?.id} id={item?.id}
          />)
       }
      </div>
    </>
  )
}

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
  const {token, setDataEmail} = useSpacexProvider();
  
  // user posts data
  const [posts, setPosts] = useState([{
    title: "",
    content: "",
    date: "",
  }]);
  
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState(""); 
  const [email, setEmail] = useState(""); 

  useEffect( () => {
    
    const getPosts = async () => {
      try { 
        const response = await axios.get("/api/get_posts", {
          params: { 
            token
          }
        });
        // this should do it.
        setPosts(response.data.posts);
        setUsername(response.data.username);
        setProfileUrl(response.data.profileUrl);
        setEmail(response.data.profileEmail);
        setDataEmail(response.data.profileEmail);
      } catch (error) { console.log(error)}
    }
    getPosts();
  }, []) // run once when comp mounts

  console.log(posts, username, profileUrl, email);
  
  return (
    <>
      <UserNavbar username={username} email={email} profileUrl={profileUrl}/>
      <UserMainPage />
      <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
      flex items-center flex-col
      w-[92%] mx-auto">
       {
        posts.map( item => <UserPosts date={item.date} 
          username={username} profileUrl={profileUrl}
          content={item.content} title={item.content?.split("\n")[0]}
          id={item?.id} 
          />)
       }
      </div>
    </>
  )
}

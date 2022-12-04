"use client";

import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import UserMainPage from '../../components/UserHomePage/UserMainPage'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import UserPosts from '../../components/UserPostOnly/UserPosts'
import { useSpacexProvider } from '../../context/appContext'

export default function Layout () {
    // get the data for the posts for the current logged in user
    // and map through it
  const {token} = useSpacexProvider(); 

  useEffect( () => {
    
    const getPosts = async () => {
      try {
        const response = await axios.get("/api/get_posts", {
          params: {
            token
          }
        });
        console.log(response);
      } catch (error) { console.log(error)}
    }
    getPosts();
  }, []) // run once when comp mounts

    return (
      <>
        <UserNavbar />
        <UserMainPage />
        <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
        flex items-center flex-col
        w-[92%] mx-auto">
          <UserPosts />
          <UserPosts />
          <UserPosts />
          <UserPosts />
          <UserPosts />
          <UserPosts />
        </div>
      </>
  )
}

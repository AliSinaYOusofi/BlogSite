"use client";

import React from 'react'
import UserMainPage from '../../components/UserHomePage/UserMainPage'
import UserNavbar from '../../components/UserHomePage/UserNavbar'


export default function Layout ({children}) {
    // get the data for the posts for the current logged in user
    // and map through it
   // run once when comp mounts
 
  return ( 
    <>
      <UserNavbar />
      <UserMainPage />
      {children}

    </>
  )
}

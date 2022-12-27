"use client";

import React from 'react'
import UserMainPage from '../../components/UserHomePage/UserMainPage'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import Footer from '../../components/Footer/Footer';
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';

export default function Layout ({children}) {
    // get the data for the posts for the current logged in user
    // and map through it
   // run once when comp mounts
  const {token} = useSpacexProvider();
  const router = useRouter();
  return ( 
    <>
     {
      token
      ?
      <div>
         <UserNavbar />
        <UserMainPage />
        {children}
        <Footer />
      </div>
      : router.push("/login")
     }
    </>
  )
}

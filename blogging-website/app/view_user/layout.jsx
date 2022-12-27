"use client";

import React from 'react'
import UserNavbar from "../../components/UserHomePage/UserNavbar";
import Footer from '../../components/Footer/Footer';
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';

export default function Layout({children}) {

  const {token} = useSpacexProvider();
  const router = useRouter();
  return (
    <>
      {
        token
        ?
        <section>
          <UserNavbar />
          {children}
          <Footer />
        </section>
        : router.push("/login")
      }
    </>
  )
}

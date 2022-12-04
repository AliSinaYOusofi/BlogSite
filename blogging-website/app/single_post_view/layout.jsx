"use client";
import React from 'react'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import { useSpacexProvider } from '../../context/appContext'
import { useRouter } from 'next/navigation';

export default function Layout() {
    // what should the laout be like: sidebar for navigation in the middle show the
    // post itself and in the right side show other posts
    const {dataEmail} = useSpacexProvider();
    console.log(dataEmail, "email is working fine");
    
    return (
        <>
            <UserNavbar />
        </>
    )
}

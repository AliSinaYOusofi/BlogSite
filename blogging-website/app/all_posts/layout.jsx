"use client";

import React from 'react'
import Footer from '../../components/Footer/Footer';
import UserNavbar from '../../components/UserHomePage/UserNavbar';

export default function Layout({children}) {

    return (
        <>
            <UserNavbar />
            {children}
            <Footer />
        </>
    )
}

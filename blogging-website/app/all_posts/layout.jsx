"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import Footer from '../../components/Footer/Footer';
import UserNavbar from '../../components/UserHomePage/UserNavbar';
import { useSpacexProvider } from '../../context/appContext';

export default function Layout({children}) {

    const {token} = useSpacexProvider();
    const router = useRouter();

    return (
        <>
        {
            token?
            <div>

                <UserNavbar />
                {children}
                <Footer />
            </div>
            : router.push("/login")
        }
        </>
    )
}

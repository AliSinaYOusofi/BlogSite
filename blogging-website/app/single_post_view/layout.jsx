"use client";
import React from 'react'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import Footer from '../../components/Footer/Footer';
import { useRouter } from 'next/navigation';
import { useSpacexProvider } from '../../context/appContext';

export default function Layout({children}) {

    
    // what should the laout be like: sidebar for navigation in the middle show the
    // post itself and in the right side show other posts
    // nicely done
    

    // so i will make 3 components one the parent image and text
    // i will check if its' a text then i will pass data to the text
    // otherwise i will pass it to the image component.
    // thats the solution for now.


    // IMPORTANT NOTE //
    // MAKE THESE COMPOENNET FOR EVERY POST
    // NO NEED TO MAKE THESE COMPONENT FOR ANOTHER USER

    const {token} = useSpacexProvider();
    const router = useRouter();
    return (
        <>
            {
                token
                ?
                <div>
                    <UserNavbar />
                    {children}
                    <Footer />
                </div>
                : router.push("/login")
            }
        </>
    ) // testing the component with an image
}

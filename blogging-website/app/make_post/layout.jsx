"use client"

import UserNavbar from '../../components/UserHomePage/UserNavbar';
import Footer from '../../components/Footer/Footer';

export default function Layout({children}) {
    return (
       <>
            <UserNavbar />
                {children}
            <Footer />
       </>
    );
}
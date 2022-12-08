import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Signup from '../../components/Signup/Signup';

export default async function page() {
 
  return (
    <>
        <Navbar />
        <Signup />
        <Footer />
    </>
  )
}

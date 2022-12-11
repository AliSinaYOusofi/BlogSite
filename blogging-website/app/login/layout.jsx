import React from 'react'
import Footer from '../../components/Footer/Footer'
import Login from '../../components/Login/Login'
import Navbar from '../../components/Navbar/Navbar'

export default function layout({children}) {
  return (
    <>
        <Navbar />
        <Login />
        <Footer />
    </>
  )
}

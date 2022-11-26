"use client";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./global.css";
import { Spacex } from "../context/appContext";
export default function RootLayout({ children }) {
  return (
    <html>
      <head />  
      {/* Putting our layout into this direcory */}
      <body className="">
        <Spacex>
          <Navbar />
          {children}
          <Footer />
        </Spacex>
      </body>
    </html>
  )
}

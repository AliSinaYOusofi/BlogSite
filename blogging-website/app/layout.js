"use client";
import Footer from "../components/Footer/Footer";
import "./global.css";
import { Spacex } from "../context/appContext";
import Head from "./head";
export default function RootLayout({ children }) {
  return (
    <html>
      <Head />  
      {/* Putting our layout into this direcory */}
      <body>
        <Spacex>
          {children}
          <Footer />
        </Spacex>
      </body>
    </html>
  )
}

"use client";

import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import { useSpacexProvider } from "../context/appContext";
import "./global.css";
export default function Home() {
    const {token} = useSpacexProvider();
    console.log(token, "page");

    return(
        <>
            <Navbar />
            <HeroSection />
            <NewsLetter />
        </>
    );
}
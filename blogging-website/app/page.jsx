"use client";

import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Footer from '../components/Footer/Footer';
import "./global.css";
export default function Home() {
    
    return(
        <div className="total">
            <Navbar />
            <HeroSection />
            <NewsLetter />
            <Footer />
        </div>
    );
}
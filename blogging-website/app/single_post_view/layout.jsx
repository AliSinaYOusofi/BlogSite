"use client";
import React, { useEffect, useState } from 'react'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import { useSpacexProvider } from '../../context/appContext'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Layout() {

    const [post, setPost] = useState({});
    // what should the laout be like: sidebar for navigation in the middle show the
    // post itself and in the right side show other posts
    const {dataEmail, dataUsername, dataProfileUrl} = useSpacexProvider();
    // nicely done
    const postId = useSearchParams().get("post");

    useEffect( () => {
        const getPostGivenId = async () => {
            try {
                const response = await axios.get("/api/get_single_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                console.log(response.data);
            } catch (error) {
                console.log(error, 'error! while getting post using id');    
            }
        }
        getPostGivenId();
    })
    
    return (
        <>
            <UserNavbar username={dataUsername} email={dataEmail} profileUrl={dataProfileUrl}/>
        </>
    )
}

"use client";
import CreatePost from "../../components/MakePost/CreatePost";
import { useSpacexProvider } from '../../context/appContext';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


export default function page() {
    const {token} = useSpacexProvider();
    const router = useRouter();

    useEffect( () => {
        if (!token) router.push("/login");
    }, []);

    return(
        <CreatePost />
    )
}
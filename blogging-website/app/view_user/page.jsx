"use client";

import Followers from '../../components/UserViewHomePage/Followers';
import ViewUserCard from '../../components/UserViewHomePage/ViewUserCard';
import ViewUserPosts from '../../components/UserViewHomePage/ViewUserPosts';


export default function page () {
    // from the email we can get other information

    return (
        <>
            <div className="container w-[98%] mx-auto flex flex-col md:flex-row flex-wrap">
                <div className="md:w-[60%] w-full">
                    <ViewUserPosts />
                </div>
                <div className="md:w-[40%] w-full sticky top-0">
                    <ViewUserCard />
                    <Followers />
                </div>
            </div>
        </>
    )
}
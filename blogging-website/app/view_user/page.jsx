"use client";

import ViewUserCard from '../../components/UserViewHomePage/ViewUserCard';
import ViewUserPosts from '../../components/UserViewHomePage/ViewUserPosts';

export default function page () {
    // from the email we can get other information
    

    return (
        <div className="container w-[98%] mx-auto flex flex-row flex-wrap">
            <div className="w-[60%]">
                <ViewUserPosts />
            </div>
            <div className="w-[40%]">
                <ViewUserCard />
            </div>
        </div>
    )
}
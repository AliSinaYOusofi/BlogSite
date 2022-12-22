import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PostsFromSameUser from '../SinglePostComps/PostsFromSameUser';
import SamePostrPosts from './SamePostrPosts';

export default function RecentPosts({postId}) {

    const [recentPosts, setRecentPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: "",
        username: "",

    }]);
    
    useEffect( () => {
        
        // now another function to take the posts of the same user returned. at least three of them. ok 3
        
        const getRecentPosts = async () => {
            try {
                const response = await axios.get("/api/get_recent_posts" );
                setRecentPosts(response.data.latestPosts);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        getRecentPosts();
    }, [postId]);
    
    return (
        <>
            {/* posts from the same user should come after this 
                    make another compoenent thats shows the posts of the same poster if any
                    
                so posts from the same user is working fine
                */}
               
                <h1 className="text-xl font-bold text-center text-gray-700"> Some Posts from the same user</h1>
                <SamePostrPosts postId={postId}/>
                
                <h1 className="text-xl font-bold text-center text-gray-700 mt-5"> Most Recent Posts</h1>

                {/*
                    now show some posts from other users as well.
                    like 3-5 posts from random people.
                    use the same compoenent.
                    sort them by latest date
                */}

                {
                    recentPosts ? recentPosts.map( item => <PostsFromSameUser id={item?.id} 
                        key={item?.date} 
                        content={item?.content}
                        title={item?.content.split("\n")[0]} 
                        date={item?.date}
                        username={item?.poster} 
                        />
                    ): ""
            }
        </>
    )
}

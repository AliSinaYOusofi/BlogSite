"use client";

import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import UserCard from '../../components/SinglePostComps/UserCard';
import PostImages from '../../components/SinglePostComps/PostImages';
import PostText from '../../components/SinglePostComps/PostText';
import PostIneraction from '../../components/SinglePostComps/PostIneraction';
import PosterCard from '../../components/SinglePostComps/PosterCard';
import PostsFromSameUser from '../../components/SinglePostComps/PostsFromSameUser';
    
export default function page() {

    const [posts, setPosts] = useState([{
        content: ""
    }]);

    const [sameUserPosts, setSameUserPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: ""
    }]);
    
    const [recentPosts, setRecentPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: "",
        username: "",

    }]);

    const postId = useSearchParams().get("post");
   
    useEffect( () => {
        const getPostGivenId = async () => {
            try {
                const response = await axios.get("/api/get_single_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.log(error, 'error! while getting post using id');    
            }
        }    
        // now another function to take the posts of the same user returned. at least three of them. ok 3
        const getSameUserPosts = async () => {
            try {
                const response = await axios.get("/api/get_same_user_post", {
                    headers: { 
                        'PostId': postId
                    } 
                });
                setSameUserPosts(response.data.samePosts);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        const getRecentPosts = async () => {
            try {
                const response = await axios.get("/api/get_recent_posts" );
                setRecentPosts(response.data.latestPosts);
            } catch (error) {
                console.log("failed to get posts of the same user, useEffect(): ", error);
            }
        }
        getPostGivenId();
        getSameUserPosts();
        getRecentPosts();
    }, [postId]);

    
    return (
        <>
            <div className="w-[100%] mx-auto  mt-10 py-4
                flex flex-row justify-center relative">
                    
                <PostIneraction />
                <div className="w-[70%] bg-[#1F2937] mx-2 rounded-lg h-fit">
                    <UserCard postDate={posts ? posts[0]?.date : "NA"}/>
                    {/* so now for showing the real post content
                    to components one for the image and one for the content of the 
                    page */}
                    <h1 className="mb-4 ml-6 text-xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-2xl dark:text-white">{posts && posts[0]?.content ? posts[0]?.content.split("\n")[0] : ""}</h1>
                    
                    {
                        posts[0].content.split("\n").map( line => line.startsWith("![]") ? <PostImages postImageUrl={line} /> : <PostText text={line}/>)
                    }
                </div>
                <div className="w-[25%] relative bg-[#1F2937] mr-3 rounded-lg h-fit">
                    {/* posts from the same user should come after this 
                    make another compoenent thats shows the posts of the same poster if any
                    
                    so posts from the same user is working fine
                    */}
                    <PosterCard postId={postId}/>
                    <h1 className="text-xl font-bold text-center text-white mt-5"> Some Posts from the same user</h1>
                    {
                        sameUserPosts ? sameUserPosts.map( item => <PostsFromSameUser id={item?.id} 
                            title={item.content.split("\n")[0]} 
                            content={item.content} 
                            date={item?.date} />
                        ): ""
                    }
                    
                    <h1 className="text-xl font-bold text-center text-white mt-5"> Most Recent Posts</h1>

                    {/*
                        now show some posts from other users as well.
                        like 3-5 posts from random people.
                        use the same compoenent.
                        sort them by latest date
                    */}

                    {
                        recentPosts ? recentPosts.map( item => <PostsFromSameUser id={item?.id} 
                            title={item.content.split("\n")[0]} 
                            content={item.content} 
                            date={item?.date}
                            username={item?.poster} 
                            />
                        ): ""
                    }
                </div>
            </div>
        </>
    )
}

/*
    make a loader compoenent work
    just work on it Ali.
    front-end is depressing but you should make the loader component
*/
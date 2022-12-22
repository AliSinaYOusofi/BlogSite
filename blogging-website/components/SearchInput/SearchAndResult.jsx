import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { sleep } from '../global/sleep';
import AllPostsCard from '../../components/AllPostsCard/AllPosts';

export default function SearchAndResult() {

    const [search, setSearch] = useState("");
    const [userOrPosts, setUserOrPost] = useState("Posts");
    // for search results
    const [users, setUsers] = useState([{}]);
    const [posts, setPosts] = useState([{
        id: "",
        title: "",
        date: "",
        content: "",
        username: "",
    }]);

    // now searching based on those values

    const searchUsers = async () => {
        try {
            const response = await axios.get("/api/search_by_users",{
                params: {
                   search
                }
            });
            setUsers(response.data.search_result);
        } 
        catch (error) {
            console.log("search by user: %s", error);
        }
    }

    const searchPosts = async () => {
        try {
            const response = await axios.get("/api/search/search_by_posts",{
                params: {
                   search
                }
            });
            console.log(response.data);
            setPosts(response.data.search_results);
        } catch (error) {
            console.log("search by posts: %s", error);
        }
    }

    useEffect( () => {
        const searchBy = async () => {
            if (search) {
                if (userOrPosts  === "Posts") {
                    await sleep(3000);
                    searchPosts();
                }
                else if (userOrPosts === "Users") {
                    await sleep(3000);
                    searchUsers();
                }
            }
        }
        searchBy();  
    }, [search])
    
    return (
        <>
            <div className="w-full rounded-full bg-white py-2 px-4 flex items-between justify-center">
                <input 
                    type="search" 
                    placeholder="search posts, users ... " 
                    className="outline-none border-none w-full rounded-full"
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg> */}

                <select onChange={(e) => setUserOrPost(e.target.value)} className="p-3 rounded-full " name="opts" id="opts">
                    <option value="Posts">Posts</option>
                    <option value="Users">Users</option>
                </select>
            </div>
            {
                posts ? posts.map( item => 
                    <AllPostsCard
                        id={item?.id} 
                        key={item?.date} 
                        content={item?.content}
                        title={item?.content.split("\n")[0]} 
                        date={item?.date}
                        username={item?.poster} 
                    />
                ): null
            }  
        </>
    )
}

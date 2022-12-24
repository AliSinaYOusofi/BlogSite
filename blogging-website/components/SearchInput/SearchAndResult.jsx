import axios from 'axios';
import React, { Suspense, useState } from 'react'
import { useEffect } from 'react';
import { sleep } from '../global/sleep';
import AllPostsCard from '../../components/AllPostsCard/AllPosts';
import Spinner from '../Spinner/Spinner';
import UsersList from '../UsersList/UsersList';

export default function SearchAndResult() {

    const [search, setSearch] = useState("");
    const [userOrPosts, setUserOrPost] = useState("Posts");
    // for search results
    const [users, setUsers] = useState([{
        username: "",
        email: "",
        profileUrl: "",
        date: ""
    }]);
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
            const response = await axios.get("/api/search/search_by_users",{
                params: {
                   search
                }
            });
            console.log(response.data.search_results)
            setUsers(response.data.search_results);
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
            setPosts(response.data.search_results);
        } catch (error) {
            console.log("search by posts: %s", error);
        }
    }

    const getSearchResults = async () => {
        if (search) {
            if (userOrPosts  === "Posts") {
                await sleep(3000);
                setPosts([{}])
                searchPosts();
            }
            else if (userOrPosts === "Users") {
                await sleep(3000);
                setUsers([{}])
                searchUsers();
            }
        }
    }
    
    const changeSearchSettings = (e) => {
        if (userOrPosts === "Posts") setPosts([{}]);
        else setUsers([{}])
        setUserOrPost(e.target.value);
    }
    return (
        <>
        
            <div className="w-full rounded-full bg-white py-2 px-4 flex items-between justify-center">
                <input 
                    type="search" 
                    placeholder="search posts, users ... " 
                    className="outline-none border-none w-full rounded-full"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={getSearchResults}
                />
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg> */}

                <select onChange={changeSearchSettings} className="p-3 rounded-full " name="opts" id="opts">
                    <option value="Posts">Posts</option>
                    <option value="Users">Users</option>
                </select>
            </div>
           
            {
                Object.keys(posts[0]).length && search ? posts.map( item => 
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
            
            {
                users && search ? users.map( item => 
                    <UsersList
                        profileUsername={item?.username}
                        profileEmail={item?.email}
                        profileImageUrl={item?.profileUrl}
                        profileJoinDate={item?.date}
                    />
                ): null
            }

            {
                
            }


        </>
    )
}

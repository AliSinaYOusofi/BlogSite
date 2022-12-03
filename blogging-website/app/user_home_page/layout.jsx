import React from 'react'
import UserMainPage from '../../components/UserHomePage/UserMainPage'
import UserNavbar from '../../components/UserHomePage/UserNavbar'
import UserPosts from '../../components/UserPostOnly/UserPosts'
export default function Layout () {
  return (
    <>
      <UserNavbar />
      <UserMainPage />
      <div className="md:grid md:place-items-center  md:grid-rows-1  grid-cols-3 gap-x-2
      flex items-center flex-col
      w-[92%] mx-auto">
        <UserPosts />
        <UserPosts />
        <UserPosts />
        <UserPosts />
        <UserPosts />
        <UserPosts />
      </div>
    </>
  )
}

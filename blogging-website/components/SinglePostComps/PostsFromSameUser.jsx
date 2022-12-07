import Link from 'next/link';
import { moveToTopOfDocument } from '../../functions/MovtToTop/MoveToTop';


export default function PostsFromSameUser({id, date, content, title, username}) { // from the postId we can get poster

    // this should take the email and return some of the posts of this user
    // sort by latest first and have the id so they can view the full post.
    

    // so take the id. and in the backend search for the post with that id and get
    // the posterToken and after that make another search will all the posts equal to that
    // token

    return (
        <div className="w-fit p-4 " key={id}>
            <div className="flex items-start justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400 ">{date ? date.split("T")[0] : "2022-12-4"}</span>
                <span className="text-sm font-light text-gray-600 dark:text-gray-400 "> {username || ""} </span> 
            </div> 
            <div className="mt-2">
                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{title || "some blog title"}</Link> 
                <p className="line-clamp-3 overflow-ellipsis mt-2 text-gray-600 dark:text-gray-300 text-sm">{content || "Hello world. This is a dummy contnet will be replaced by real content"}</p>
            </div> 
           
            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: id} }} className="text-blue-300 transition-all duration-300 hover:underline text-sm" id={id}>Read more ⟶</Link> 
        </div>

    )
}
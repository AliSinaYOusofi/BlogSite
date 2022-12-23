import Link from 'next/link';
import { moveToTopOfDocument } from '../../functions/MovtToTop/MoveToTop';


export default function AllPostsCard({id, date, content, title, username}) { // from the postId we can get poster

    // this should take the email and return some of the posts of this user
    // sort by latest first and have the id so they can view the full post.
    

    // so take the id. and in the backend search for the post with that id and get
    // the posterToken and after that make another search will all the posts equal to that
    // token

    return (
        <div className="w-full mx-auto p-4 bg-[#f5f5f5] rounded-md ml-2 mt-4" key={id}>
            <div className="flex items-start justify-between">
                <span className="text-sm font-light text-black/80">{date ? date.split("T")[0] : ""}</span>
                <Link href={{pathname: "/view_user", query: {"email": username}}} className="text-sm font-light text-black hover:text-blue-500"> {username || ""} </Link> 
            </div> 
            <div className="mt-2">
                <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: id} }} className="overflow-ellipsis line-clamp-1 text-xl font-bold text-black hover:underline">{title || ""}</Link> 
                <p className="line-clamp-3 overflow-ellipsis mt-2 text-black/80 mb-4 text-sm">{content || ""}</p>
            </div> 
           
            <Link onClick={moveToTopOfDocument} href={{ pathname:"/single_post_view", query: {post: id} }} className="text-blue-300 transition-all duration-300 hover:underline text-sm" id={id}>{id && "Read more"}</Link> 
        </div>
    )
}

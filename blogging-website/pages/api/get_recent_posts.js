import PosterCard from "../../components/SinglePostComps/PosterCard";
import postSchema from "../../db_models/UserPosts";
export default async function handler(req, res) {

    // this function will take the postId from params and return 3x posts
    // from the same user;

    // postDate, title, content, id

    // use the id to get the jwtToken, and return three of the posts
    
    if (req.method !== "GET") return res.status(200).json({message: "only Reqs"})

    try {
        // search an find recent posts and send it
        // check the dates
        

        // how 2 get those data with latest dates
        // using aggeragation 
        return res.status(200).json({message: 'done', samePosts: userPosts}); // thats a good boy      
    } catch (error) {
        console.log("Failed to get post given the post %s", postId);
        return res.status(200).json({message: "queryError"})
    }
}
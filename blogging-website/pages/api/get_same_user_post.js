import PosterCard from "../../components/SinglePostComps/PosterCard";
import postSchema from "../../db_models/UserPosts";
export default async function handler(req, res) {

    // this function will take the postId from params and return 3x posts
    // from the same user;

    // postDate, title, content, id

    // use the id to get the jwtToken, and return three of the posts
    const postId = req.headers.referer.split("=")[1];

    if (! postId) return res.status(200).json({message: "invalid post id"});
    
    if (req.method !== "GET") return res.status(200).json({message: "only Reqs"})

    try {
        const queryResult = await postSchema.findOne({'id': postId});
        const posterId = queryResult.poster; // ok thats the id of the poster
        
        const userPosts = await postSchema.find({"poster": posterId}, {"imageUrls": 0, "comments": 0});
        
        if(userPosts.length > 5) userPosts.length = 3;

        return res.status(200).json({message: 'done', samePosts: userPosts}); // thats a good boy      
    } catch (error) {
        console.log("Failed to get post given the post %s", postId);
        return res.status(200).json({message: "queryError"})
    }
}
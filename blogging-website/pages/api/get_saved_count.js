import savedPosts from "../../db_models/savedPosts";
export default async function handler(req, res) {
    
    let {postId} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});
   
    try {
        
        let savedCount = await savedPosts.find({}).count();
        return res.status(200).json({message: "loved", savedToAccounts: savedCount});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
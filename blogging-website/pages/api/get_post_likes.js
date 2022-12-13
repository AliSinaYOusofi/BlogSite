import postLikes from "../../db_models/postLikes";

export default async function handler(req, res) {

    let {postId} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    try {
        const likeCounts = await postLikes.findOne({"postId": postId}, {"loves": 1});
        
        return res.status(200).json({message: "loved", likes: likeCounts?.loves || 0});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
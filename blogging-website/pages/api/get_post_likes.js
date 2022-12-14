import postLikes from "../../db_models/postLikes";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {

    let {postId, token} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});
    
    try {
        const likeCounts = await postLikes.findOne({"postId": postId}, {"loves": 1});
        // if the user already liked the post then make the background red;
        let {email: emailOfLiker} = jwt.decode(token);
        let userAlreadyLiked = await postLikes.findOne({"who": emailOfLiker, "postId": postId, "loves": {$eq: 1}});

        
        return res.status(200).json({userLoves: userAlreadyLiked?.loves, likes: likeCounts?.loves || 0});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
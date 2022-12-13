import commentSchema from '../../db_models/commentSchema';

export default async function handler(req, res) {
    
    let {postId} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    try {
        const comments = await commentSchema.findOne({"postId": postId}, {"comments": 1});
       
        return res.status(200).json({message: "loved", commentCount: comments ? comments.comments.length : 0});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
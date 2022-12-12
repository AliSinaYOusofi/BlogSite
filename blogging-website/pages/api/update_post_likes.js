import postLikes from "../../db_models/postLikes";

export default async function handler(req, res) {
    
    let {postId, color} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    const alreadyLiked = await postLikes.exists({"postId": postId});

    
    try {
        if (alreadyLiked) {
            // then update the doc value
            await postLikes.updateOne({"postId": postId}, { $inc: {"loves": color}});
            return res.status(200).json({message: "loved"});
        }

        await postLikes.insertMany([{"postId": postId, "loves": 1}]);
        return res.status(200).json({message: "loved"});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }

}
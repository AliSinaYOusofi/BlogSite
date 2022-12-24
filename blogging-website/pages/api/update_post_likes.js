import postLikes from "../../db_models/postLikes";

export default async function handler(req, res) {
    
    let {postId, token} = req.query; 
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});
     
    const alreadyLiked = await postLikes.findOne({"who": token, "postId": postId}, {"loves": 1});
    let insertedLikes = 0;

    
    try {
        if (alreadyLiked) {
           
            if ( alreadyLiked?.loves === 0) insertedLikes = 1;
            else if ( alreadyLiked?.loves === 1) insertedLikes = -1;
            else if( alreadyLiked?.loves <= -1) insertedLikes = 0;
            // then update the doc value
            await postLikes.updateOne({"who": token, "postId": postId}, { $inc: {"loves": insertedLikes}});
            return res.status(200).json({message: "updated the loved counter"});
        }

        await postLikes.insertMany([{"who": token, "postId": postId, "loves": 1}]);
        return res.status(200).json({message: "inserted love"});

    } catch (error) {
        console.log("Error! Updating the likes of a post: %s", error);
        res.status(200).json({message: "error updating the post likes update_post_likes" + error});
    }

}
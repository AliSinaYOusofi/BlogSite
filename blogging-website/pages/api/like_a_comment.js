// this will like the parent component of comment not the replies
import commentLikes from '../../db_models/commentLikes';

export default async function handler(req, res) {
    
    let {commentId, token} = req.query;
    
    
    if (!commentId || token) return res.status(200).json({message: "invalid token or comment id"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    // if there already exists a person who already liked then we decrement the value other wise inc
  
    const alreadyLiked = await commentLikes.findOne({"who": token, "commentId": commentId}, {"loves": 1}); // if loves is one then he/she like
    let insertedLikes = 0;
    
    try {
        if (alreadyLiked) {
            if ( alreadyLiked?.loves === 0) insertedLikes = 1;
            else if ( alreadyLiked?.loves === 1) insertedLikes = -1;
            else if( alreadyLiked?.loves <= -1) insertedLikes = 0;
            // then update the doc value
            await commentLikes.updateOne({"who": token, "commentId": commentId}, { $inc: {"loves": insertedLikes}});
            return res.status(200).json({message: "loved"});
        }

        await commentLikes.insertMany([{"who": token, "commentId": commentId, "loves": 1}]);
        return res.status(200).json({message: "inserted loved"});

    } catch (error) {
        console.log("Error! Inserting/Updating comment Likes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
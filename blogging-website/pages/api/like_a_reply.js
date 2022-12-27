// this will like the parent component of comment not the replies
import commentReplyLikes from '../../db_models/replyCommentsLike';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    
    let {replyId, token} = req.body;

    if (!replyId) return res.status(200).json({message: "invalid token or rep id"});

    if (req.method !== "POST") return res.status(200).json({message: "invalid requests"});

    // if there already exists a person who already liked then we decrement the value other wise inc
    let {email: emailOfLiker} = jwt.decode(token);

    const alreadyLiked = await commentReplyLikes.findOne({"who": emailOfLiker, "replyId": replyId}, {"loves": 1}); // if loves is one then he/she like
    // since the jwt token keeps changing i should first decode the jwt and if exists then update, insert otherwise
    let insertedLikes = 0;
    
    try {
        if (alreadyLiked) {
            if ( alreadyLiked?.loves === 0) insertedLikes = 1;
            else if ( alreadyLiked?.loves === 1) insertedLikes = -1;
            else if( alreadyLiked?.loves <= -1) insertedLikes = 0;
            // then update the doc value
            await commentReplyLikes.updateOne({"who": emailOfLiker, "replyId": replyId}, { $inc: {"loves": insertedLikes}});
            return res.status(200).json({message: "reply loved updated"});
        }

        await commentReplyLikes.insertMany([{"who": emailOfLiker, "replyId": replyId, "loves": 1}]);
        return res.status(200).json({message: "reply inserted loved"});

    } catch (error) {
        console.log("Error! Inserting/Updating Reply comment Likes: %s", error);
        res.status(200).json({message: "got you"});
    }
}
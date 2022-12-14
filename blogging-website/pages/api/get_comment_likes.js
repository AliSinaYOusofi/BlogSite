import commentLikes from '../../db_models/commentLikes';
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {

    let {commentId, token} = req.query;
    
    if (!commentId) return res.status(200).json({message: "invalid commentID"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    // if a user has already liked the comment then send a flag that the background
    // of the svg should change to red.
    const {email: emailOfLiker} = jwt.decode(token);
    
    try {
        let userAlreadyLiked = await commentLikes.findOne({"who": emailOfLiker, "commentId": commentId, "loves": {$eq: 1}});
       
        const commentLikesCount = await commentLikes.find({"commentId": commentId}, {"loves": 1});
       
        return res.status(200).json({userLoves: userAlreadyLiked?.loves, loves: addLoves(commentLikesCount)});

    } catch (error) {
        console.log("Error! Getting Likes from dod postLikes: %s", error);
        res.status(200).json({message: "got you"});
    }
}

function addLoves (allLikes) {
    let loves = 0;
    allLikes.forEach(item => {
        loves += item?.loves;
    });
    return loves;
}
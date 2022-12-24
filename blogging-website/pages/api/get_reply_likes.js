import commentReplyLikes from '../../db_models/replyCommentsLike';

export default async function handler(req, res) {

    let {replyId, token} = req.query;
    
    if (!replyId) return res.status(200).json({message: "invalid ReplyId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    // if a user has already liked the comment then send a flag that the background
    // of the svg should change to red.

    try {
        let userAlreadyLiked = await commentReplyLikes.findOne({"who": token, "replyId": replyId, "loves": {$eq: 1}});
        const replyOfCommentsLiked = await commentReplyLikes.find({"replyId": replyId}, {"loves": 1});
       
        return res.status(200).json({userLoves: userAlreadyLiked?.loves, loves: addLoves(replyOfCommentsLiked)});

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
import followingUsers from "../../db_models/FollowingSchema";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    let {email, token} = req.query;

    if (!email) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    try {
        let alreadySaved = await followingUsers.find({});
        
        const {email: thisUserIsFollowing} = jwt.decode(token);
        let isFollowing = (isCurrentlyFollowing(alreadySaved, thisUserIsFollowing, email));

        return res.status(200).json({message: isFollowing});
    } catch (error) {
        console.log("error is_following: %s", error);
        return res.status(200).json({message: "error"});
    }
}

function isCurrentlyFollowing(allFollowing, userEmail, thisEmail) {
    // this function will decode the jwt and return the same emails
    let flag = false;

    allFollowing.forEach( (item) => {
        
        if (item.account?.length >= 30) {
            
            const {email: currentPosterEmail} = jwt.decode(item.account);
            if (currentPosterEmail === String(userEmail)) {
                item.following.forEach( followers => {
                    if (followers.follower === thisEmail)
                        flag = true;
                })
            }
        }
    });

    return flag;
}

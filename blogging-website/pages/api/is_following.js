import followingUsers from "../../db_models/FollowingSchema";

export default async function handler(req, res) {

    let {email, token} = req.query;

    if (!email) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account";

    try {
        let alreadySaved = await followingUsers.find({"account": token,"following": {$elemMatch: {"follower": email}}});
        return res.status(200).json({message: alreadySaved.length});
    } catch (error) {
        console.log("error is_following: %s", error);
        return res.status(200).json({message: "error"});
    }
}
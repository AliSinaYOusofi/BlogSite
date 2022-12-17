import followingUsers from "../../db_models/FollowingSchema";

export default async function handler(req, res) {

    let {token} = req.query;

    if (!email) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account";

    try {
        let currentlyFollowing = await followingUsers.find({"account": token}, {"followers": 1});
        // TODO
        // now for every current follower user followes i have to get the details of the one's he's
        // following from the updatprofile schmea and for each of it check if there is his data in 
        // update profile schema if not then RegeSchema be queried. thats a todo TODO
        
        return res.status(200).json({message: alreadySaved.length});
    } catch (error) {
        console.log("error is_following: %s", error);
        return res.status(200).json({message: "error"});
    }
}
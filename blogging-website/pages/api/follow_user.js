import followingUsers from "../../db_models/FollowingSchema";

export default async function handler(req, res) {

    
    let {email, token} = req.body;
    
    console.log(email, token);
   
    if (!email) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "POST") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account"; // should be removed after testing
    
    let alreadySaved = await followingUsers.find({"account": token,"following": {$elemMatch: {"follower": email}}});
   
    let accountRegistered = await followingUsers.find({"account": token});
    
    try {
        if (alreadySaved.length) {
            await followingUsers.findOneAndUpdate({"account": token}, { $pull: {"following": {'follower': email}}}).exec();
            return res.status(200).json({message: "delete"});
        }
        else if (accountRegistered.length) {
            await followingUsers.findOneAndUpdate({"account": token}, { $push: {"following": {'follower': email}}}).exec();
            return res.status(200).json({message: "update"});
        }
        await followingUsers.insertMany({"account": token, "following": {"follower": email}});        
        return res.status(200).json({message: "insert"});

    } catch (error) {
        console.log("Error! Getting Likes from dod saveToaccountRoute: %s", error);
        res.status(200).json({message: "got you"});
    }
}

import savedPosts from "../../db_models/savedPosts";

export default async function handler(req, res) {

    
    let {postId, token} = req.body;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "POST") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account"; // should be removed after testing
    
    let alreadySaved = await savedPosts.find({"account": token,"savedPosts": {$elemMatch: {"postId": postId}}});
    let accountRegistered = await savedPosts.find({"account": token});
    try {
        if (alreadySaved.length) {
            await savedPosts.findOneAndUpdate({"account": token}, { $pull: {"savedPosts": {'postId': postId}}}).exec();
            return res.status(200).json({message: "delete"});
        }
        else if (accountRegistered.length) {
            await savedPosts.findOneAndUpdate({"account": token}, { $push: {"savedPosts": {'postId': postId}}}).exec();
            return res.status(200).json({message: "update"});
        }
        await savedPosts.insertMany({"account": token, "savedPosts": {"postId": postId}});        
        return res.status(200).json({message: "insert"});

    } catch (error) {
        console.log("Error! Getting Likes from dod saveToaccountRoute: %s", error);
        res.status(200).json({message: "got you"});
    }
}

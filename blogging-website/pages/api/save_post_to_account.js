import savedPosts from "../../db_models/savedPosts";

export default async function handler(req, res) {

    
    let {postId, token, saved} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "ali's account"
    
    let alreadySaved = await savedPosts.find({"account": token, "postId": postId});

    try {
        if(!Number(saved)) {

            if (alreadySaved.length && alreadySaved[0].savedPosts.includes(postId)) {
                // if already saved then delete it
                await savedPosts.updateOne({"account": token}, { $pull: {"savedPosts": {'postId': postId}}});
                return res.status(200).json({message: "delete"});
            }

            // then if the account exists
            else {
                
                if (alreadySaved.length && !alreadySaved[0].savedPosts.includes(postId)) {

                    await savedPosts.updateOne({"account": token}, { $push: {"savedPosts": {'postId': postId}}});
                    return res.status(200).json({message: "update"});
                }
                 
                await savedPosts.insertMany({"account": token, "savedPosts": {"postId": postId}});
                
                return res.status(200).json({message: "inserted"});
            }
            
            
        }
        // if clicked twice then again it is to be deleted
        let deleteResult = await savedPosts.updateOne({"account": token}, { $pull: {"savedPosts": {'postId': postId}}});
        console.log(deleteResult);
        return res.status(200).json({message: "second delete"});

        
    } catch (error) {
        console.log("Error! Getting Likes from dod saveToaccountRoute: %s", error);
        res.status(200).json({message: "got you"});
    }
}
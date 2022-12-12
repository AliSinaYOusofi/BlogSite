import savedPosts from "../../db_models/savedPosts";

export default async function handler(req, res) {

    
    let {postId, token, saved} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});

    if (!token) token = "missing"
    const alreadySaved = await savedPosts.exists({"account": token});

    console.log(typeof saved);
    // how to know when a user saves or delets from the account.
    try {
        if(!Number(saved)) {

            if (alreadySaved) {
                // then update the doc value
                await savedPosts.updateOne({"account": token}, { $push: {"savedPosts": {'postId': postId}}});
                return res.status(200).json({message: "saved"});
            }
    
            let dataToInsert = new savedPosts({"account": token, "savedPosts": {postId}});
            await dataToInsert.save();
            return res.status(200).json({message: "saved"});
        }

        await savedPosts.updateOne({"account": token}, { $pull: {"savedPosts": {'postId': postId}}});
        return res.status(200).json({message: "delete"});
    } catch (error) {
        console.log("Error! Getting Likes from dod saveToaccountRoute: %s", error);
        res.status(200).json({message: "got you"});
    }
}
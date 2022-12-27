import savedPosts from "../../db_models/savedPosts";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    
    let {postId, token, saved} = req.query;
    
    if (!postId) return res.status(200).json({message: "invalid postId"});

    if (req.method !== "GET") return res.status(200).json({message: "invalid requests"});
    
    let {email: emailOfLiker} = jwt.decode(token);
    let alreadySaved = await savedPosts.find({"account": emailOfLiker, "postId": postId});

    try {  
        if(!Number(saved)) {

            if (alreadySaved.length && getCountOfSpecificPost(alreadySaved, postId)) {
                // if already saved then delete it
                await savedPosts.findOneAndUpdate({"account": emailOfLiker}, { $pull: {"savedPosts": {'postId': postId}}}).exec();
                
                return res.status(200).json({message: "delete"});
            }

            // then if the account exists
            else {
                
                if (alreadySaved.length && !getCountOfSpecificPost(alreadySaved, postId)) {

                    await savedPosts.findOneAndUpdate({"account": emailOfLiker}, { $push: {"savedPosts": {'postId': postId}}}).exec();
                    return res.status(200).json({message: "update"});
                }
                 
                await savedPosts.insertMany({"account": emailOfLiker, "savedPosts": {"postId": postId}});
                
                return res.status(200).json({message: "inserted"});
            }
            
            
        }
        // if clicked twice then again it is to be deleted
        await savedPosts.updateOne({"account": token}, { $pull: {"savedPosts": {'postId': postId}}});
     
        return res.status(200).json({message: "second delete"});

        
    } catch (error) {
        console.log("Error! Getting Likes from dod saveToaccountRoute: %s", error);
        res.status(200).json({message: "got you"});
    }
}

function getCountOfSpecificPost(savedPostsArray, idToSearch) {
    let count = 0;
    savedPostsArray.forEach( item => {
        item.savedPosts.forEach(ids => {
            count += ids.postId === idToSearch ? 1 : 0;
        })
    })
    return count;
}
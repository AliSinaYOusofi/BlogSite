import commentSchema from '../../db_models/commentSchema';
import crypto from 'crypto';

export default async function handler(req, res) {
    

    // so here get the token generate an id 64
    // token as the commenter
    // insert to zero likes that's it 

    let {token, comment, postId} = req.body;

    return res.status(200).json({message: "failed"});

    if (!token) token = "some logged in user";

    try {
        
        // schemaLike skeleton

        // added a randomId for comment which enables use to know which 
        // comments got replied
        const randomIdForComment = crypto.randomBytes(64).toString("hex");
        
        let alreadyExistsPostId = await commentSchema.exists({'postId': postId});
        
        // if there is no commments with the postId then insert
        // otherwise update the comments
        if (!alreadyExistsPostId) {
        
            await commentSchema.insertMany({
                'postId': postId,
                comments: {
                    commentId: randomIdForComment,
                    who: token,
                    data: comment
                }
            });
            return res.status(200).json({message: "saved"});
        }

        // otherwise update the db
        
        await commentSchema.updateOne({ 'postId': postId},{
               
            $push: {
                comments: {
                    commentId: randomIdForComment,
                    who: token,
                    data: comment
                }
            }
        });
        
        return res.status(200).json({message: "saved"});
    } catch (error) {
        console.log("Error Saving comment: %s", error);
        return res.status(200).json({message: "failed"});
    }
}
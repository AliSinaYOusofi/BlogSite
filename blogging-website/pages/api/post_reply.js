import commentSchema from '../../db_models/commentSchema';
import crypto from 'crypto';

export default async function handler(req, res) {
    

    // so here get the token generate an id 64
    // token as the commenter
    // insert to zero likes that's it

    let {token, postId, reply} = req.body;

    if (!token) token = "some logged in user";

    try {
        
        // schemaLike skeleton 
        const randomIdForCommentReply = crypto.randomBytes(64).toString("hex");

        await commentSchema.update({'postId': postId,}, {
            $push: {
                replies:
                    {
                        replyId: randomIdForCommentReply,
                        data: reply,
                        who: token,
                }
            }
        });
       
        return res.status(200).json({message: "saved"});
    } catch (error) {
        console.log("Error Saving comment: %s", error);
        return res.status(200).json({message: "failed"});
    }
}
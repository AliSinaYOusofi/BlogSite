import commentSchema from '../../db_models/commentSchema';

export default async function handler(req, res) {
    

    // so here get the token generate an id 64
    // token as the commenter
    // insert to zero likes that's it

    let {token, comment, postId} = req.body;

    if (!token) token = "some logged in user";

    try {
        
        // schemaLike skeleton
        const dataToAdd = new commentSchema( {
            postId,
            comments: [
                {
                    who: token,
                    data: comment
                }
            ]
        } );

        await dataToAdd.save();
        
        return res.status(200).json({message: "saved"});
    } catch (error) {
        console.log("Error Saving comment: %s", error);
        return res.status(200).json({message: "failed"});
    }
}
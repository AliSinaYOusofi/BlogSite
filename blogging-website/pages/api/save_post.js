import crypto from 'crypto';
import connection from '../../db_connection/mongoose.db.config';
import postSchema from '../../db_models/UserPosts';

// start the connection

export default async function(req, res) {

    if (req.method === "POST") {
        
        await connection();
        const accessToken = req.headers.authorization?.split(" ")[1] || "token";
        console.log(accessToken, 'acces token in save post route');
        const randomNumberForPost = crypto.randomBytes(64).toString("hex");
        const {imageUrls, content} = req.body;
        
        // now we should be able to post, and know that which user is posting the data

        // what to save
        let newPost = new postSchema( {
            id: randomNumberForPost,
            poster: accessToken,
            content: content,
            imageUrls: imageUrls?.length ? [...imageUrls] : []
            // the post section is empty sincce we
            // don't have any comments at the starting position
        });
        try {
            await newPost.save();
            return res.status(200).json({message: "saved"});
        } catch (error) { console.log(error, '*********************') ;res.status(200).json({message: "failed"})}
    }
    else
        return res.status(200).json({message: "only post requests sir/Madam"});
}
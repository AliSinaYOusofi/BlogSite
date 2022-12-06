import postSchema from "../../db_models/UserPosts";

export default async function handler(req, res) {

    const {postid: postId} = req.headers;
    
    if (! postId) return res.status(200).json({message: "invalid post id"});
    // or re-route to somewhre or show the error page
    if (req.method !== "GET") return res.status(200).json({message: "only Reqs"})

    // now i should query the db for that post only.
    
    // how should i show the images and texts in the order that they were
    // posted. little hard task for now it is hard. but i will find a way
    // to solve it I always do.

    // for now let's get the posts from the cluster

    try {
        const queryResult = await postSchema.find({'id': postId});
        
        // now should i remove the image urls from the text
        // or no. this is the hard one to decide.
        return res.status(200).json({message: 'done', posts: queryResult})

        
    } catch (error) {
        console.log("Failed to get post given the post %s", postId);
        return res.status(200).json({message: "queryError"})
    }
}
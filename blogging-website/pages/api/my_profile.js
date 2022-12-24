import jwt from 'jsonwebtoken';
import UpdateProfileSchema from '../../db_models/UpdateProfile';
import connection from "../../db_connection/mongoose.db.config";
import postSchema from '../../db_models/UserPosts';


export default async function handler(req, res) {

    // if (req.method !== "GET") return res.status(200).json({message: "only get reqs"});

    // todo: get the key decode the data.
    // get the email
    // get the data from the cluster based on the email
    // wrap the data and send it

   

    const {token} = req.query;

    await connection();
    
    if(! token) return res.status(200).json({message: "invalid key"});
    
    const {email: profileEmail} = jwt.decode(token);
    
    if(!profileEmail) return res.status(200).json({message: "invalid email"});

    
    try {
        // updating the db . updateOne(filter, setter);
        const result = await UpdateProfileSchema.findOne({"email": profileEmail}, {"password": 0});
        res.status(200).json({message: "done", profileData: [result]});
    
    } catch (error) { 
        console.log(error);
        res.status(200).json({message: "queryError"});
    }
}
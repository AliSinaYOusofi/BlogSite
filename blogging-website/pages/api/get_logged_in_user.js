import jwt from 'jsonwebtoken';
import UpdateProfileSchema from '../../db_models/UpdateProfile';

export default async function handler(req, res) {

    const token = req.query.token;

    if (req.method !== "GET") return res.status(200).json({message: "only get requests"});
    else if(!token) return res.status(200).json({message: "invalid token"});

    try {
        // query the registeration schema for username and email
        // and for profileurl query the postSchema
        const {email: inEmail, username: inUsername} = jwt.decode(token);
        console.log(inEmail, inUsername, "********************");

        const queryResult = await UpdateProfileSchema.findOne({"email": inEmail}, {"profileUrl": 1});
        
        console.log(queryResult);
        
        let inProfile;
        if (queryResult) {
            const [{profileUrl: inProfile = ""}] = queryResult;
        }
        
        return res.status(200).json({message: "gotIt", logged: [{inEmail, inProfile, inUsername}]});
    }catch(error) {
        console.log("Error in get_logged_in_user: %s", error);
        return res.status(200).json({message: "serverError"});
    }
}
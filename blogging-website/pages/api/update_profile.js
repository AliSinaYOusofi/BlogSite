import connection from "../../db_connection/mongoose.db.config";
import jwt from 'jsonwebtoken';
import RegisterationSchema from '../../db_models/RegisterationSchema';
import UpdateProfileSchema from '../../db_models/UpdateProfile';

// function to return the details of the given email

async function getDetailsGivenEmail(email) {
    try {
        let queryResult = await RegisterationSchema.find({'email': email});
        return queryResult;
    } catch (error) { return }
}

export default async function handler(req, res) {
    
    let {
        token,
        username,
        password,
        visibility,
        place,
        bio,
        university,
        profileUrl,
        jobTitle
    } = req.body.dataToSend; // got the data
    
    let sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbWVwYWdlQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaGVsbG8iLCJpYXQiOjE2Njk5MTg1ODV9.y80GRX1Gsw9ymHvUhsPN3MpmYg9_beHyV9t9EFtkEjQ";

    await connection();
    // verify the key, take the email part, request the preiouse database.
    // now according to the token search database from the previous database
    // get all creds from that database, and for the values that are null
    // instead of null insert the ones from the previous database

    let {email: previouseDBEmail} =  jwt.decode(sampleToken);
    let queryResult = await getDetailsGivenEmail(previouseDBEmail);
   
    if(!queryResult) return res.status(200).json({message: "not found"}); // if the token is inavlid

    const [ 
        {   email: previousEmail,
            username: previousUsername,
            password: previousPassword,
            public: previousPublic
        }
    ] = queryResult;

    // now making my schema
    // if new provided values are null then take the previous one
    // if not null take the values and save it to db.

    // we only need to check these values.
    username = username || previousUsername;
    password = password || previousPassword;
    visibility = visibility !== null ? visibility : previousPublic;
    

    // the data to be inserted
    
    let dataToBeInserted = new UpdateProfileSchema({
        email: previouseDBEmail,
        username,
        password,
        public: visibility,
        place,
        bio,
        profileUrl,
        title: jobTitle,
        university
    });

    // so basically data is saved to updatedProfiles collection now
    // back to front-end and actually show it

    try {
        await dataToBeInserted.save();
        res.status(200).json({message: "updated"});
    } catch (error) {
        console.log(error, "*******************");
        res.status(200).json({message: "queryError"});
    }
}
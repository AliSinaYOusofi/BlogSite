import connection from "../../db_connection/mongoose.db.config";
import jwt from 'jsonwebtoken';
import RegisterationSchema from '../../db_models/RegisterationSchema';

// function to return the details of the given email

async function getDetailsGivenEmail(email) {
    try {
        let queryResult = await RegisterationSchema.find({'email': email});
        return queryResult;
    } catch (error) { return }
}

export default async function handler(req, res) {
    
    const {
        token,
        username,
        password,
        visibility,
        place,
        bio,
        university,
        profileUrl
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

    
    // now making my schema 
    res.status(200).json({message: "updated"});
}
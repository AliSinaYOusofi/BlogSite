// for mongodb atlas
import connection from '../../../db_connection/mongoose.db.config';
import RegisterationSchema from '../../../db_models/RegisterationSchema';
// for hashing password
import bcrypt, { genSalt, genSaltSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

// for password checking
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}
// for delaying before querying

async function findEmailDuplicates(field) {
    // checking if email already exists
    let exists;
    try {
        exists = await RegisterationSchema.exists({email: field});
    } catch (error) { console.log(error, "error on findEmailDups function()")}
    console.log(exists, "fucking exists or not");
    return await exists;
}


export default async function handler(req, res) {
    
    const {email, password} = req.body; // got it.

    // start the connection
    await connection();

    
    // what to sign data with: username, email is enough
    // then check these things against the website. since we
    // have the secret that makes it safe enough.

    // check emails exists in database. if (true) then check login functionlity
    let emailExists = await findEmailDuplicates(email);
    
    if (emailExists) {
        // email is valid. check the password
        const user = await RegisterationSchema.find({'email': email});
        console.log(password);
        if (comparePasswordHash(password, user[0].password)) {
            // signing using only email
            const signData = {email, username: user[0]?.username};
            const accessToken = jwt.sign(signData, process.env.JWT_SECRET); // is unsafe
            return res.status(200).json({message: "success", accessToken});
        }
        else return res.status(200).json({message: "notyou"});
    } else return res.status(200).json({message: "unreged"});
    
}
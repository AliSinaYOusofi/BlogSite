// for mongodb atlas
import connection from '../../db_connection/mongoose.db.config';
import RegisterationSchema from '../../db_models/RegisterationSchema';
// for hashing password
import bcrypt from 'bcrypt';

// for password checking
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}
// for delaying before querying
const sleepFor = async(time) => { return new Promise(resolved => setTimeout(resolved, time));}

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
    connection();

    // for front-end send based on this var
    let isValidUser;

    // check emails exists in database. if (true) then check login functionlity
    let emailExists = await findEmailDuplicates(email);
    
    if (emailExists) {
        // email is valid. check the password
        const user = await RegisterationSchema.find({'email': email});
        
        // destructing
        const [ {email: dbEmail, password: dbPassword}] = user; // nicely
        const isValidUser = (password, comparePasswordHash(password, dbPassword));
        
    } else { 
        console.log("no user"); 
        isValidUser = false;
    }
    
    // sending based on isValidUser var.
    // also using jwt for auth
    res.status(200).json({message: "checking creds"});
}
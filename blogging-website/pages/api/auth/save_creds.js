require('dotenv').config();
import bcrypt, { genSaltSync } from 'bcrypt';
// import RegisterationSchema from '../../db_models/RegisterationSchema';
import RegisterationSchema from '../../../db_models/RegisterationSchema';
import connection from '../../../db_connection/mongoose.db.config';

function hashPassword(password) { return bcrypt.hashSync(password, 10); }


// sleep funciton
// since connecting to our cluster takes about 30-40 seconds

const sleepFor = async(time) => { return new Promise(resolved => setTimeout(resolved, time));}

async function findEmailDuplicates(field) {
    // checking if email already exists
    let exists;
    try {
        exists = await RegisterationSchema.exists({email: field});
    } catch (error) { console.log(error, "error on findEmailDups function()")}
    return await exists;
}

export default async function handler(req, res) {  
    
    let isSaved = true;
    let isDuplicate = false;
    // connection to database
    const {email, password, username, visibility} = req.body; 
    // insertin the dat
    const conn = connection();

    try {
        
        const dataToBeInserted = {
            email: email,
            username: username,
            password: bcrypt.hashSync(password, genSaltSync(10)),
            public: visibility
        }
        
        await sleepFor(1000);
        // before saving:
        // 1: check for dups email

        const isDuplicateFunc = await findEmailDuplicates(email)

        if (isDuplicateFunc === null) await RegisterationSchema.insertMany(dataToBeInserted);
           
        else {
            isDuplicate = true;       
            isSaved = false;
        }
    } catch (error) { isSaved = false; console.log(error, 'error saving');}
    
    if (isSaved) res.status(200).json({message: "created"})
    else if (isDuplicate) res.status(200).json({message: "duplicate"});
    else res.status(200).json({message: "server"});
}
require('dotenv').config();
import bcrypt from 'bcrypt';
// import RegisterationSchema from '../../db_models/RegisterationSchema';
import RegisterationSchema from '../../db_models/RegisterationSchema';
import connection from '../../db_connection/mongoose.db.config';


function hashPassword(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}


// sleep funciton
// since connecting to our cluster takes about 30-40 seconds

const sleepFor = async(time) => { return new Promise(resolved => setTimeout(resolved, time));}

async function findEmailDuplicates(field) {
    
    // checking if email already exists

    try {
        RegisterationSchema.exists({email: field}, function(error, doc) {
            if (error) {

            }
            else
                console.log(doc);
        })
    } catch (error) { console.log(error, "error on findEmailDups function()")}
}
export default async function handler(req, res) {  
    
    let isSaved = true;
    // connection to database
    const {email, password, username, visibility} = req.body; 
    // insertin the dat
    const conn = connection();

    try {
        const passwordHash = hashPassword(password);
        
        const dataToBeInserted = {
            email: email,
            username: username,
            password: passwordHash,
            public: visibility
        }
        // making a delay before saving to database

        findEmailDuplicates(email);
        // await sleepFor(1000);
        // console.log("time")
        // // before saving:
        // // 1: check for dups email
        // const result = await users.insertMany(dataToBeInserted);
        // console.log(result);
    } catch (error) { isSent = false; console.log(error);}
    
    isSaved ? res.status(200).json({message: "got you"}) : res.status(500).json({message: "failed"});
}
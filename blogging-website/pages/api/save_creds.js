require('dotenv').config();
import mongooseConnectDB from '../../db_connection/mongoose.db.config';
import bcrypt from 'bcrypt';
// import RegisterationSchema from '../../db_models/RegisterationSchema';
import mongoose from 'mongoose';


function hashPassword(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}


export default async function handler(req, res) {  
   
    // connection to database
    const {email, password, username, visibility} = req.body; 
    // insertin the dat

    mongoose.connect(process.env.MONGO_AUTH, () => { console.log("connected") })

    try {
        const passwordHash = hashPassword(password);
        
        const dataToBeInserted = {
            email: email,
            username: username,
            password: passwordHash,
            public: visibility
        }

        const result = await mongoose.model("model").insertMany(dataToBeInserted);
        console.log(result);
    } catch (error) { console.log(error);}
    
     
    
    res.status(200).json({message: "got you"});
}
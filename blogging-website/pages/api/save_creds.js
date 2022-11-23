require('dotenv').config();
const mongoose = require("mongoose");
import RegisterationSchema from '../../db_models/RegisterationSchema';
import mongooseConnectDB from '../../db_connection/mongoose.db.config';



export default async function handler(req, res) {
   
    mongooseConnectDB(process.env.MONGO_AUTH); // connection to database 
    // insertin the data

    try {
        
    } catch (error) { console.log(error);}
    const {email, password, username} = req.body;
    
    
    res.status(200).json({message: "got you"});
}
require('dotenv').config();
import mongooseConnectDB from '../../db_connection/mongoose.db.config';
import bcrypt from 'bcrypt';
import RegisterationSchema from '../../db_models/RegisterationSchema';
import mongoose from 'mongoose';


function hashPassword(password) { return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); }
function comparePasswordHash(password, hash) { return bcrypt.compareSync(password, hash);}


// sleep funciton
// since connecting to our cluster takes about 30-40 seconds

const sleepFor = async(time) => { return new Promise(resolved => setTimeout(resolved, time));}

export default async function handler(req, res) {  
   
    // connection to database
    const {email, password, username, visibility} = req.body; 
    // insertin the dat

    mongoose.connect(process.env.MONGO_AUTH, () => { console.log("connected") })
    const connection = mongoose.connection;
     
    connection.on("open", async () => {
        try {
            const passwordHash = hashPassword(password);
            
            const dataToBeInserted = {
                email: email,
                username: username,
                password: passwordHash,
                public: visibility
            }
            // making a delay before saving to database
            
            console.log("time")
            const result = new RegisterationSchema(dataToBeInserted)

            result.save(function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("inserted", data);
                    res.send("Data inserted");
                }
            });
            console.log(result);
        } catch (error) { console.log(error);}
    })
    
    
     
    
    res.status(200).json({message: "got you"});
}
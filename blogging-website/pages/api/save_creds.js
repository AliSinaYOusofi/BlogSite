require('dotenv').config();
const mongoose = require("mongoose");



export default async function handler(req, res) {
    mongoose.connect(process.env.MONGO_AUTH, () => console.log("Connected! You are the one"));
    console.log(process.env.MONGO_AUTH); // connection is working just fine
    res.status(200).json({message: "got you"});
}
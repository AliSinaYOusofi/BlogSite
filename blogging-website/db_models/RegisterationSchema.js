const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        validate: {
            validator: value => String(value).length >= 1,
            message: props => `${props} should be more than 1(length)`
        },
        immutable: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true,
        immutable: true
    },

    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        lowercase: true
    },
});


// should work a lot on the backend

// our pre middle-ware
// 1: document middle-ware

registerSchema.pre("save", function(next) {
    let err;

    try {
        console.log("dummy hook");    
    } catch (error) {
        err = error;
        console.log(err);
    }
    // calling next with argument is assumed to be an error
    next(err); // on to the next middle-ware
});

// validate hook will be called before anything else
registerSchema.pre("validate", function(error, doc, next) {

    if (error.name === "MongoServerError" && error.code === 11000) // middle ware error
        next(new Error("Mongo Server occurred code: 11000")); // catching specific errors
    
    this.email = String(this.email).trim();
    this.username = String(this.username).trim();
    this.password = String(this.password).trim();

    if (!(this.email && this.password && this.username)) {
        next(new Error("lengths are standard, errror"));
        return;
    }
    next(); // back to post or pre
})

// post middle-ware is called when pre is done
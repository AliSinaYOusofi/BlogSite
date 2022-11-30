import mongoose from "mongoose";

const viewSchema = mongoose.Schema( {
    date : {
        type: Date,
        default: () => Date.now(),
        required: false
    },
    count: {
        type: Number,
        required: true,
        default: 0,
        vlidate : {
            validator: counter => counter >= 0,
            message: counter => `counter be greater than ${counter}`
        },
        immutable: true,
        uniqe: true,
    },
    country: {
        type: String,
        required: true,
        immutable: true,
        uniqe: false
    }
});

// module.exports = mongoose.models.websiteCount || mongoose.model("websiteCount", viewSchema);
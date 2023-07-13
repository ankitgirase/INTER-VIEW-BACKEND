import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
    companyName : {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true
    },
    offer:{
        type: String,
        required: true,
    },
    rounds:{
        type: Number,
        required: true,
    },
    process:{
        type: String,
        required: true,
    },
    difficulty:{
        type: String,
        required: true,
    },
    userOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
})

export const InterviewModel = mongoose.model("interviews", InterviewSchema);
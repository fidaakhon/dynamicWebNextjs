import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
    id : {
        type: Number,
        default:0
    },
    title : {
        type: String,
        required: true,
    },
    content : {
        type: String,
        required: true,
    },

}, {timestamps: true})

export const Joke =  mongoose.models.Joke || mongoose.model("Joke", jokeSchema);
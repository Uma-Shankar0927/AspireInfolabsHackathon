import mongoose from "mongoose";

const UserPoints = new mongoose.Schema({
    email: {type: String, required: true},
    points: {type: Number, required: true, default:0},
    lastDay: {type: String, required: true, }
})

const PostSchema = mongoose.model('UserPoints',UserPoints);

export default PostSchema;
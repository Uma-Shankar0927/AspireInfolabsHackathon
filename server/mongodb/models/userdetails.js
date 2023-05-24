import mongoose from "mongoose";

const UserDetails = new mongoose.Schema({
    email: {type: String, required: true},
    height: {type: String, required:true},
    age: {type: String, required: true},
    weight: {type: String, required: true},
    bmi: {type: String, required: true},
    desiese: {type: String, required:true}
})

const PostSchema = mongoose.model('UserDetails',UserDetails);

export default PostSchema;
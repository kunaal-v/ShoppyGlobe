import mongoose from "mongoose";
const { Schema } = mongoose;

const registerSchema = new Schema({
    fullname:String,
    email:String,
    password:String
});

const registerModel = mongoose.model("user", registerSchema);
export default registerModel;
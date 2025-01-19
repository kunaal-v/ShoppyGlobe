import mongoose from "mongoose";
const { Schema } = mongoose;
// a schema for the registration of the user is created
const registerSchema = new Schema({
    fullname:String,
    email:String,
    password:String
});
// register model is created based on the above schema and collection name is users
const registerModel = mongoose.model("user", registerSchema);
export default registerModel;
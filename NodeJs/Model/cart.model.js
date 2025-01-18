import mongoose from "mongoose";
;
const {Schema}=mongoose
const cartSchema = new Schema({
    id:Number,
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: String,
    stock: Number,
    tags:Array,
    brand: String,
    availabilityStatus: String,
    reviews: Array,
    images: Array,
    quantity: Number,
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
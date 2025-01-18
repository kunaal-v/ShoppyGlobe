import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
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
    images: Array
});

const productModel = mongoose.model("products", productSchema);
export default productModel;
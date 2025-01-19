import mongoose from "mongoose";
const { Schema } = mongoose;
// a schema to add a product to the database is created
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
// product model is created based on the above schema and collection name is products
const productModel = mongoose.model("products", productSchema);
export default productModel;
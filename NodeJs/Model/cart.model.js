import mongoose from "mongoose";
;
const {Schema}=mongoose
// a schema  to store the product to the cart is created
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
// cart model is created based on the above schema and collection name is carts
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
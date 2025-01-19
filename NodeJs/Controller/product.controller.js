import productModel from "../Model/products.model.js";
// this function is to fetch all the products from the database
export function getProducts(req, res) {
    productModel.find().then((data) => {
        if(!data) {
           return res.status(404).json({message:"Product not found"});
        }
        return res.send(data);
    }).catch((err) => {
        res.send({message:err.message});
    });
}
// this function is to create or add new product to the database
export function createProduct(req, res) {
    const { id,category, description, discountPercentage, stock,brand,availabilityStatus,images, price, rating, reviews, tags, title } = req.body;
    const newProduct = new productModel({
        id,
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        availabilityStatus,
        reviews,
        images,
        });
    newProduct.save().then((data) => {
        if(!data) {
            res.status(400).send("Product not created");
        }
        res.send(data);
    }).catch((err) => { 
        res.send(err);
    });
}
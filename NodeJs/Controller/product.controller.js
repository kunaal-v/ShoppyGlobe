import productModel from "../Model/products.model.js";
export function getProducts(req, res) {
    productModel.find().then((data) => {
        if(!data) {
           return res.status(404).json({message:"Product not found"});
        }
        res.send(data);
    }).catch((err) => {
        res.json({message:err.message});
    });
}
export function findwithId(req, res, next) {
    const id = req.params.id;
    productModel.findById(id).then((data) => {
        if(!data) {
            return res.status(404).json({message:"Product not found"});
        }
        req.product = data;
        next();
    }).catch((err) => {
        res.json({message:err.message});
    });     
}
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
import cartModel from "../Model/cart.model.js";

export function fetchCart(req, res) {
    cartModel.find()
        .then(products => {
            return res.send(products);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching cart", error: err.message });
        });
}

export function removeFromCart(req, res) {
    const { id } = req.body;
    cartModel.findOne({ id })
        .then(product => {
            if (product) {
                // Product exists, increment quantity by 1
                cartModel.findByIdAndUpdate(
                    product._id,  // Use MongoDB's default _id for the update
                    { $inc: { quantity: -1 } },  
                    { new: true }  // Return the updated product
                )
                    .then(updatedProduct => {
                        if(updatedProduct.quantity === 0) {
                            // If quantity is 0, remove the product from the cart
                            cartModel.findByIdAndDelete(updatedProduct._id)
                                .then(() => {
                                    return res.status(200);
                                })
                                .catch(err => {
                                    return res.status(500).json({ message: "Error removing product from cart", error: err.message });
                                });
                        }
                        return res.json("quantity decreased by 1");  // Send back the updated product
                    })
                    .catch(err => {
                        return res.status(500).json({ message: "Error updating product", error: err.message });
                    });
            }
        }).catch(err => {
            return res.status(500).json({ message: "Error finding product", error: err.message });
            });
}

export function updateCart(req, res) {
    const { id } = req.body;
    cartModel.findOne({ id })
        .then(product => {
            if (product) {
                // Product exists, increment quantity by 1
                cartModel.findByIdAndUpdate(
                    product._id,  // Use MongoDB's default _id for the update
                    { $inc: { quantity: 1 } },  
                    { new: true }  // Return the updated product
                )
                    .then(updatedProduct => {
                        if (!updatedProduct) {
                            return res.status(400).json({ message: "Product not updated in cart" });
                        }
                        return res.status(200).json("quantity increased by 1") // Send back the updated product
                    })
                    .catch(err => {
                        return res.status(500).json({ message: "Error updating product", error: err.message });
                    });
            }
        }
        ).catch(err => {
            return res.status(500).json({ message: "Error finding product", error: err.message });
        });
}
    
export function addToCart(req, res) 
{
    const { id, title, description, category, price, discountPercentage, rating, stock, tags, brand, availabilityStatus, reviews, images } = req.body;
    // Product doesn't exist in the cart, create a new product
    cartModel.findOne({ id }).then(product => {
    if (product)
    {
        return res.status(400)
    }
    else{
        const newProduct = new cartModel({
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
            quantity: 1,  // New product starts with quantity 1
        });

        // Save the new product
        newProduct.save()
            .then(savedProduct => {
                if (!savedProduct) {
                    return res.status(400).json({ message: "Product not created in cart" });
                }
                return res.status(200).json("added to the cart");
            })
            .catch(err => {
                return res.status(500).json({ message: "Error saving product", error: err.message });
            });
    }  
    }).catch(err => {
    return res.status(500).json({ message: "Error finding product", error: err.message });
    });
            
}

export function clearCart(req,res){
    cartModel.deleteMany().then(()=>{res.json("cart has been cleared and is empty now.")}).catch(err=>{return res.status(500).json({message:"Error clearing cart",error:err.message})});
}

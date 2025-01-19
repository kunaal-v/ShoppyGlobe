import cartModel from "../Model/cart.model.js";
// this function is fetch all the cart products form the database
export function fetchCart(req, res) {
    cartModel.find()
        .then(products => {
            return res.send(products);
        })
        .catch(err => {
            return res.status(500).json({ message: "Error fetching cart", error: err.message });
        });
}

// this function is to decrease the quantity of the cart item and if the quantity is 0 the remove the product form the database(i.e. cart)
export function removeFromCart(req, res) {
    const { id } = req.body;
    cartModel.findOne({ id })
        .then(product => {
            if (product) {
                cartModel.findByIdAndUpdate(
                    product._id, 
                    { $inc: { quantity: -1 } },  
                    { new: true } 
                )
                    .then(updatedProduct => {
                        if(updatedProduct.quantity === 0) {
                            cartModel.findByIdAndDelete(updatedProduct._id)
                                .then(() => {
                                    return res.status(200);
                                })
                                .catch(err => {
                                    return res.status(500).json({ message: "Error removing product from cart", error: err.message });
                                });
                        }
                        return res.json("quantity decreased by 1"); 
                    })
                    .catch(err => {
                        return res.status(500).json({ message: "Error updating product", error: err.message });
                    });
            }
        }).catch(err => {
            return res.status(500).json({ message: "Error finding product", error: err.message });
            });
}
// this function is to increase the quantity of the product form the cart
export function updateCart(req, res) {
    const { id } = req.body;
    cartModel.findOne({ id })
        .then(product => {
            if (product) {
               
                cartModel.findByIdAndUpdate(
                    product._id,  
                    { $inc: { quantity: 1 } },  
                    { new: true }  
                )
                    .then(updatedProduct => {
                        if (!updatedProduct) {
                            return res.status(400).json({ message: "Product not updated in cart" });
                        }
                        return res.status(200).json("quantity increased by 1") 
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
// this function is to add the new item to the database(i.e. cart)
export function addToCart(req, res) 
{
    const { id, title, description, category, price, discountPercentage, rating, stock, tags, brand, availabilityStatus, reviews, images } = req.body;
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
            quantity: 1,  
        });

        
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
// this function is to clear the cart (i.e. empty the cart) means empty the cart collection from the database
export function clearCart(req,res){
    cartModel.deleteMany().then(()=>{res.json("cart has been cleared and is empty now.")}).catch(err=>{return res.status(500).json({message:"Error clearing cart",error:err.message})});
}

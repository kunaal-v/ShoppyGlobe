import { addToCart,fetchCart,updateCart,removeFromCart,clearCart } from "../Controller/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
//routes are defined and functions are calling from the controller based on the path


export function cartRoutes(app)
{
    app.post("/api/cart", addToCart);
    // verifyToken is a middleware which is to verify if the user is logged in or not before accessing the cart data
    app.get("/api/cartProducts",verifyToken, fetchCart);
    app.put("/api/addCart", updateCart);
    app.put("/api/removeCart", removeFromCart);
    app.delete("/api/clearCart", clearCart);

}
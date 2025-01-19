import { addToCart,fetchCart,updateCart,removeFromCart,clearCart } from "../Controller/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export function cartRoutes(app)
{
    app.post("/api/cart", addToCart);
    app.get("/api/cartProducts",verifyToken, fetchCart);
    app.put("/api/addCart", updateCart);
    app.put("/api/removeCart", removeFromCart);
    app.delete("/api/clearCart", clearCart);

}
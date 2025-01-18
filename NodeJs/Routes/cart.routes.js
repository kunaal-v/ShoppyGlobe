import { addToCart,fetchCart,updateCart,removeFromCart,clearCart } from "../Controller/cart.controller.js";

export function cartRoutes(app)
{
    app.post("/api/cart", addToCart);
    app.get("/api/cartProducts", fetchCart);
    app.put("/api/addCart", updateCart);
    app.put("/api/removeCart", removeFromCart);
    app.delete("/api/clearCart", clearCart);

}
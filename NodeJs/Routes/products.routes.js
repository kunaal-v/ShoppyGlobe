import { createProduct , getProducts} from '../Controller/product.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
//routes are defined and functions are calling from the controller based on the path
export function routes(app) {
    app.post("/api/product", createProduct);
    // verifyToken is a middleware which is to verify if the user is logged in or not before accessing the products data
    app.get("/api/products",verifyToken, getProducts);
}
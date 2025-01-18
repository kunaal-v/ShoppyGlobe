import { createProduct , getProducts} from '../Controller/product.controller.js';
import { verifyToken } from "../middlewares/verifyToken.js";
export function routes(app) {
    app.post("/api/product", createProduct);
    app.get("/api/products",verifyToken, getProducts);
}
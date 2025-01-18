import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes/products.routes.js";
import cors from "cors";
import { cartRoutes } from "./Routes/cart.routes.js";
import { registerRoutes } from "./Routes/register.routes.js";
const app = express();
app.listen(5861, () => {
    console.log("listening to port 5861");
});
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
routes(app);
cartRoutes(app);
registerRoutes(app);
mongoose.connect(
    "mongodb+srv://ShoppyGlobe:Kunal231217@cluster0.bqoca.mongodb.net/"
    );

const db = mongoose.connection;
db.on("open", () => {
    console.log("connection is successful");
});
db.on("error", (error) => {
    console.error("Error in DB connection:", error);
});
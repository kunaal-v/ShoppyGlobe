import { registerUser,logIn } from "../Controller/register.controller.js";
//routes are defined and functions are calling from the controller based on the path
export function registerRoutes(app)
{
    app.post("/api/register",registerUser);
    app.post("/api/login",logIn)
}
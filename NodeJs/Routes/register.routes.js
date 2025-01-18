import { registerUser,logIn } from "../Controller/register.controller.js";

export function registerRoutes(app)
{
    app.post("/api/register",registerUser);
    app.post("/api/login",logIn)
}
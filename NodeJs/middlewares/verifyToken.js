
import registerModel from "../Model/register.model.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    
    // Check if the authorization header is present
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        // check if the token is not present in the header, if not then return with message
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        jwt.verify(token, "mySecretKey231217", (err, verifiedToken) => {
            if (err) {
                // Handle specific JWT errors (e.g., token expired)
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json( "Token has expired" );
                }
                return res.status(403).json({ message: err.message });
            }

            // Find user by the decoded _id from the token
            registerModel.findById(verifiedToken._id).then((user) => {
                req.user = user;
                next();
            }).catch(err => {
                return res.status(500).json({ message: err.message });
            });
        });
    } else {
        // If no authorization header is provided
        return res.status(401).json({ message: "Authorization header is missing" });
    }
}

// import registerModel from "../Model/register.model.js";
// import jwt from "jsonwebtoken"

// export function verifyToken(req,res,next)
// {    
    
//     if(req.headers&&req.headers.authorization &&req.headers.authorization .split(" ")[1]!=null)
//     {
//         jwt.verify(req.headers.authorization .split(" ")[1],"mySecretKey231217",
//         function(err,verifyToken){
//             if(err){
//                 return res.status(403).json({message:err});
//             }
//             registerModel.findById(verifyToken._id).then((user)=>{
//                 req.headers.user=user;
//                 next();
//             }).catch(err=>res.status(500).json({message:err.message}))
//         }
//     )
//     }
//     else{
//         res.status(404).json({message:"Token is not present"});
//         next();
//     }
// }

import registerModel from "../Model/register.model.js";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    
    // Check if the authorization header is present
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }

        jwt.verify(token, "mySecretKey231217", (err, verifiedToken) => {
            if (err) {
                // Handle specific JWT errors (e.g., token expired)
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Token has expired" });
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

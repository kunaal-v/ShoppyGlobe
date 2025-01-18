import registerModel from "../Model/register.model.js";
import jwt from "jsonwebtoken"

export function verifyToken(req,res,next)
{    
    if(req.headers&&req.headers.authurization&&req.headers.authurization.split(" ")[1]!=null)
    {
        jwt.verify(req.headers.authurization.split(" ")[1],"mySecretKey231217",
        function(err,verifyToken){
            if(err){
                return res.status(403).json({message:err});
            }
            registerModel.findById(verifyToken._id).then((user)=>{
                req.user=user;
                next();
            }).catch(err=>res.status(500).json({message:err.message}))
        }
    )
    }
    else{
        res.status(404).json({message:"JWT Token not Available"});
        next();
    }
}
import registerModel from "../Model/register.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// this function is to register the user to the database
export function registerUser(req,res){
    const {fullname,email,password}=req.body;
    registerModel.findOne({email}).then((data)=>{
        if(data)
        {
            return res.status(403).json({message:"already exist"})
        }
        else
        {
            const user=new registerModel({
                fullname,
                email,
                password:bcrypt.hashSync(password,10),
            })
            user.save().then((data)=>{
                if(!data)
                {
                    return res.status(400).json({message:"user not registered"});
                }
                 return res.status(200).json({message:data});
            })
        }
        
    }).catch(err=>res.status(500).json({message:err.message}));
    
}
//this function is to login the user to website if the user is register and its email, password  is correct and token is verified.
export function logIn(req,res){
    const {email,password}=req.body;
    registerModel.findOne({email}).then((data)=>{
        
        if(!data)
        {
            return res.status(404).json("user not exist")
        }
        const validatePassword=bcrypt.compareSync(password,data.password);
        if(!validatePassword)
        {
            return res.status(403).json("invalid password")
        }
        const token=jwt.sign({id:data._id},"mySecretKey231217",{expiresIn:"1m"});
        res.send({
            user:{
                fullname:data.fullname,
                email:data.email,
                password:data.password,
            },
            accessToken:token,
        });
    }).catch((err)=>res.status(500).json({message:err.message}));
        
    }

const mongoose = require('mongoose');
const list = require("../model/UserModels");
const UserModel = list.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const JwtToken = (_id) => {
      const key = process.env.JWT_KEY;
      return jwt.sign({_id},key,{expiresIn : "3d"}); 
}

const userRegister = async(req,res) => {
     try{
        const {name , email , password} = req.body;

        let user = await UserModel.findOne({email});
    
        if(user){
            return res.status(400).json("User already registered");
        }
        
        if(!name || !email || !password) return res.status(400).json("No field should be empty");
    
        // if(!validator.isEmail(email)) 
        //             return res.status(400).json("enter a valid email");
    
        if(!validator.isStrongPassword(password)) 
                    return res.status(400).json("Enter a strong password");
                 
    
        user = new UserModel({
            name,
            email,
            password
        });
        console.log(name);
        console.log(email);
        console.log(password);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save()
        .then(() => {
            const token = JwtToken(user._id);
            res.status(200).json({_id : user._id,name,email,token});
        })
     }
     catch(err){
        console.log(err);
     }
}

const userLogin = async(req,res) =>{
      const { email , password} = req.body;

      let user = await UserModel.findOne({email});
      
      if(!user)
            return res.status(400).json("User not registered");
      
      const isValid = await bcrypt.compare(password , user.password);

      if(!isValid) return res.status(400).json("invalid password");

      const token = JwtToken(user._id);
      res.status(200).json({_id : user._id ,token,name : user.name,email});
}

const getUser = async(req,res) => {
    const userId = req.params.userId;
    try{
        const user = await UserModel.findById(userId);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const getUsers = async(req,res) => {
    try{
        const users = await UserModel.find();

        res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {userRegister,userLogin,getUser,getUsers};
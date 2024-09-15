const { chatModel } = require("../model/chatModel");

//CreateChat
const createChat = async(req,res) => {
    const {firstId , secondId} = req.body;

    try{
        let response = await chatModel.findOne({
            members : {
                $all : [firstId,secondId]
            }
        });
        console.log(response);
        if(response){
           return res.status(200).json(response);
        }

        const newchat = new chatModel({
            members : [firstId,secondId]
        })

        try{
            let message = await newchat.save();
            console.log(message);
            res.status(200).json(message);
        }
        catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//GetChat
const findUserChats = async(req,res) => {
    const userId = req.params.userId;

    try{
        let response = await chatModel.find({
            members : {
                $in : [userId]
            }
        })

        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//findchat
const findChat = async(req,res) => {
    const {firstId,secondId} = req.params;

    try{
        let response = await chatModel.findOne({
            members : {
                $all : [firstId,secondId]
            }
        })

        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createChat, findUserChats , findChat };

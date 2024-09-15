const {messageModel} = require("../model/messageModel")
//createmessage
const createMessage = async(req , res) => {
    const {senderId , text , chatId} = req.body;

    try{
        const newMessage = new messageModel({
            chatId,
            senderId,
            text
        })

        let response = await newMessage.save();
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//getmessage
const getMessages = async(req,res) => {
    const chatId = req.params.chatId;

    try{
        let response = await messageModel.find({chatId});
        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createMessage,getMessages};
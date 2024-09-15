const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name : {
            type : String ,
            required : true ,
            minlength : 3 ,
            maxlenght : 30
            },
    email : {
            type : String ,
            required : true ,
            minlength : 3 ,
            maxlenght : 250 ,
            unique : true
            },
    password : {
            type : String ,
            required : true ,
            minlength : 3 ,
            maxlenght : 1024
        }
},
{
    timestamps : true
});


exports.User = mongoose.model('User' , userSchema);
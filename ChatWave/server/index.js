const express = require("express");
const cors = require("cors");
const app = express();
const mongoose  = require("mongoose");
const dotenv = require("dotenv");
const UserRout = require("./routes/UserRoutes")
const ChatRoute = require("./routes/chatRoutes")
const messageRoute = require("./routes/messageRoutes")

//middle wares
app.use(express.json());
app.use(cors());
app.use("/users",UserRout.router);
app.use("/chat",ChatRoute);
app.use("/message",messageRoute);
dotenv.config();

//CRUD

app.get("/" , async(req,res)=>{
    res.send("Welcome to out site");
})

const port = process.env.PORT || 5050;
const URI  = process.env.ATLAS_URI;

app.listen(port , (req,res) => {
    console.log(`Server has started at ${port}`);
})

mongoose
   .connect(URI)
   .then(()=>{  
    console.log("MongoDB database connection established successfully");
    })
    .catch((err)=>{
         console.log(err);
    })
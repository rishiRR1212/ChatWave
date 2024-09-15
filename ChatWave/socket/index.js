const { Server } = require("socket.io");

const io = new Server({ cors : "http://localhost:5173" });

let OnlineUsers = [];

io.on("connection", (socket) => {
    // When a client connects, this method is called
    socket.on("addNewUser" , (userId) => {
        !OnlineUsers.some((user) => {
            user.userId === userId
        }) && OnlineUsers.push({
            userId,
            socketId : socket.id
        })

        io.emit("getOnlineUsers" , OnlineUsers);
    })

    //receiving message
    socket.on("sendMessage" , (message) => {
        const user = OnlineUsers.find((person) => person.userId === message.recepientId);
        if(user){
            console.log("recepient " , message.recepientId , "  " , user.userId);
            io.to(user.socketId).emit("getMessage" , message);
        }
    })
    // Disconnecting from server
    socket.on("disconnect" , () => {
        OnlineUsers = OnlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers" , OnlineUsers);
    })


});

io.listen(3000);
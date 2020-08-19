const messageModel = require("../models/message.model")


module.exports = io => {
    io.on("connection", socket => {
        socket.on("joinChat", chatId => {
            socket.join(chatId)
        })
        socket.on("sendMessage", (msg, cb)=> {
            messageModel.newMessage(msg)            
            .then(() => {
                io.to(msg.chat).emit("newMessage", msg)
                cb()
            })
            
        })
        socket.on("requestPeerId", chatId => {
            socket.broadcast.to(chatId).emit("getPeerId")
        })
        socket.on("sendPeerId", data => {
            socket.broadcast.to(data.chatId).emit("recivePeerId", data.peerId)
        })
    })
}
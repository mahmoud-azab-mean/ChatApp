const mongoose = require("mongoose")
const DB_URL = 'mongodb://localhost:27017/chat'


const chatSchema = mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    
})
const Chat = mongoose.model("chat", chatSchema)


exports.Chat = Chat

exports.getChat = async chatId => {
    try {
        await mongoose.connect(DB_URL)
        //let newChat = new Chat({
            // chat: "5dc826044599a39348d99ece",
            // content: "hello",
            // sender: "sds",
            // timestamp: 1,})
        //await newChat.save()

        let chat = await Chat.findById(chatId).populate('users')
        mongoose.disconnect()
        return chat
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }

}

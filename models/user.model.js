const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/chat'
const Chat = require('./chat.model').Chat
const userSchema = mongoose.Schema({
    username : String,
    email: String,
    password: String,
    image: {
        type: String,
        default: "default-user-image.png"
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    friends: {
        type: [{name: String, image: String, id: String, chatId: String}],
        default: []
    },
    friendRequests: {
        type: [{name: String, id: String}],
        default: []
    },
    sentRequests: {
        type: [{name: String, id: String}],
        default: []
    }
})

const User = mongoose.model("user", userSchema)

exports.User = User
exports.getUserData = id => {
    console.log(id)
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.findById(id)
        })
        .then(data => {
            mongoose.disconnect()
            resolve(data)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return User.find({})
        })
        .then(users => {
            mongoose.disconnect()
            resolve(users)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.sendFriendRequset = async (data) => {
    //add user1 data to user2 friendRequests
    // add user2 data to user1 sentRequsets
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne(
            {_id : data.friendId}, 
            {$push : { 
                friendRequests: {name: data.myName, id: data.myId}
            }})
        await User.updateOne(
            {_id: data.myId}, 
            {$push: { 
                sentRequests: {name: data.friendName, id: data.friendId}
            }})
        mongoose.disconnect()
        return 
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)

    }
}
exports.cancelFriendRequset = async (data) => {
    //remove user1 data to user2 friendRequests
    // remove user2 data to user1 sentRequsets
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({_id : data.friendId}, {$pull : { friendRequests: {id: data.myId}}})
        await User.updateOne({_id: data.myId}, {$pull: { sentRequests: {id: data.friendId}}})
        mongoose.disconnect()
        return 
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)

    }
}
exports.acceptFriendRequset = async data => {
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({_id: data.friendId}, {$pull: {sentRequests: {id: data.myId}}})
        await User.updateOne({_id: data.myId}, {$pull: {friendRequests: {id: data.friendId}}})
        let newChat = new Chat({
            users: [data.myId, data.friendId]
        })
        let chatDoc = await newChat.save()
        await User.updateOne({_id: data.friendId}, {$push: {friends: {id: data.myId, name: data.myName, image: data.myImage, chatId: chatDoc._id }}})
        await User.updateOne({_id: data.myId}, {$push: {friends: {id: data.friendId, name: data.friendName, image: data.friendImage,chatId: chatDoc._id}}})
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}
exports.rejectFriendRequset = async data => {
    try {
        await mongoose.connect(DB_URL)
        await Promise.all([
            User.updateOne({_id: data.friendId}, {$pull: {sentRequests: {id: data.myId}}}),
            User.updateOne({_id: data.myId}, {$pull: {friendRequests: {id: data.friendId}}})
        ]) 
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}
exports.deleteFriendRequset = async data => {
    try {
        await mongoose.connect(DB_URL)
        await Promise.all([
            User.updateOne({_id: data.friendId}, {$pull: {friends: {id: data.myId}}}),
            User.updateOne({_id: data.myId}, {$pull: {friends: {id: data.friendId}}})
        ])
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getFriendRequests = async id => {
    try {
        await mongoose.connect(DB_URL)
        let data = await User.findById(id, {friendRequests: true})
        console.log(data)
        return data.friendRequests
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getFriends = async id => {
    try {
        await mongoose.connect(DB_URL)
        let data = await User.findById(id, {friends: true})
        console.log(data)
        mongoose.disconnect()
        return data.friends
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}
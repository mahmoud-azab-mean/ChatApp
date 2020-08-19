const {sendFriendRequset, getFriends } = require('../models/user.model')

module.exports = (io) => {
    io.on('connection', socket => {
        socket.on('sendFriendRequest', data => {
            //console.log(data)
            sendFriendRequset(data)
                .then(() => {
                    socket.emit('requestSent')
                    io.to(data.friendId).emit('newFriendRequest', {name: data.myName , id: data.myId})
                }).catch(err => {
                    socket.emit("requestFailed")
                })
            })
            socket.on("getOnlineFriends", id => {
                getFriends(id)
                .then(friends => {
                    let onlineFriends = friends.filter(friend => io.onlineUsers[friend.id])
                    console.log(onlineFriends)
                    socket.emit("onlineFriends", onlineFriends)
                })
            })
    } )
    
}
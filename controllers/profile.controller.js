const userModel = require('../models/user.model')

// exports.redirect = (req,res,next) => {
//     res.redirect("/profile/" + req.session.userId)

// }
/*
    *user enter his profile
    *Friends 
        user1 is user2 friends
    *    
*/
/**
 * user enter his profile
 * Friends 
 *          user1 is user2 friends
 *  user 1 send friend requset user2
 *      user1 is in user2 friendRequsets
 * user 1 receive friend request from user 2
 *      user1 is in user2 sentRequsts
 *  
 */

exports.getProfile = (req,res,next) => {
    //console.log(req.friendRequests)
    let id = req.params.id 
    if(!id) return  res.redirect("/profile/" + req.session.userId)
    userModel.getUserData(id)
        .then(data => {
            //console.log(id=== req.session.userId)
            res.render("profile" , {
                pageTitle: data.username,
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                myId : req.session.userId,
                myName: req.session.name,
                myImage: req.session.image,
                friendId: data._id, 
                username: data.username,
                userImage: data.image,
                isOwner: id === req.session.userId,
                isFriends: data.friends.find(friend => friend.id === req.session.userId),
                isRequestsSent: data.friendRequests.find(friend => friend.id === req.session.userId),
                isRequestsRecieved: data.sentRequests.find(friend => friend.id === req.session.userId),
            })
        })
    
    console.log(req.session.userId)
    

    
    
        
    
}
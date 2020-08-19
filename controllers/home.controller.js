const userModel = require('../models/user.model')

exports.getHome = (req,res,next) => {
    res.render("index", {
        pageTitle: "Home",
        isUser: req.session.userId,
        friendRequests: req.friendRequests,
    })
}

exports.getMembers = (req,res,next) => {
    //console.log(req.friendRequests)
    let id = req.params.id 
    //if(!id) return  res.redirect("/profile/" + req.session.userId)
    userModel.getUsers()
        .then(data => {
            //console.log(id=== req.session.userId)
            res.render("members" , {
                users: data,
                pageTitle: "Members",
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                myId : req.session.userId,
                myName: req.session.name,
                myImage: req.session.image,
                friendId: data._id, 
                username: data.username,
                userImage: data.image,
                isOwner: id === req.session.userId,
                
            })
        })    
    
}
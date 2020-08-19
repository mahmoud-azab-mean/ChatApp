const userModel = require('../models/user.model')


// exports.add = (req,res,next) => {
//     userModel.sendFriendRequset(req.body)
//     .then(() => {
//         res.redirect("/profile/" + req.body.friendId)
//     }).catch(err => {
//         res.redirect("/error")
//     })
// }
exports.cancel = (req,res,next) => {
    userModel.cancelFriendRequset(req.body)
    .then(() => {
        res.redirect("/profile/" + req.body.friendId)
    }).catch(err => {
        res.redirect("/error")
    })
}
exports.accept = (req,res,next) => {
    userModel.acceptFriendRequset(req.body)
    .then(() => {
        res.redirect("/profile" +  req.body.friendId)
    }).catch(err => {
        res.redirect("/error")
    })
}
exports.reject = (req,res,next) => {
    userModel.acceptFriendRequset(req.body)
    .then(() => {
        res.redirect("/profile" +  req.body.friendId)
    }).catch(err => {
        res.redirect("/error")
    })
}
exports.delete = (req,res,next) => {
    userModel.deleteFriendRequset(req.body)
    .then(() => {
        res.redirect("/profile" +  req.body.friendId)
    }).catch(err => {
        res.redirect("/error")
    })
}

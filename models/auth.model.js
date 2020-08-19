const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./user.model').User

const DB_URL = 'mongodb://localhost:27017/chat'





exports.createNewUser = (username, email, password) => {
    //check if email exists
    //yes >> error
    //no >> new account
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({email : email})
        }).then(user => {
            if(user) {
                mongoose.disconnect()    
                reject('email is used')}
            else{
                return bcrypt.hash(password, 10, )
            }
        }).then(hashedPassword => {
            let user = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            return user.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
            }) 
        
    })
}

exports.login = (email, password) => {
    //check your email 
    //no ==> error
    //yes ==> Check your password
    //no ==> error
    //yes ==> set cookie ( is user: boolean) ==> set session
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL).then(() => User.findOne({ email: email }))
        .then(user => {
            if(!user) {
                mongoose.disconnect()
                reject('There is no User')
            } else{
                 bcrypt.compare(password, user.password)
                .then(same => {
                    if(!same)  {
                        mongoose.disconnect()
                        reject('password is incorrect')
                    } else {
                        mongoose.disconnect()
                        resolve(user)
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
    
}



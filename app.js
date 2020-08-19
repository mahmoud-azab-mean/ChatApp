const authRouter = require('./routes/auth.route')
const profielRouter = require('./routes/profile.route')
const friendRouter = require('./routes/friend.route')
const homeRouter = require('./routes/home.route')
const membersRouter = require('./routes/members.route')
const chatRouter = require('./routes/chat.route')
const getFriendRquest = require('./models/user.model').getFriendRequests

const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs');
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   };
const server = require('http').createServer(app)

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const socketIO = require('socket.io')
const io = socketIO(server)



io.onlineUsers = {}

require('./sockets/friend.socket')(io)
require('./sockets/init.socket')(io)
require('./sockets/chat.socket')(io)
// io.on('connection', socket => {
//     console.log("new user connected")
//     require('./sockets/init.socket')(socket)
// })

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/chat',
    collection: 'sessions'
})




app.set('view engine', 'ejs')
app.set('views', 'views')//default


app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))
app.use(session({
    secret: 'this is my secret secret to hash express session ......',
    saveUninitialized : false,
    store: STORE
}))
app.use(flash())

app.use((req,res,next) => {
    if(req.session.userId) {
        getFriendRquest(req.session.userId)
        .then(requsets => {
            req.friendRequests = requsets
            next()
        }).catch(err => {
            res.redirect('/error')
        })
    } else {
        next()
    }
})

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/members', membersRouter)
app.use('/profile', profielRouter)
app.use('/friend', friendRouter)
app.use('/chat', chatRouter)


app.use((req, res,next) => {
    res.status(404)
        res.render('not-found', {
            isUser: req.session.userId,
            pageTitle: "Page Not Found",
            friendRequests: req.friendRequests,
            
        })
    })    

app.get('/error', (req,res,next) => {
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        pageTitle: "Error",
        friendRequests: req.friendRequests,
    })
})

app.get('/', (req, res, next) => {
    res.render('index')
    });




const port = process.env.PORT || 3000
server.listen(port, ()=> {
    console.log("server listen on port " + port )
})
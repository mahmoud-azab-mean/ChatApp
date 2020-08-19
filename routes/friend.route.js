const router = require('express').Router()
const bodyParser = require('body-parser').urlencoded({extended: true})
const friendController = require('../controllers/friend.controller')
const authGurd = require('./guards/auth.guard')


// router.post("/add", authGurd.isAuth, bodyParser, friendController.add)
router.post("/cancel", authGurd.isAuth, bodyParser, friendController.cancel)
router.post("/accept", authGurd.isAuth, bodyParser, friendController.accept)
router.post("/reject", authGurd.isAuth, bodyParser, friendController.reject)
router.post("/delete", authGurd.isAuth, bodyParser, friendController.delete)

module.exports = router
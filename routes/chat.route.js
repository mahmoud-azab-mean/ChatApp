const router = require('express').Router()
const chatController = require('../controllers/chat.controller')
const authGurd = require('./guards/auth.guard')

router.get('/:id', authGurd.isAuth, chatController.getChat)

module.exports = router
const router = require('express').Router()
const profileController = require('../controllers/profile.controller')
const authGurd = require('./guards/auth.guard')

router.get("/", authGurd.isAuth, profileController.getProfile)
router.get("/:id", authGurd.isAuth, profileController.getProfile)

module.exports = router
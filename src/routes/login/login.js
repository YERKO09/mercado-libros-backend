const { loginController } = require('../../controllers/login')
const router = require('express').Router()

router.post("/login", loginController)

module.exports = router
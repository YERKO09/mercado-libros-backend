const { loginController } = require('../../controllers/login')
const { UsersValidatorCollection } = require('../../validators/users/usersValidator')
const router = require('express').Router()

router.post("/login", UsersValidatorCollection.loginValidator, loginController)

module.exports = router
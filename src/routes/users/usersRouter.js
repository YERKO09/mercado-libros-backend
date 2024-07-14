const { get_users_controller, get_user_data_controller, add_user_controller, update_user_controller, } = require('../../controllers/users/usersController')
const validarToken = require('../../middlewares/authorization')
const { UsersValidatorCollection } = require('../../validators/users/usersValidator')

const router = require('express').Router()


router.get('/get-all', get_users_controller)
router.get('/get', validarToken, get_user_data_controller)
router.post('/create', UsersValidatorCollection.addValidator, add_user_controller)

router.put('/update/:id', UsersValidatorCollection.updateValidator, update_user_controller)
router.delete('/delete/:id', () => { })


module.exports = router
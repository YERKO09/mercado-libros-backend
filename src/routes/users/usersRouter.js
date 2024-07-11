const { add_user_controller, update_user_controller, get_user_controller } = require('../../controllers/users/usersController')
const { UsersValidatorCollection } = require('../../validators/users/usersValidator')

const router = require('express').Router()


router.get('/usuarios', get_user_controller)
router.post('/create', UsersValidatorCollection.addValidator, add_user_controller)

router.put('/update/:id', UsersValidatorCollection.updateValidator, update_user_controller)
router.delete('/delete/:id', () => { })


module.exports = router
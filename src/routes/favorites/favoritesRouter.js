const router = require('express').Router()
const validarToken = require('../../middlewares/authorization')

const { 
  get_user_favorites,
  add_to_favorites,
  remove_from_favorites
} = require('../../controllers/favorites/favoritesController')

router.get('/get', validarToken, get_user_favorites)
router.post('/add', add_to_favorites)
router.post('/remove', remove_from_favorites)

module.exports = router
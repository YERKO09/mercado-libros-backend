const router = require('express').Router()
const validarToken = require('../../middlewares/authorization')

const { 
  get_user_favorites
} = require('../../controllers/favorites/favoritesController')

router.get('/get', validarToken, get_user_favorites)

module.exports = router
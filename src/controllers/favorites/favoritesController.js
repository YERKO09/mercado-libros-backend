const { favoritesCollection } = require('../../database/models/favoritesModel')

const get_user_favorites = async (req, res) => {
  try {
    const {email} = req.user
    const response = await favoritesCollection.getFavoritesByUserEmail(email)

    res.send(response)
  } catch (error) {
    res.send(error)
  }
}

const add_to_favorites = async (req, res) => {
  try {
    console.log(req.body)
    const {usuario_id, libro_id} = req.body
    const response = await favoritesCollection.addFavorite(usuario_id, libro_id)

    res.send(response.msg)
  } catch (error) {
    res.send(error)
  }
}

const remove_from_favorites = async (req, res) => {
  try {
    const {usuario_id, libro_id} = req.body
    const response = await favoritesCollection.removeFavorite(usuario_id, libro_id)

    res.send(response.msg)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  get_user_favorites,
  add_to_favorites,
  remove_from_favorites
}
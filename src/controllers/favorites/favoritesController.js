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

module.exports = {
  get_user_favorites
}
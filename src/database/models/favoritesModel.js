const database = require('../dbConfig')

const getFavoritesByUserEmail = async (email) => {
  try {

    const consulta = `
    SELECT
      f.libro_id
    FROM
      favoritos f
    INNER JOIN
      usuarios u ON u.usuario_id = f.usuario_id
    WHERE
      u.email = $1`
    const values = [email]
  
    const { rows } = await database.query(consulta, values)
    
    if(rows.length){
      return {
        msg: `Favoritos del usuario ${email}`,
        data: rows
      }
    } else {
      return {msg: "No se encontraron favoritos"}
    }

  } catch (error) {

    throw error

  }
}

// const addFavorite
// const deleteFavorite

const favoritesCollection = {
  getFavoritesByUserEmail,
  /* addFavorite,
  deleteFavorite */
}

module.exports = { favoritesCollection }
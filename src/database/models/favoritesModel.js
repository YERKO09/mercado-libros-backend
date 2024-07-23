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

const addFavorite = async (usuario, libro) => {
  try {
    const consulta = `
      INSERT INTO 
        favoritos (usuario_id, libro_id)
      VALUES 
        ($1, $2)
      RETURNING *
    `
    const values = [usuario, libro]
  
    const { rows } = await database.query(consulta, values)
  
    if(rows.length){
      return {
        msg: `Se agrego libro ID:${libro} a favoritos`,
        data: rows
      }
    } else {
      return {msg: "No se agregó a favoritos"}
    }
  } catch (error) {
    throw error
  }

}

const removeFavorite = async (usuario, libro) => {
  try {
    const consulta = `
      DELETE FROM
        favoritos
      WHERE
        usuario_id = $1 AND libro_id = $2
      RETURNING *
    `
    const values = [usuario, libro]
  
    const { rows } = await database.query(consulta, values)
  
    if(rows.length){
      return {
        msg: `Se quitó libro ID:${libro} de favoritos`,
        data: rows
      }
    } else {
      return {msg: "No se pudo quitar de favoritos"}
    }
  } catch (error) {
    throw error
  }

}

const favoritesCollection = {
  getFavoritesByUserEmail,
  addFavorite,
  removeFavorite 
}

module.exports = { favoritesCollection }
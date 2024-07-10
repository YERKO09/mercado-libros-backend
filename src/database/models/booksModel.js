const database = require('../dbConfig')


const addBook = async (titulo, autor, descripcion, precio, editorial, url_imagen, anio) => {

    try {

        const consulta = "INSERT INTO libros (titulo, autor, descripcion, precio, editorial, url_imagen, anio) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
        const values = [titulo, autor, descripcion, precio, editorial, url_imagen, anio]

        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Libro agregado correctamente',
                data: result.rows[0]
            }

        } else {
            return {
                msg: 'Libro no agregado',
                data: []
            }
        }

    } catch (error) {

        throw error
    }

}

const getBooks = async () => {

    try {

        const consulta = "SELECT libros.libro_id, libros.titulo, libros.autor, libros.descripcion, libros.precio, libros.editorial, libros.url_imagen, libros.anio, libros.fecha_publicacion, usuarios.nombre AS usuario, generos.nombre AS genero FROM libros INNER JOIN usuarios ON usuarios.usuario_id = libros.usuario_id INNER JOIN generos ON generos.genero_id = libros.genero_id ORDER BY libro_id"

        const { rows } = await database.query(consulta)

        if (rows.length) {

            return {
                msg: 'Todos los libros 📚',
                data: rows
            }

        } else {

            return {
                msg: 'No hay libros',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const booksCollection = {
    addBook,
    getBooks
}


module.exports = { booksCollection }
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

        const consulta = "SELECT * FROM libros"

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
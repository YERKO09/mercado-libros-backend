const { booksCollection } = require('../../database/models/booksModel')

const add_book_controller = async (req, res, next) => {

    try {
        const { titulo, autor, descripcion, precio, editorial, url_imagen, anio } = req.body

        const response = await booksCollection.addBook(titulo, autor, descripcion, precio, editorial, url_imagen, anio)

        res.send(response)

    } catch (error) {
        next(error)
    }
}


const get_books_controller = async (req, res, next) => {

    try {
        const response = await booksCollection.getBooks()

        res.send(response)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    get_books_controller,
    add_book_controller
}
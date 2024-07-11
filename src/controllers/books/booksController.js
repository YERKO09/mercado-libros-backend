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

const get_book_by_id = async (req, res, next) => {
    const {id} = req.params

    try {
        const response = await booksCollection.getBookById(id)

        res.send(response)

    } catch (error) {
        next(error)
    }
}
/*SE AGREGA UPDATE Y DELETE CONTROLLERS*/

/* 
const update_book_controller = async (req, res, next) => {
    const { id } = req.params;
    const { titulo, autor, descripcion, precio, editorial, url_imagen, anio } = req.body;
    try {
        const response = await booksCollection.updateBook(id, titulo, autor, descripcion, precio, editorial, url_imagen, anio);
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const delete_book_controller = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await booksCollection.deleteBook(id);
        res.send(response);
    } catch (error) {
        next(error);
    }
};
*/

module.exports = {
    get_books_controller,
    get_book_by_id,
    add_book_controller,
    update_book_controller,
    delete_book_controller
}
const { booksCollection } = require('../../database/models/booksModel')

const add_book_controller = async (req, res) => {

    try {
        const nuevoLibro = req.body

        const response = await booksCollection.addBook(nuevoLibro)

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}


const get_books_controller = async (req, res) => {

    try {
        const response = await booksCollection.getBooks()

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}

const get_book_by_id = async (req, res) => {
    const {id} = req.params

    try {
        const response = await booksCollection.getBookById(id)

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}

const get_generos_controller = async (req, res) => {

    try {
        const response = await booksCollection.getGeneros()

        res.send(response)

    } catch (error) {
        console.log('error');
        res.send(error)
    }
}

const update_book_controller = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, descripcion, precio, editorial, url_imagen, anio } = req.body;
    try {
        const response = await booksCollection.updateBook(id, titulo, autor, descripcion, precio, editorial, url_imagen, anio);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
};

const delete_book_controller = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await booksCollection.deleteBook(id);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
};


module.exports = {
    get_books_controller,
    get_book_by_id,
    get_generos_controller,
    add_book_controller,
    update_book_controller,
    delete_book_controller
}
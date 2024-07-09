const router = require('express').Router()

const { get_books_controller, add_book_controller } = require('../../controllers/books/booksController')


router.get('/get-all', get_books_controller)

router.post('/add', add_book_controller)


module.exports = router
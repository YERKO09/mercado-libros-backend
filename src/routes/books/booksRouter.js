const router = require('express').Router()

const { get_books_controller, get_book_by_id, add_book_controller, update_book_controller, delete_book_controller } = require('../../controllers/books/booksController')

router.get('/get-all', get_books_controller)
router.get('/get/:id', get_book_by_id)
router.post('/add', add_book_controller)
router.put('/update/:id', update_book_controller);
router.delete('/delete/:id', delete_book_controller);

module.exports = router
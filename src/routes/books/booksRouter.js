const router = require('express').Router()
const validarToken = require('../../middlewares/authorization')

const { 

  get_books_controller, 
  get_book_by_id,
  get_generos_controller,
  add_book_controller, 
  update_book_controller, 
  delete_book_controller,
  get_books_by_user

} = require('../../controllers/books/booksController')

router.get('/get-all', get_books_controller)
router.get('/get/:id', get_book_by_id)
router.get('/generos', get_generos_controller)
router.get('/mis-libros', validarToken, get_books_by_user);

router.post('/add', add_book_controller)

router.put('/update/:id', update_book_controller);

router.delete('/delete/:id', delete_book_controller);

module.exports = router
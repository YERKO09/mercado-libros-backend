const router = require('express').Router()
const BooksRouter = require('./books/booksRouter')
const UsersRouter = require('./users/usersRouter')

router.use('/libros', BooksRouter)
router.use('/usuarios', UsersRouter)

module.exports = router

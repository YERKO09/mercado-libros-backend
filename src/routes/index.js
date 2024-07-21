const router = require('express').Router()
const BooksRouter = require('./books/booksRouter')
const UsersRouter = require('./users/usersRouter')
const FavoritesRouter = require('./favorites/favoritesRouter')
const Login = require('./login/login')

router.use('/libros', BooksRouter)
router.use('/usuarios', UsersRouter)
router.use('/favoritos', FavoritesRouter)
router.use(Login)

module.exports = router
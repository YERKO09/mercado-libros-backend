const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;

const validarToken = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization")
    const token = Authorization.split(" ")[1]

    jwt.verify(token, secretKey)

    const {email} = jwt.decode(token)

    req.user = {email}
    next()
  } catch (error) {
    res.send(error)
  }
}

module.exports = validarToken
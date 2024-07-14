const { param, body, validationResult } = require('express-validator')

const updateValidator = [
    param('usuario_id').notEmpty().withMessage('Debes pasar un ID').isInt().withMessage('Debe ser un entero'),
    (req, res, next) => {

        const errors = validationResult(req).mapped()
        console.log(Object.keys(errors))
        if (Object.keys(errors).length) {
            res.send(errors)
        } else {
            next()
        }

    }
]

const addValidator = [

    body('nombre')
        .notEmpty().withMessage('Ingresa tu nombre'),
    body('email')
        .notEmpty().withMessage('Agrega tu email').isEmail().withMessage('Formato Incorrecto'),
    body('password')
        .notEmpty().withMessage('Ingresa una contraseña'),

    (req, res, next) => {

        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.status(400).send(errors)
        } else {
            next()
        }

    }
]

const loginValidator = [

    body('email')
        .notEmpty().withMessage('Agrega tu email')
        .isEmail().withMessage('Formato de email Incorrecto'),
    body('password')
        .notEmpty().withMessage('Ingresa una contraseña'),

    (req, res, next) => {

        const errors = validationResult(req).mapped()
        console.log(errors);

        if (Object.keys(errors).length) {
            res.status(400).send(errors)
        } else {
            next()
        }

    }
]


const UsersValidatorCollection = {
    updateValidator,
    addValidator,
    loginValidator
}


module.exports = {
    UsersValidatorCollection
}
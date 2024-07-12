const { UsersCollection } = require('../../database/models/usersModel')

const get_user_controller = async (req, res, next) => {
    const users = await UsersCollection.getUsers()
    res.json(users)
}

const add_user_controller = async (req, res, next) => {

    try {
        const { nombre, email, password } = req.body
        const response = await UsersCollection.addUser(nombre, email, password)

        res.send(response)

    } catch (error) {
        res.send(error)
    }
}

const update_user_controller = async (req, res, next) => {
    try {

        const { usuario_id } = req.params;
        const { nombre, apellidos, email, imagen, telefono} = req.body

        const response = await UsersCollection.updateUser(usuario_id, nombre, apellidos, email, imagen, telefono)

        res.json(response)

    } catch (error) {
        res.send(error)
    }
}

const delete_user_controller = async (req, res, next) => {
    try {

        const { usuario_id } = req.params;
        const response = await UsersCollection.deleteUser(usuario_id)

        res.json(response)

    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    update_user_controller,
    delete_user_controller,
    add_user_controller,
    get_user_controller
}
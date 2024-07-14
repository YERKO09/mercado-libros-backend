const { UsersCollection } = require('../../database/models/usersModel')

const get_users_controller = async (req, res) => {
    const users = await UsersCollection.getUsers()
    res.json(users)
}

const get_user_data_controller = async (req, res) => {
    try {
        const {email} = req.user //extraido del token desde middleware Authorization
        const dataUsuario = await UsersCollection.getUserByEmail(email)

        console.log(dataUsuario);
        res.status(200).send(dataUsuario)
    } catch (error) {
        res.send(error)
    }
}

const add_user_controller = async (req, res) => {

    try {
        const { nombre, email, password } = req.body
        const response = await UsersCollection.addUser(nombre, email, password)

        res.send(response)

    } catch (error) {
        res.status(error.status).send(error)
    }
}

const update_user_controller = async (req, res) => {
    try {

        const { usuario_id } = req.params;
        const { nombre, apellidos, email, imagen, telefono} = req.body

        const response = await UsersCollection.updateUser(usuario_id, nombre, apellidos, email, imagen, telefono)

        res.json(response)

    } catch (error) {
        res.send(error)
    }
}

const delete_user_controller = async (req, res) => {
    try {

        const { usuario_id } = req.params;
        const response = await UsersCollection.deleteUser(usuario_id)

        res.json(response)

    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    get_users_controller,
    get_user_data_controller,
    get_users_controller,
    update_user_controller,
    delete_user_controller,
    add_user_controller
}
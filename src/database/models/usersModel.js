const database = require('../dbConfig');


const addUser = async (email, password) => {

    try {

        const consulta = "INSERT INTO usuarios (email, password) values ($1, $2) RETURNING *"
        const values = [email, password]

        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Usuario agregado ✅',
                data: result.rows[0]
            }

        } else {
            return {
                msg: 'Usuario no agregado ⚠️',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const updateUser = async (usuario_id, nombre, apellidos, email, imagen, telefono) => {

    try {

        const consulta = "UPDATE usuarios SET nombre = $1, apellidos = $2, email = $3, imagen = $4, telefono = $5 WHERE usuario_id = $6 RETURNING *";
        const values = [nombre, apellidos, email, imagen, telefono, usuario_id]

        const result = await database.query(consulta, values)


        if (result.rowCount) {

            return {
                msg: 'Cambios guardados 👌',
                data: result.rows[0]
            }
        } else {
            return {
                msg: 'Error al actualizar el usuario 😥',
                data: []
            }
        }



    } catch (error) {
        const err = new Error('Error en la consulta');

        err.msg = 'Bad Request'
        err.status = '400'
        err.origin = 'Database'
        err.model = 'usuarios'
        err.details = error.message

        throw err;
    }
}

const deleteUser = async (usuario_id) => {

    try {

        const consulta = "DELETE FROM usuarios WHERE usuario_id = $1 RETURNING *";
        const values = [usuario_id]

        const result = await database.query(consulta, values)


        if (result.rowCount) {

            return {
                msg: 'Usuario Eliminado Correctamente 👌',
                data: result.rows[0]
            }
        } else {
            return {
                msg: 'Error al eliminar el usuario 😥',
                data: []
            }
        }



    } catch (error) {
        const err = new Error('Error en la consulta');

        err.msg = 'Bad Request'
        err.status = '400'
        err.origin = 'Database'
        err.model = 'usuarios'
        err.details = error.message

        throw err;
    }
}


const UsersCollection = {
    updateUser,
    deleteUser,
    addUser
}



module.exports = {
    UsersCollection
}
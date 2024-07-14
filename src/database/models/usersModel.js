const database = require('../dbConfig');
const bcrypt = require('bcrypt')

const verificarCredenciales = async ( email, password ) => {

    const consulta = "SELECT * FROM usuarios WHERE email = $1;"
    const values = [email]
    const { rowCount, rows } = await database.query(consulta, values)
    
    const usuario = rows[0]
  
    const match = await bcrypt.compare(String(password), usuario.password)

    if ( !match || !rowCount)
        throw { error: true, code: 401, message: "Credenciales inválidas" }
}


const getUsers = async () => {
    const query = "SELECT * FROM usuarios;"
    const {rows} = await database.query(query);
    // console.log('Rows:', rows);   
    return rows
}

const addUser = async (nombre, email, password) => {

    try {
        // 2° parámetro salts = ciclos que hará el hash para encriptar la contraseña
        const passwordEncriptada = await bcrypt.hash(String(password), 10)
        const consulta = "INSERT INTO usuarios (nombre, email, password) values ($1, $2, $3) RETURNING *"
        const values = [nombre, email, passwordEncriptada]

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
        const err = new Error('Error al registrar usuario');

        err.error = true
        err.msg = 'Bad Request'
        err.status = '400'
        err.status = 400
        err.origin = 'Database'
        err.model = 'usuarios'

        if(error.code == 23505){
            err.msg = "El correo ya se encuentra registrado"
        }

        throw err;
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
    addUser,
    getUsers,
    verificarCredenciales
}



module.exports = {
    UsersCollection
}
const database = require('../dbConfig')


const addBook = async (titulo, autor, descripcion, precio, editorial, url_imagen, anio) => {

    try {

        const consulta = "INSERT INTO libros (titulo, autor, descripcion, precio, editorial, url_imagen, anio) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
        const values = [titulo, autor, descripcion, precio, editorial, url_imagen, anio]

        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Libro agregado correctamente',
                data: result.rows[0]
            }

        } else {
            return {
                msg: 'Libro no agregado',
                data: []
            }
        }

    } catch (error) {

        throw error
    }

}

const getBooks = async () => {

    try {

        const consulta = "SELECT libros.libro_id, libros.titulo, libros.autor, libros.descripcion, libros.precio, libros.editorial, libros.url_imagen, libros.anio, libros.fecha_publicacion, usuarios.nombre AS usuario, generos.nombre AS genero FROM libros INNER JOIN usuarios ON usuarios.usuario_id = libros.usuario_id INNER JOIN generos ON generos.genero_id = libros.genero_id ORDER BY libro_id"

        const { rows } = await database.query(consulta)

        if (rows.length) {

            return {
                msg: 'Todos los libros 📚',
                data: rows
            }

        } else {

            return {
                msg: 'No hay libros',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const getBookById = async (id) => {

    try {

        const consulta = "SELECT li.libro_id, li.titulo, li.autor, li.descripcion, li.precio, li.editorial, li.url_imagen, li.anio, li.fecha_publicacion, us.usuario_id, us.nombre AS usuario, gen.nombre AS genero FROM libros li INNER JOIN usuarios us ON us.usuario_id = li.usuario_id INNER JOIN generos gen ON gen.genero_id = li.genero_id WHERE li.libro_id = $1;"

        const { rows } = await database.query(consulta, [id])

        if (rows.length) {

            return {
                msg: `Libro ID: ${id}`,
                data: rows[0]
            }

        } else {

            return {
                msg: 'Libro no encontrado',
                data: []
            }
        }

    } catch (error) {
        throw error
    }
}

const updateBook = async (id, titulo, autor, descripcion, precio, editorial, url_imagen, anio) => {
    try {
        const consulta =  `
        UPDATE libros 
        SET 
            titulo = COALESCE($1, titulo), 
            autor = COALESCE($2, autor), 
            descripcion = COALESCE($3, descripcion), 
            precio = COALESCE($4, precio), 
            editorial = COALESCE($5, editorial), 
            url_imagen = COALESCE($6, url_imagen), 
            anio = COALESCE($7, anio) 
        WHERE libro_id = $8 
        RETURNING *`;
        const values = [titulo, autor, descripcion, precio, editorial, url_imagen, anio, id];
        const result = await database.query(consulta, values);
        if (result.rowCount) {
            return {
                msg: 'Libro actualizado correctamente',
                data: result.rows[0]
            };
        } else {
            return {
                msg: 'Libro no actualizado',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
};

const deleteBook = async (id) => {
    try {
        const consulta = "DELETE FROM libros WHERE libro_id = $1 RETURNING *";
        const result = await database.query(consulta, [id]);
        if (result.rowCount) {
            return {
                msg: 'Libro eliminado correctamente',
                data: result.rows[0]
            };
        } else {
            return {
                msg: 'Libro no encontrado',
                data: []
            };
        }
    } catch (error) {
        throw error;
    }
};

const booksCollection = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}


module.exports = { booksCollection }
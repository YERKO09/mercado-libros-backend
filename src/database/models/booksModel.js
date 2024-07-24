const database = require('../dbConfig')


const addBook = async (nuevoLibro) => {

    try {
        const {usuario, titulo, autor, descripcion, genero, precio, editorial, url_imagen, anio} = nuevoLibro

        const consulta = "INSERT INTO libros (usuario_id, titulo, autor, descripcion, genero_id, precio, editorial, url_imagen, anio) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"
        const values = [usuario, titulo, autor, descripcion, genero, precio, editorial, url_imagen, anio]

        const result = await database.query(consulta, values)

        if (result.rowCount) {

            return {
                msg: 'Libro agregado correctamente ✅',
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

        const consulta = "SELECT l.libro_id, l.titulo, l.autor, l.descripcion, l.precio, l.editorial, l.url_imagen, l.anio, l.fecha_publicacion, u.nombre AS usuario, g.nombre AS genero FROM libros l INNER JOIN usuarios u ON u.usuario_id = l.usuario_id INNER JOIN generos g ON g.genero_id = l.genero_id ORDER BY l.libro_id"

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

const getGeneros = async () => {

    try {

        console.log('consulta')
        const consulta = "SELECT * FROM generos"

        const { rows } = await database.query(consulta)


        if (rows.length) {

            return {
                msg: 'Todos los generos',
                data: rows
            }

        } else {

            return {
                msg: 'No hay generos',
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

const getBooksByUser = async (email) => {
    try {
        const consulta = `
        SELECT l.libro_id, l.titulo, l.autor, l.descripcion, l.precio, l.editorial, l.url_imagen, l.anio, l.fecha_publicacion, u.nombre AS usuario, g.nombre AS genero 
        FROM libros l 
        INNER JOIN usuarios u ON u.usuario_id = l.usuario_id 
        INNER JOIN generos g ON g.genero_id = l.genero_id 
        WHERE u.email = $1
        ORDER BY l.libro_id`;

        const { rows } = await database.query(consulta, [email]);

        console.log('rows', rows);
        
        
        if (rows.length) {
            return {
                msg: `Libros del usuario con email: ${email}`,
                data: rows
            };
        } else {
            return {
                msg: 'No hay libros para este usuario',
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
    getGeneros,
    updateBook,
    deleteBook,
    getBooksByUser
}


module.exports = { booksCollection }
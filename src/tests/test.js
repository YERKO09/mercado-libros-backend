const request = require('supertest');
const server = require("../../index");

describe('Testing Mercadolibros', () => {

it('Debería obtener todos los libros', async () => {
    const response = await request(server).get('/api/libros/get-all');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Todos los libros 📚');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    
    // Verificar que hay libros en la respuesta antes de acceder a ellos
    if (response.body.data.length > 0) {
      const book = response.body.data[0];
      expect(book).toHaveProperty('libro_id');
      expect(book).toHaveProperty('titulo');
      expect(book).toHaveProperty('autor');
      expect(book).toHaveProperty('descripcion');
      expect(book).toHaveProperty('precio');
      expect(book).toHaveProperty('editorial');
      expect(book).toHaveProperty('url_imagen');
      expect(book).toHaveProperty('anio');
      expect(book).toHaveProperty('fecha_publicacion');
      expect(book).toHaveProperty('usuario');
      expect(book).toHaveProperty('genero');
    }
  });


  it('Debería obtener los datos del usuario', async () => {
    const response = await request(server).get('/api/usuarios/get-all');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Todos los usuarios');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    if (response.body.data.length > 0) {
      const user = response.body.data[0];
      expect(user).toHaveProperty('usuario_id');
      expect(user).toHaveProperty('nombre');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
    }
  });



  it('Debería devolver un error al crear un usuario con un email existente', async () => {
    const response = await request(server)
      .post('/api/usuarios/create')
      .send({
        nombre: 'Patana',
        email: 'patana@correo.cl',
        password: '1234'
      });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'El correo ya se encuentra registrado');
  });


  it('Debería actualizar los datos del libro', async () => {
    const response = await request(server)
      .put('/api/libros/update/2')
      .send({
        precio: 18000,
        editorial: 'ZIG - ZAG'
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('msg', 'Libro actualizado correctamente');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data).toHaveProperty('libro_id');
    expect(response.body.data).toHaveProperty('precio', 18000);
    expect(response.body.data).toHaveProperty('editorial', 'ZIG - ZAG');
  });

});
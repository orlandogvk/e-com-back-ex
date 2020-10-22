const request = require('supertest');
const app = require('../server');
const db = require('../models');
const {generateToken} = require('../controllers/auth');
const getType = require('jest-get-type');
//Vamos a probar las rutas de autenticación

describe('Auth system', () => {
    test('Login', async (done) => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "orlandog79@gmail.com",
            password: "ogr350750279"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
        done();
    });

    test('Login wrong', async (done) => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "orlandog7943@gmail.com",
            password: "ogr350750279"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message')
        done();
    });

    test('User unknown', async (done) => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "orlandog7943@gmail.com",
            password: "ogr350750279"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message')
        done();
    });

    //Generar token
    test('Generating a token to recover password', () => {
        //Token este definido (x)
        //Que sea un string (x)
        //Que tenga una longitud de 10 caracteres (x)
        const token = generateToken(10);
        expect(token).toBeDefined();
        expect(getType(token)).toBe('string');
        expect(token).toHaveLength(10);
    });

    //logout
    test('Logout', async(done) => {
        const res = await request(app)
        .post('/api/v1/users/logout')
        .send()
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Closing session...')
        done();
    });

    //Restablecer contraseña -> envío del correo electronico
    // test('Restablecer Contraseña', async(done) => {
    //     const res = await request(app)
    //     .post('/api/v1/users/reset-password')
    //     .send({
    //         email: "oislasreyes@gmail.com"
    //     })
    //     expect(res.statusCode).toBe(200)
    //     expect(res.body).toHaveProperty('message')
    //     expect(res.body.message).toBe('El correo ha sido enviado satisfactoriamente')
    //     done();
    // });

    test('Error al enviar el enlace para restablecer contraseña', async(done) => {
        const res = await request(app)
        .post('/api/v1/users/reset-password')
        .send({
            email: "orlandog7943@gmail.com"
        })
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe("The email hasn't sent")
        done();
    });
    
    //Actualizar contraseña
    // test('Actualizar Contraseña', async(done) => {
    //     const res = await request(app)
    //     .post('/api/v1/users/update-password')
    //     .send({
    //         password: "oscar123456",
    //         id: 7,
    //         token: 'q6V2Rlwh'
    //     })
    //     expect(res.statusCode).toBe(200)
    //     expect(res.body).toHaveProperty('message')
    //     expect(res.body.message).toBe('Se ha actualizado la contraseña')
    //     done();
    // });

    test('Actualizar Contraseña con token fallido', async(done) => {
        const res = await request(app)
        .post('/api/v1/users/update-password')
        .send({
            password: "orlando12345",
            id: 7,
            token: 'czhXjTZO'
        })
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message')
        done();
    });

});

//Se ejecuta después de todas las pruebas
afterAll(() => {
    //Cerrar la conexión de la base de datos
    db.sequelize.close();
});

//Se ejecuta después de cada prueba
// afterEach(() => {
//     console.log("Ha finalizado esta prueba");
// });

//Se ejecuta antes de todas las pruebas
// beforeAll(() => {
//     console.log("Antes de todas las pruebas");
// })

//Se ejecuta antes de cada prueba
// beforeEach(() => {
//     console.log("Antes de cada prueba");
// });

//Caso: Insertamos 1000 usuarios para probar si esa operación se puede ejecutar satisfactoriamente
//Quiero que al finalizar todas las pruebas con los 1000 usuarios borre esos mil usuarios


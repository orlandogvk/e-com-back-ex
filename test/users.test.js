const request = require('supertest');
const app = require('../server');
const db = require('../models');
const {genAuthToken, user} = require('../utils/auth');

describe('CRUD users', () => {
    test('Get all users', async(done) => {
        const token = genAuthToken(user);
        const res = await request(app)
        .get('/api/v1/users')
        .set('Cookie', [`access_token=${token}`])
        .send()
        expect(res.statusCode).toBe(200)
        done();
    });

    test('Create an user', async(done) => {
        const token = genAuthToken(user);
        const res = await request(app)
        .post('/api/v1/users')
        .set('Cookie', [`access_token=${token}`])
        .send({
            first_name: "Jesus",
            last_name: "Hernandez",
            email: "jesus08@gmail.com",
            active: true,
            password: "jesus1234",
            token: "s7wq98wesqw902q"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('user')
        done();
    });
         
    test('Create an user with Client profile', async(done) => {
        const token = genAuthToken({...user, roles: [
            {
                "id": 22,
                "name": "Client"
            }
        ]});
        const res = await request(app)
        .post('/api/v1/users')
        .set('Cookie', [`access_token=${token}`])
        .send({
            first_name: "Jesus",
            last_name: "Hernandez",
            email: "jesus08@gmail.com",
            active: true,
            password: "jesus1234",
            token: "s7wq98wesqw902q"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('You do not have permissions to perform this action')
        done();
    });
});



afterAll(() => {
    //Cerrar la conexión de la base de datos
    db.sequelize.close();
});

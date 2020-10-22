const request = require('supertest');
const app = require('../server');
const db = require('../models');
const {genAuthToken, user} = require('../utils/auth');

describe('CRUD categories', () => {
    test('Get all categories', async(done) => {
        const token = genAuthToken(user);
        const res = await request(app)
        .get('/api/v1/categories')
        .set('Cookie', [`access_token=${token}`])
        .send()
        expect(res.statusCode).toBe(200)
        done();
    });


    test('Find unknown category', async(done) => {
        const res = await request(app)
        .get('/api/v1/categories/40')
        .send()
        expect(res.statusCode).toBe(401)
        done();
    });

    test('Create a right category', async(done) => {
      /*   const token = genAuthToken(user); */
        const res = await request(app)
        .post('/api/v1/categories')
     /*    .set('Cookie', [`access_token=${token}`]) */
        .send({
            name: "Sports",
            parent_id:1
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('category')
        done();
    });

    test('Updating a wrong category', async(done) => {
        /*   const token = genAuthToken(user); */
          const res = await request(app)
          .post('/api/v1/categories/40')
       /*    .set('Cookie', [`access_token=${token}`]) */
          .send({
              name: "Technology",
              parent_id:2
          })
          expect(res.statusCode).toBe(404)
          done();
      });

   
});

afterAll(() => {
    //Cerrar la conexión de la base de datos
    db.sequelize.close();
});

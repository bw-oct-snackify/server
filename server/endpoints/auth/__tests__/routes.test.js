const request = require('supertest');
const server = require('../../../index');
const db = require('knex')(require('../../../../knexfile'));

beforeAll(async () => {
    await db('users').truncate();
});

describe('User Endpoints', () => {
    test('User can register', async () => {
        let res = await request(server)
            .post('/auth/register')
            .send({ username: 'test-new', password: 'password' });
        console.log(res.body);
        expect(res.body).toEqual([1]);
    });

    test('User can login', async () => {
        let res = await request(server)
            .post('/auth/login')
            .send({ username: 'test-new', password: 'password' });
        console.log(res.body);
        expect(res.body.message).toEqual('Youre logged in');
    });

    //
    //Logout Test
});

const request = require('supertest');
const server = require('../../../index');
const db = require('knex')(require('../../../../knexfile'));
const cleaner = require('knex-cleaner');

beforeAll(async () => {
    await cleaner.clean(db, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['packages', 'snacks'],
    });
});

describe('User Endpoints', () => {
    test('User can register', async () => {
        let res = await request(server)
            .post('/auth/register')
            .send({
                name: 'test-new',
                email: 'test1@test.com',
                password: 'password',
            });
        console.log(res.body);
        expect(res.body.admin).toEqual(true);
        expect(res.status).toEqual(200);
    });

    test('User can login', async () => {
        let res = await request(server)
            .post('/auth/login')
            .send({ email: 'test1@test.com', password: 'password' });
        console.log(res.body);
        expect(res.body).toEqual({
            admin: true,
            company_ID: 1,
            company_name: null,
            email: 'test1@test.com',
            img_url:
                'https://www.catster.com/wp-content/uploads/2015/06/8698_choc_bosscat_full2.jpg',
            name: 'test-new',
            snacks: [],
            user_ID: 1,
        });
    });

    test('User can logout', async () => {
        let res = await request(server).get('/auth/logout');
        expect(res.body).toEqual({
            message: 'Successfully logged out. Thanks for playing!',
        });
    });
});

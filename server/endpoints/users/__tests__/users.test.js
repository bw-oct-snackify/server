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
    let user;

    beforeEach(async () => {
        user = await request(server)
            .post('/auth/register')
            .send({
                name: 'test-new',
                email: 'test1@test.com',
                password: 'password',
            });
    });

    test('User can get their own info', async () => {
        let res = await request(server).get(`/users/${user.user_ID}`);
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
});

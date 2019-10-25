const request = require('supertest');
const server = require('../../../index');
const db = require('knex')(require('../../../../knexfile'));
const cleaner = require('knex-cleaner');

beforeEach(async () => {
    await cleaner.clean(db, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['packages', 'snacks'],
    });
});

describe('Snack Endpoints', () => {
    test('Returns all snacks', async () => {
        let res = await request(server).get('/snacks');
        console.log(res.body);
        expect(res.body.snacks.length).toEqual(10);
    });

    test('Returns only doritos snacks', async () => {
        let res = await request(server).get('/snacks?search=doritos');
        console.log(res.body);
        expect(res.body.snacks.length).toEqual(1);
    });
});

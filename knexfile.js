// Update with your config settings.

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'snackify',
        },
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    },
    testing: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            database: 'snackify-testing',
        },
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + './data/migrations',
        },
        seeds: {
            directory: __dirname + './data/seeds',
        },
    },
}[process.env.NODE_ENV || 'development'];

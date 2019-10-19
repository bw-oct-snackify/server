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
        connection: {
            host: 'production-uri',
            database: 'production-db',
        },
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    },
}[process.env.DB_ENV || 'development'];

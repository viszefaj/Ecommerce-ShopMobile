const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1111',
    port: 5432,
})

const delivery = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'deliver',
    password: '2222',
    port: 5432,
})

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'client',
    password: '3333',
    port: 5432,
})

module.exports = {
    pool,
    delivery,
    client
}
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1111',
    port: 5432,
})

const delivery = new Pool({
    user: 'deliver',
    host: 'localhost',
    database: 'postgres',
    password: '2222',
    port: 5432,
})

const client = new Pool({
    user: 'client',
    host: 'localhost',
    database: 'postgres',
    password: '3333',
    port: 5432,
})

module.exports = {
    pool,
    delivery,
    client
}
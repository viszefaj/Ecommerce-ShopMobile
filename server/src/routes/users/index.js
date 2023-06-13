const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { pool } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, age, email, password, city, address } = req.body;


        await pool.query('BEGIN');

        const selectResults = await pool.query('SELECT * FROM users WHERE email = $1 FOR UPDATE', [email]);

        if (selectResults.rows.length > 0) {
            await pool.query('ROLLBACK');
            res.status(400).json({ message: 'User already exists' });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    await pool.query('ROLLBACK');
                    console.log(err);
                    return;
                }

                try {
                    await pool.query('INSERT INTO users (firstname, lastname, age, email, password, city, address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [firstname, lastname, age, email, hash, city, address]);

                    await pool.query('COMMIT');
                    res.status(201).json({ message: 'User created' });
                } catch (error) {
                    await pool.query('ROLLBACK');
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Start the transaction
        await pool.query('BEGIN');

        const results = await pool.query('SELECT * FROM users WHERE email = $1 FOR UPDATE', [email]);

        if (results.rows.length > 0) {
            bcrypt.compare(password, results.rows[0].password, (err, result) => {
                if (err) {
                    // Rollback the transaction in case of an error
                    pool.query('ROLLBACK', (rollbackError) => {
                        console.log(rollbackError || err);
                    });
                    return;
                }

                if (result) {
                    res.send(results.rows[0]);

                    // Commit the transaction
                    pool.query('COMMIT', (commitError) => {
                        console.log(commitError);
                    });
                } else {
                    // Rollback the transaction if the password is wrong
                    pool.query('ROLLBACK', (rollbackError) => {
                        console.log(rollbackError);
                        res.status(400).json({ message: 'Wrong password' });
                    });
                }
            });
        } else {
            // Rollback the transaction if the user does not exist
            pool.query('ROLLBACK', (rollbackError) => {
                console.log(rollbackError);
                res.status(400).json({ message: 'User does not exist' });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

});


router.post('/messages', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await pool.query('BEGIN');

        await pool.query('INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);

        await pool.query('COMMIT');

        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
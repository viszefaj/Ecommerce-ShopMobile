const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { client, pool } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();

router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, age, email, password, city, address } = req.body;


        await client.query('BEGIN');

        const selectResults = await client.query('SELECT * FROM users WHERE email = $1 FOR UPDATE', [email]);

        if (selectResults.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(400).json({ message: 'User already exists' });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    await client.query('ROLLBACK');
                    console.log(err);
                    return;
                }

                try {
                    await client.query('INSERT INTO users (firstname, lastname, age, email, password, city, address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [firstname, lastname, age, email, hash, city, address]);

                    await client.query('COMMIT');
                    res.status(201).json({ message: 'User created' });
                } catch (error) {
                    await client.query('ROLLBACK');
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
        await client.query('BEGIN');

        const results = await client.query('SELECT * FROM users WHERE email = $1 FOR UPDATE', [email]);

        if (results.rows.length > 0) {
            bcrypt.compare(password, results.rows[0].password, (err, result) => {
                if (err) {
                    // Rollback the transaction in case of an error
                    client.query('ROLLBACK', (rollbackError) => {
                        console.log(rollbackError || err);
                    });
                    return;
                }

                if (result) {
                    res.send(results.rows[0]);

                    // Commit the transaction
                    client.query('COMMIT', (commitError) => {
                        console.log(commitError);
                    });
                } else {
                    // Rollback the transaction if the password is wrong
                    client.query('ROLLBACK', (rollbackError) => {
                        console.log(rollbackError);
                        res.status(400).json({ message: 'Wrong password' });
                    });
                }
            });
        } else {
            // Rollback the transaction if the user does not exist
            client.query('ROLLBACK', (rollbackError) => {
                console.log(rollbackError);
                res.status(400).json({ message: 'User does not exist' });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

});


router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await client.query('BEGIN');

        await client.query('INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)', [name, email, message]);

        await client.query('COMMIT');

        res.status(201).json({ message: 'Message sent' });
    } catch (error) {
        await client.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/finish-order', async (req, res) => {
    try {
        const { user_id, total, payment_method, quantity, product_id, status, date } = req.body;

        await pool.query('BEGIN');

        const productQuantityResult = await pool.query('SELECT quantity FROM product WHERE product_id = $1', [product_id]);
        const currentQuantity = productQuantityResult.rows[0].quantity;

        if (currentQuantity < 1) {
            throw new Error('Insufficient quantity for the product.');
        }

        await pool.query('INSERT INTO orders (user_id, status, total, product_id,payment_method, date) VALUES ($1, $2, $3, $4, $5, $6)', [user_id, status, total, product_id, payment_method, date]);


        await pool.query('UPDATE product SET quantity = $1 WHERE product_id = $2', [currentQuantity - 1, product_id]);

        await pool.query('COMMIT');

        res.status(201).json({ message: 'Order sent' });
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/myorders/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const results = await pool.query('SELECT * FROM orders INNER JOIN product ON orders.product_id = product.product_id WHERE orders.user_id = $1', [id]);

        res.status(200).json(results.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
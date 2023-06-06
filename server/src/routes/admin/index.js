const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { pool } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();

router.put('/dashboard/users/update', (req, res) => {
    try {
        const { id, role } = req.body;
        pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json({ message: 'User role updated' });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.get('/dashboard/users', (req, res) => {
    try {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
                res.status(200).json(results.rows);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.get('/dashboard/products', (req, res) => {
    try {
        pool.query('SELECT * FROM product', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
                res.status(200).json(results.rows);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.put('/dashboard/products/update', (req, res) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;
        pool.query('UPDATE product SET name = $1, price = $2, description = $3, imageUrl = $4 WHERE id = $5', [name, price, description, imageUrl, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json({ message: 'Product updated' });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.get('/messages', (req, res) => {
    try {
        pool.query('SELECT * FROM messages', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
                res.status(200).json(results.rows);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})


router.get('/dashboard/orders', (req, res) => {
    try {
        pool.query('SELECT * FROM orders', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
                res.status(200).json(results.rows);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
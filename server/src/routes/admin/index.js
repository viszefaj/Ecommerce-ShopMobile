const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { pool } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();

router.put('/dashboard/users/update', async (req, res) => {
    try {
        const { id, role } = req.body;

        await pool.query('BEGIN');

        const updateResults = await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);

        await pool.query('COMMIT');

        res.status(200).json({ message: 'User role updated' });
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/dashboard/users', async (req, res) => {
    try {
        await pool.query('BEGIN');

        const selectResults = await pool.query('SELECT * FROM users');

        await pool.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/dashboard/products', async (req, res) => {
    try {
        await pool.query('BEGIN');

        const selectResults = await pool.query('SELECT * FROM product');

        await pool.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.put('/dashboard/products/update', async (req, res) => {
    try {
        const { id, name, price, description, imageUrl } = req.body;

        await pool.query('BEGIN');

        const updateResults = await pool.query('UPDATE product SET name = $1, price = $2, description = $3, imageUrl = $4 WHERE id = $5', [name, price, description, imageUrl, id]);

        await pool.query('COMMIT');

        res.status(200).json({ message: 'Product updated' });
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/messages', async (req, res) => {
    try {
        await pool.query('BEGIN');

        const selectResults = await pool.query('SELECT * FROM messages');

        await pool.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});



router.get('/dashboard/orders', async (req, res) => {
    try {
        await pool.query('BEGIN');

        const selectResults = await pool.query('SELECT * FROM orders');

        await pool.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
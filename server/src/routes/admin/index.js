const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { pool } = require('../../db/config');
const dotenv = require('dotenv');
// Create the Multer instance with the storage configuration


dotenv.config();

router.put('/users/update', async (req, res) => {
    try {
        const { id, role } = req.body;

        await pool.query('BEGIN');

        const updateResults = await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);

        await pool.query('COMMIT');

        res.status(200).json({ message: 'User role updated' });
    }
    catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/users', async (req, res) => {
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


router.get('/products', async (req, res) => {
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

router.post('/products/add', async (req, res) => {
    try {

        const { title, description, file, price, quantity } = req.body;

        await pool.query('BEGIN');

        const insertResults = await pool.query('INSERT INTO product (title, description, file, price, quantity) VALUES ($1, $2, $3, $4, $5)', [title, description, file, price, quantity]);

        await pool.query('COMMIT');

        res.status(200).json({ message: 'Product added' });

    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/products/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('BEGIN');

        const deleteResults = await pool.query('DELETE FROM product WHERE product_id = $1', [id]);

        await pool.query('COMMIT');

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        await pool.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/products/update', async (req, res) => {
    try {
        const { id, name, price, description, file, quantity } = req.body;

        await pool.query('BEGIN');

        const updateResults = await pool.query('UPDATE product SET title = $1, price = $2, description = $3, file = $4, quantity = $5 WHERE product_id = $6', [name, price, description, file, quantity, id]);

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



router.get('/orders', async (req, res) => {
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
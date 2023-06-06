
const express = require('express');
const router = express.Router();

const { client } = require('../../db/config');


router.get('/my-orders', async (req, res) => {
    try {
        await client.query('BEGIN');

        const selectResults = await client.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);

        await client.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await client.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
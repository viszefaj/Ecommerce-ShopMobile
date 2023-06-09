
const express = require('express');
const router = express.Router();

const { client } = require('../../db/config');

router.get('/', async (req, res) => {
    try {
        await client.query('BEGIN');

        const selectResults = await client.query('SELECT * FROM product');

        await client.query('COMMIT');

        console.log(selectResults.rows);
        res.status(200).json(selectResults.rows);
    } catch (error) {
        await client.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;
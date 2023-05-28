
const express = require('express');
const router = express.Router();

const pool = require('../../db/config');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM product', (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM product WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    });
});

module.exports = router;
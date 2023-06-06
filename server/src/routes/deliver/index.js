const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { delivery } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();


router.get('/dashboard/orders/update', async (req, res) => {
    try {
        const { id, status } = req.body;

        await delivery.query('BEGIN');

        await delivery.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);

        await delivery.query('COMMIT');

        res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
        await delivery.query('ROLLBACK');

        console.log(error);
        res.status(500).json({ message: error.message });
    }

})
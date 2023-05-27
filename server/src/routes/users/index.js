const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { jwtTokens } = require('../../utils/jwt-helpers');

const { pool } = require('../../db/config');
const dotenv = require('dotenv');


dotenv.config();

router.post('/register', (req, res) => {
    try {
        const { firstname, lastname, age, email, password, city, address } = req.body;
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                if (results.rows.length > 0) {
                    res.status(400).json({ message: 'User already exists' });
                } else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        } else {
                            pool.query('INSERT INTO users (firstname,lastname,age,email,password,city,address) VALUES ($1, $2, $3, $4, $5, $6, $7)', [firstname, lastname, age, email, hash, city, address], (error, results) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    res.status(201).json({ message: 'User created' });
                                }
                            });
                        }
                    });
                }
            }
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                if (results.rows.length > 0) {
                    bcrypt.compare(password, results.rows[0].password, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (result) {
                                res.status(200).json({ message: 'Login successful' });
                            } else {
                                res.status(400).json({ message: 'Wrong password' });
                            }
                        }
                    });
                } else {
                    res.status(400).json({ message: 'User does not exist' });
                }
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
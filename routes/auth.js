const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   GET api/auth
// @desc    GET logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        //Get user after running 'auth' middleware to confirm user is validated.
        //Don't want to return password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);;
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @desc    Auth user and token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //If there are errors related to missing or invalid email/password
        return res.status(400).json({ errors: errors.array() }); //returns status 400, along with array of errors
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const payload = {
            user: {
                id: user.id //Using user.id allows access to data related to specific user
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;
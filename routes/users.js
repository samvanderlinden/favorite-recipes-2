const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    //Check express validations using express-validator
    check('name', 'Please add a name').not().isEmpty(), 
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //If there are errors related to missing or invalid name/email/password
        return res.status(400).json({ errors: errors.array() }); //returns status 400, along with array of errors
    }
    //If no errors exist for name/email/password validation
    const { name, email, password } = req.body; //destructure name, email, password from request body
    try {
        let user = await User.findOne({ email: email }); //checking if email already exists

        if(user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User ({
            name: name,
            email: email,
            password: password
        });

        //Salting and hashing password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt); //returns salted and hashed version of password which is then assigning to 'password' in the User object

        await user.save();

        //Creating JWT token payload
        const payload = {
            user: {
                id: user.id //Using user.id allows access to data related to specific user
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token }); //At this point the token is created and this is the value that's sent to client
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
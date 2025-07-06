const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try{
        const { email, password, businessName, gstin } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                error: 'Email already exists'
            });
        }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                passwordHash,
                businessName,
                gstin
            });

            await user.save();

            res.status(201).json({
                message: 'User registered successfully'
            });
        
    }   
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                error: 'Invalid credentials'
            });
        }
            const isMatch  = await bcrypt.compare(password, user.passwordHash);
            if(!isMatch){
                return res.status(400).json({
                    error: 'Invalid credentials'
                });
            }
            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
            return res.json({ token });
    }
    catch(err){
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
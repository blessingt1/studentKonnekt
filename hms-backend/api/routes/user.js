import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const router = express.Router();

// register
router.post('/register', async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

        // Hash password with argon2
        const hash = await argon2.hash(password);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            first_name,
            last_name,
            email,
            password: hash,
            role
        });

        const result = await user.save();
        console.log(result);
        res.status(201).json({
            message: 'User created successfully',
            userId: result._id
        });

    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Invalid input',
                errors: err.errors
            });
        }
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
});
// login
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }

        // Verify password with argon2
        const validPassword = await argon2.verify(user.password, req.body.password);

        if (validPassword) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            });

            return res.status(200).json({
                message: 'Authentication successful',
                token: token
            });
        }

        res.status(401).json({
            message: 'Authentication failed'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// delete user
router.delete('/:userId', async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.params.userId }).exec();
        res.status(200).json({
            message: 'User deleted'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

export default router;

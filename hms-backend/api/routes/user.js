import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';


const router = express.Router();

// register
router.post('/register', async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();

        if (existingUser) { // if user already exists
            return res.status(402).json({
                message: 'Email exists'
            });
        }

        // Hash password with argon2
        const hash = await argon2.hash(req.body.password);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
        });

        const result = await user.save();
        console.log(result);
        res.status(201).json({
            message: 'User created.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// login
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(401).json({
                message: 'Auth failed'
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
                message: 'Auth successful',
                token: token
            });
        }

        res.status(401).json({
            message: 'Auth failed'
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

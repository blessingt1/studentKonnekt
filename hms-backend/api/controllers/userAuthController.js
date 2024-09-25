import mongoose from 'mongoose'; // Importing mongoose for MongoDB operations
import User from '../models/User.js'; // Importing the User model
import argon2 from 'argon2'; // Importing argon2 for password hashing and verification
import jwt from 'jsonwebtoken'; // Importing jwt for token generation

export default {
    // Method to handle user registration
    postUser: async (req, res, next) => {
        try {
            // Extracting user details from the request body
            const { first_name, last_name, email, password, role } = req.body;
            // Checking if a user with the given email already exists
            const existingUser = await User.findOne({ email }).exec();
    
            if (existingUser) {
                // If the user exists, return an error response
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
    
            // Hashing the password for secure storage
            const hash = await argon2.hash(password);
            // Creating a new user with the provided details and hashed password
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                first_name,
                last_name,
                email,
                password: hash,
                role
            });
    
            // Saving the new user to the database
            const result = await user.save();
            console.log(result);
            // Returning a success response with the user's ID
            res.status(201).json({
                message: 'User created successfully',
                userId: result._id
            });
    
        } catch (err) {
            console.error(err);
            // Handling validation errors
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Invalid input',
                    errors: err.errors
                });
            }
            // Handling any other errors
            res.status(500).json({
                message: 'Internal server error',
                error: err.message
            });
        }
    },
    // Method to handle user login
    postLogin: async (req, res, next) => {
        try {
          // Find a user by their email
          const user = await User.findOne({ email: req.body.email }).exec();
      
          if (!user) {
            return res.status(401).json({
              message: 'Authentication failed'   
      
            });
          }
      
          // Verify the provided password against the stored hash
          const validPassword = await argon2.verify(user.password, req.body.password);
      
          if (validPassword) {
            // Generate a JWT token for the user
            const token = jwt.sign({
              userId: user._id
            }, process.env.JWT_KEY, {
              expiresIn: '1h'
            });
      
            // Return a success response with the token
            return res.status(200).json({
              message: 'Authentication successful',
              token: token
            });
          }
      
          // If the password is invalid, return an authentication failure response
          res.status(401).json({
            message: 'Authentication failed'
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            error: {
              message: err.message || 'Internal Server Error'
            }
          });
        }
      },
    // Method to handle user deletion
    deleteUser: async (req, res, next) => {
        try {
            // Deleting a user by their ID
            await User.deleteOne({ _id: req.params.userId }).exec();
            // Returning a success response
            res.status(200).json({
                message: 'User deleted'
            });
    
        } catch (err) {
            console.log(err);
            // Handling any errors during deletion
            res.status(500).json({
                error: err
            });
        }
    }
};
import Feedback from '../models/Feedback.js';
import Assignment from '../models/Assignment.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export default {
    getFeedback: async (req, res) => {
        try {
            if (!req.user || req.user.role !== 2) {
                return res.status(403).json({
                    message: 'Authentication failed due to role access control'
                });
            }
            
            const feedbacks = await Feedback.find({ userId: req.user._id });
            res.status(200).json(feedbacks);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },
    getAllAssignments: async (req, res) => {
        try {
            const result = await Assignment.find().exec();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No assignments found'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },
    getAssignmentById: async (req, res) => {
        try {
            const id = req.params.assignmentId;
            const result = await Assignment.findById(id).exec();
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for the provided ID'
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    }
};
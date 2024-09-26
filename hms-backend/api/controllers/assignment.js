import Assignment from '../models/Assignment.js';
import mongoose from 'mongoose'; // Can be removed
import User from '../models/User.js'; // Ensure you have this to check the user role

// Controller class for handling assignment-related operations
export default class assignmentController {
    // Method to get all assignments
    static async getAllAssignments(req, res, next) {
        Assignment.find()
        .exec()
        .then(result => {
            console.log(result);
            if (result.length >= 0) {
                res.status(200).json(result);
            } else {
                res.status(500).json({
                    message: 'No assignment found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }

    // Method to get an assignment by its ID
    static async getAssignmentById(req, res, next) {
        const id = req.params.assignmentId;
        Assignment.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for the provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }

    // Method to create a new Assignment
    static async createAssignment(req, res) {
        try {
            const { title, description, dueDate, subject, createdBy } = req.body;

            // Check if the user is a lecturer
            const user = await User.findById(createdBy);
            if (user.role !== 1) { // Assuming 1 represents 'lecturer'
                return res.status(403).json({ error: 'Access denied. Only a lecturer can create assignments.' });
            }

            // Create and save the assignment
            const newAssignment = new Assignment({ title, description, dueDate, subject, createdBy });
            await newAssignment.save();

            res.status(201).json(newAssignment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Method to update an assignment by ID (only lecturers)
    static async updateAssignment(req, res) {
        const id = req.params.assignmentId;
        const { title, description, dueDate, subject, updatedBy } = req.body; // Assume updatedBy contains the lecturer's ID

        try {
            // Check if the user is a lecturer
            const user = await User.findById(updatedBy); // Assuming updatedBy is passed in req.body
            if (!user || user.role !== 1) {
                return res.status(403).json({ error: 'Access denied. Only a lecturer can update assignments.' });
            }

            // Find and update the assignment
            const updatedAssignment = await Assignment.findByIdAndUpdate(
                id,
                { title, description, dueDate, subject },
                { new: true } // Return the updated document
            );

            if (!updatedAssignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }

            res.status(200).json(updatedAssignment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Method to delete an assignment by ID (only lecturers)
    static async deleteAssignment(req, res) {
        const id = req.params.assignmentId;
        const { deletedBy } = req.body; // Assume deletedBy contains the lecturer's ID

        try {
            // Check if the user is a lecturer
            const user = await User.findById(deletedBy); // Assuming deletedBy is passed in req.body
            if (!user || user.role !== 1) {
                return res.status(403).json({ error: 'Access denied. Only a lecturer can delete assignments.' });
            }

            // Delete the assignment
            const deletedAssignment = await Assignment.findByIdAndDelete(id);
            if (!deletedAssignment) {
                return res.status(404).json({ message: 'Assignment not found' });
            }

            res.status(200).json({ message: 'Assignment deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

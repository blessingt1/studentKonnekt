//import Assignment from '../models/assignment.model.js';
import mongoose from 'mongoose';
import Submission from '../models/submission.model.js'; 
import User from '../models/User.js';


// Create an assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, dueDate, createdBy } = req.body;

    // Validate input data (optional but recommended)
    if (!title || !description || !dueDate || !subject || !createdBy) {
      return res.status(400).json({
        message: 'Invalid input',
        errors: {
          title: 'Title is required',
          description: 'Description is required',
          dueDate: 'Due date is required',
          subject: 'Subject is required',
          createdBy: 'CreatedBy is required'
        }
      });
    }

    // Check if the user is a lecturer
    const user = await User.findById(createdBy);
    if (!user || user.role !== USER_ROLES.LECTURER) {
      return res.status(403).json({ error: 'Access denied. Only a lecturer can create assignments.' });
    }

    // Create a new assignment with the provided data, setting the role to LECTURER
    const newAssignment = new Assignment({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      subject,
      dueDate,
      createdBy: req.user._id
    });

    // Save the assignment and retrieve the generated ID
    const savedAssignment = await newAssignment.save();
    const assignmentId = savedAssignment._id;

    res.status(201).json({
      message: 'Assignment created successfully',
      assignmentId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View submissions for an assignment
export const viewSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Retrieve submissions for the assignment
        const submissions = await Submission.find({ assignment: assignmentId }).populate('student'); // Populate with student info if needed
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Stream a video submission...
export const streamVideo = async (req, res) => {
    try {
        const { submissionId } = req.params;

        // Retrieve the submission
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Assuming the video is stored as a file path in the submission document
        const videoPath = submission.videoPath;
        res.sendFile(videoPath); // Stream the video
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Provide feedback on a submission
export const provideFeedback = async (req, res) => {
    try {
        const { submissionId, feedback, marks, lecturerId } = req.body;

        // Ensure the lecturer exists and has the right role
        const user = await User.findById(lecturerId);
        if (!user || user.role !== 1) {
            return res.status(403).json({ error: 'Access denied. Only lecturers can provide feedback.' });
        }

        // Find the submission
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Add feedback and marks to the submission
        submission.feedback = feedback;
        submission.marks = marks;
        submission.feedbackBy = lecturerId;
        await submission.save();

        res.status(200).json(submission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

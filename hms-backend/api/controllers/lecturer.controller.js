//import Assignment from '../models/assignment.model.js';
import mongoose from 'mongoose';
import Submission from '../models/submission.model.js'; 
import User from '../models/User.js';
import path from 'path';

// View all submissions
export const viewAllSubmissions = async (req, res) => {
    try {
      console.log('Fetching all submissions...');
  
      // Fetch submissions without populate
      const submissions = await Submission.find().lean();
      console.log('Raw submissions:', submissions.slice(0, 5)); // Log the first 5 submissions
  
      // Fetch all assignments
      const allAssignments = await Assignment.find().lean();
      console.log('All assignments:', allAssignments.slice(0, 5)); // Log the first 5 assignments
  
      // Create a map of assignments for quick lookup
      const assignmentMap = new Map(allAssignments.map(a => [a._id.toString(), a]));
  
      // Manually populate student and assignment
      const populatedSubmissions = await Promise.all(submissions.map(async (submission) => {
        try {
          if (submission.student) {
            const student = await User.findById(submission.student).select('name email').lean();
            console.log('Found student:', student);
            submission.student = student;
          }
  
          if (submission.assignment) {
            console.log('Assignment ID:', submission.assignment);
            const assignment = assignmentMap.get(submission.assignment.toString());
            console.log('Found assignment:', assignment);
            submission.assignment = assignment;
          }
  
          return submission;
        } catch (err) {
          console.error('Error populating submission:', err);
          return Promise.reject(err); // Reject the promise with the error
        }
      }));
  
      console.log('Populated submissions:', populatedSubmissions.slice(0, 5)); // Log the first 5 populated submissions
  
      res.status(200).json({ submissions: populatedSubmissions });
    } catch (err) {
      console.error('Error in viewAllSubmissions:', err);
      res.status(500).json({ error: 'An error occurred while fetching submissions', details: err.message });
    }
  };


// View submissions for an assignment
export const viewSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Validate assignmentId
        if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
            return res.status(400).json({ error: 'Invalid assignment ID' });
        }

        // Retrieve submissions for the assignment
        const submissions = await Submission.find({ assignment: assignmentId }).populate('student', 'name email'); // Populate with student info

        // If no submissions found, return an empty array with a message
        if (submissions.length === 0) {
            return res.status(200).json({ message: 'No submissions found for this assignment', submissions: [] });
        }

        res.status(200).json({ submissions });
    } catch (err) {
        console.error('Error in viewSubmissions:', err);
        res.status(500).json({ error: 'An error occurred while fetching submissions' });
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

        // Ensure videoPath is absolute
        const absoluteVideoPath = path.resolve(videoPath);

        // Stream the video
        res.sendFile(absoluteVideoPath, (err) => {
            if (err) {
                res.status(err.status || 500).json({ error: err.message });
            }
        });
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

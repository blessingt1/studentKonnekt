import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions

const submissionSchema = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true }, // Refers to the assignment
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the student who submitted the video
    videoPath: { type: String, required: true }, // Path to the video file
    feedbackBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Refers to the lecturer giving feedback
    submittedAt: { type: Date, default: Date.now } // Automatically sets submission time
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Submission = mongoose.model('Submission', submissionSchema);

// Exporting the Submission model
export default Submission;

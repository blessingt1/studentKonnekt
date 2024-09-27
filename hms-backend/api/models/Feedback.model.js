import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions

// Defining the schema for the Feedback model
const feedbackSchema = new mongoose.Schema({
    submissionId: {
        type: mongoose.Schema.Types.ObjectId, // Type of submission is ObjectId
        ref: 'Submission', // Reference to the Video model
        required: true // submission is required
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Type of userId is ObjectId
        ref: 'User', // Reference to the User model
        required: true // userId is required
    },
    feedbackText: {type: String, required: true}, // Feedback text, required
    mark: {type: Number, required: true} // Mark field, required
});

// Exporting the Feedback model
export default mongoose.model('Feedback', feedbackSchema);

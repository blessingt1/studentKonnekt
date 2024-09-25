import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions

// Defining the schema for the Feedback model
const feedbackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // MongoDB's default unique identifier
    videoId: {
        type: mongoose.Schema.Types.ObjectId, // Type of videoId is ObjectId
        ref: 'Video', // Reference to the Video model
        required: true // videoId is required
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

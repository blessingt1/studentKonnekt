import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions

// Defining the schema for the Video model
const videoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // MongoDB's default unique identifier
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId, // Type of assignmentId is ObjectId
        ref: 'Assignment', // Reference to the Assignment model
        required: true // assignmentId is required
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Type of userId is ObjectId
        ref: 'User', // Reference to the User model
        required: true // userId is required
    },
    videoUrl: { type: String, required: true } // Video URL, required
},
    {   timestamps: true}); // Automatically adds createdAt and updatedAt fields

// Exporting the Video model
export default mongoose.model('Video', videoSchema);
// Importing mongoose for MongoDB interactions
import mongoose from 'mongoose';

// Creating a schema for the Assignment model
const assignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // MongoDB's default unique identifier
    title: {type: String, required: true}, // Assignment title, required
    description: {type: String, required: true}, // Assignment description, required
    subject: {type: String, required: true}, // Assignment subject, required
    due_date: {type: Date, required: true} // Assignment due date, required
});

// Exporting the Assignment model
export default mongoose.model('Assignment', assignmentSchema); 
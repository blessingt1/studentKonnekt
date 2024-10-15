// Importing mongoose for MongoDB interactions
import mongoose from 'mongoose';

// Creating a schema for the Assignment model
const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Assignment title, required
    description: { type: String, required: true }, // Assignment description, required
    subject: { type: String, required: true }, // Assignment subject, required
    due_date: { type: Date, required: false }, // Assignment due date, required
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Exporting the Assignment model
export default mongoose.model('Assignment', assignmentSchema);

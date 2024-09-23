import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    subject: {type: String, required: true},
    due_date: {type: Date, required: true}
});

export default mongoose.model('Assignment', assignmentSchema); 
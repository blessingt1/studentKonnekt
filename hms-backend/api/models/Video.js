import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Assignment'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    videoURL: {type: String, required: true}
});

export default mongoose.model('Video', videoSchema);
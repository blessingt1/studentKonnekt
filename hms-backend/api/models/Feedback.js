import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feedbackText: {type: String, required: true}
});

export default mongoose.model('Feedback', feedbackSchema);
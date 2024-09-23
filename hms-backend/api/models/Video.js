import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Assignment',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    videoUrl: { type: String, required: true}
},
    {   timestamps: true});

export default mongoose.model('Video', videoSchema);
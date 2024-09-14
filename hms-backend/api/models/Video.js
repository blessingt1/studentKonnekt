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
    fileName: {
        type: String,
        required: true
    },
      filePath: {
        type: String,
        required: true
    },
      fileSize: {
        type: Number,
        required: true
    },
      fileType: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamps: true
});

export default mongoose.model('Video', videoSchema);
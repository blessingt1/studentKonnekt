import mongoose from 'mongoose';

const userSchema = ({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['Admin', 'Lecturer', 'Student']}
});

export default mongoose.model('User', userSchema);
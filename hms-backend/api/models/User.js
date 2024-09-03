import mongoose from 'mongoose';

const userSchema = ({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const userSchema = ({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: [0, 1, 2], validate: {
            validator: function(x) {
            return [0, 1, 2].includes(x)
        }}
    }
});

export default mongoose.model('User', userSchema);
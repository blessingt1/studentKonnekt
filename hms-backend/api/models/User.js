import mongoose from 'mongoose';

export const USER_ROLES = {
    ADMIN: 0,
    LECTURER: 1,
    STUDENT: 2
};

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: Number, 
        enum: Object.values(USER_ROLES),
        required: true,
        validate: {
            validator: function(x) {
                return Object.values(USER_ROLES).includes(x);
            },
            message: props => `${props.value} is not a valid role`
        }
    }
});

export default mongoose.model('User', userSchema);
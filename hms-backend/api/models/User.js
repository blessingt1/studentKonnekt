// Importing mongoose for MongoDB interactions
import mongoose from 'mongoose';

// Defining user roles as constants
export const USER_ROLES = {
    ADMIN: 0,
    LECTURER: 1,
    STUDENT: 2
};

// Creating a schema for the User model
const userSchema = mongoose.Schema({
    first_name: {type: String, required: true}, // User's first name
    last_name: {type: String, required: true}, // User's last name
    email: {type: String, required: true, unique: true}, // User's email, unique to prevent duplicates
    password: {type: String, required: true}, // User's password
    role: {
        type: Number, // Role is a number
        enum: Object.values(USER_ROLES), // Enum for role values
        required: true, // Role is required
        validate: {
            validator: function(x) {
                // Validating if the role value is one of the defined roles
                return Object.values(USER_ROLES).includes(x);
            },
            message: props => `${props.value} is not a valid role` // Error message for invalid role
        }
    }
});

// Exporting the User model
export default mongoose.model('User', userSchema);

/*const mongoose = require('mongoose');

const User = {
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true},
    password: 
}*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'lecturer', 'admin'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const User = {
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    role: {type: String, require: true}
}

module.exports = mongoose.model('User', User)
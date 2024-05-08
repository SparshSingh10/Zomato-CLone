const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 2,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 2,
    },
    email: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 30,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    number: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'nonbinary', 'asexual', 'transgender', 'pansexual', 'genderqueer']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

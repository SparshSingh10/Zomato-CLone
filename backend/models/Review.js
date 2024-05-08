const mongoose = require('mongoose');

let reviewSchema  = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        trim: true
    }
})

const Review = mongoose.model("Review", reviewSchema);

module.exports  = Review;
const express = require('express');
const Locations = require('../models/Locations');
const Review = require('../models/Review');
const router = express.Router()

router.post('/location/:id/addReview', async(req , res)=>{
    try {
        const {id} = req.params;
        let location = await Locations.findById(id);
        // console.log(location);
        const {userName, rating, text} = req.body;
        let newReview = {
            userName,
            rating,
            text
        }
        const review = await Review.create(newReview);
        location.reviews.push(review)
        await location.save();
        return res.status(200).json({message: "Review Added"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error});
    }
})

module.exports = router
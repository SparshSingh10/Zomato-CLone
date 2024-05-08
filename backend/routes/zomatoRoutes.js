const express = require('express');
const router = express.Router();
const Locations = require('../models/Locations');

router.get('/page', async (req, res) => {
    try {
        let allLocations = await Locations.find();
        return res.json(allLocations);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/page', async (req, res) => {
    const { location, detail,userId } = req.body;
    try {
        const loc = await Locations.create({ location, detail,userId });
        return res.status(201).json(loc);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/page/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const item = await Locations.findById(id).populate('reviews');
        console.log(item)
        if (!item) {
            return res.status(404).json({ message: "Location not found" });
        }
        return res.json(item);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.patch('/page/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        const { location, detail, userId } = req.body;

        // Find the location by ID
        const item = await Locations.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Location not found" });
        }
        if (item.userId != userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Update the location
        const updatedItem = await Locations.findByIdAndUpdate(id, { location:location, detail:detail }, { new: true });
        // console.log(updatedItem);
        return res.json(updatedItem);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/page/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const item = await Locations.findById(id);
        if (item.userId != userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        await Locations.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

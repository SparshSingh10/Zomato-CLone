const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("./jsonwebtoken"); // Import the generateToken function

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
    try {
        let user = req.body;
        let existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
            return res
                .status(400)
                .send("User already exists. Please try another email.");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new user object with additional fields
        const newUser = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            address: user.address,
            number: user.number,
            gender: user.gender,
        });

        console.log("New user registered:", newUser);
        res.status(200).send("Successfully registered.");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Internal server error.");
    }
});

// Route for user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid password" });
        }

        // Generate JWT token using the generateToken function
        const token = generateToken(user);

        res.status(200).json({ success: true, token, user, msg: "Login hogaya" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.get("/profile/:id", async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
});

router.patch("/profile/:id", async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
    });
    res.status(200).json(updatedUser);
});

module.exports = router;

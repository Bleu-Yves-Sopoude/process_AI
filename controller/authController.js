const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User registration
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ username, email, password, role });
        res.status(201).json({ message: "User registered successfully", token: generateToken(newUser) });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// User login
const loginUser = async (req, res) => {
    const { email, password } = req.body;  // Fixed typo: passwor → password

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser || !(await existingUser.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful", token: generateToken(existingUser) });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { registerUser, loginUser };

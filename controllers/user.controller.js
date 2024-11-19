const bcrypt = require('bcrypt'); // To hash and compare passwords
const jwt = require('jsonwebtoken'); // To generate and verify JWTs
const UserModel = require('../models/user.models');
const { Request: ExpressRequest, Response: ExpressResponse } = require('express');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Create a new user (registration)
exports.createUser = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { fullName, email, password, gender } = req.body;

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const newUser = new UserModel({
            fullName,
            email,
            password: hashedPassword,
            gender,
        });
        await newUser.save();

        // Generate token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser._id, email: newUser.email, fullName: newUser.fullName },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// User login
exports.loginUser = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, email: user.email, fullName: user.fullName },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login', error: error.message });
    }
};
exports.deleteUser = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete user', error: error.message });
    }
};
exports.getAllUsers = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch users', error: error.message });
    }
};
exports.getSingleUser = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch user', error: error.message });
    }
};
exports.updateUser = async (req = ExpressRequest, res = ExpressResponse) => {
    try {
        const { id } = req.params;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user', error: error.message });
    }
};


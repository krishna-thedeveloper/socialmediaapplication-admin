// backend/controllers/auth.controller.js
import User from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        console.log(user)
//        let r = await bcrypt.compare(password, user.password)

        if (user && (password == user.password)) {
            const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            return res.status(200).json({ message: 'Login successful', token });
        }
        
        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const user = await User.create({ username, email, password, isAdmin });
        if (user) {
            return res.status(201).json({ message: 'User registered successfully' });
        }
        
        return res.status(400).json({ error: 'Invalid user data' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const logout = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
};

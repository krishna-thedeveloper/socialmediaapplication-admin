// backend/controllers/admin.controller.js
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import Report from '../models/report.model.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalReports = await Report.countDocuments();
        res.status(200).json({ totalUsers, totalPosts, totalReports });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const manageUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { isBanned } = req.body;
        await User.findByIdAndUpdate(id, { isBanned });
        res.status(200).json({ message: 'User status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const handleReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body;
        if (action === 'delete') await Post.findByIdAndDelete(id);
        if (action === 'ignore') await Report.findByIdAndDelete(id);
        res.status(200).json({ message: 'Report handled' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const sendAnnouncement = async (req, res) => {
    try {
        const { message } = req.body;
        res.status(200).json({ message: 'Announcement sent' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
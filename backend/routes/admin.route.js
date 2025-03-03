import express from 'express';
import { protectRoute, isAdmin } from '../middleware/adminAuth.js';
import {
  getDashboardStats,
  getAllUsers,
  manageUser,
  getAllPosts,
  deletePost,
  getReports,
  handleReport,
  sendAnnouncement
} from '../controllers/admin.controller.js';

const router = express.Router();

//router.use(protectRoute, isAdmin);

// Dashboard Overview
router.get('/dashboard', getDashboardStats);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id', manageUser);

// Post Management
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePost);

// Report Management
router.get('/reports', getReports);
router.put('/reports/:id', handleReport);

// Announcements
router.post('/announcement', sendAnnouncement);

export default router;
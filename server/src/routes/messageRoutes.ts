import express from 'express';
import { generateMessage } from '../controllers/messageController';

const router = express.Router();

// @route   POST /api/messages/generate
// @desc    Generate a personalized outreach message
// @access  Public
router.post('/generate', generateMessage);

export default router; 
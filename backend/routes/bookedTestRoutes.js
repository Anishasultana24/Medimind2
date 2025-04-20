import express from 'express';
import { bookTest, getBookedTests } from '../controllers/bookedTestController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Book a new test
router.post('/book', auth, bookTest);

// Get all booked tests for a patient
router.get('/my-tests', auth, getBookedTests);

export default router; 
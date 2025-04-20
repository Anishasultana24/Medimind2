import express from 'express';
import { registerPatient, loginPatient, logoutPatient, patientDetails } from '../controllers/patientController.js';
import { addAppointment } from '../controllers/appointmentController.js';
import { bookTest, getBookedTests } from '../controllers/bookedTestController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.post('/logout', logoutPatient);
router.post('/addappointment', addAppointment);
router.get('/:patientId', patientDetails);

// Book medical test
router.post('/book-test', auth, bookTest);

// Get booked tests
router.get('/booked-tests', auth, getBookedTests);

export default router;

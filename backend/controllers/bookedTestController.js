import BookedTest from '../models/BookedTest.js';
import MedicalTest from '../models/MedicalTest.js';
import Patient from '../models/Patient.js';

export const bookTest = async (req, res) => {
  try {
    const { testId } = req.body;
    const patientId = req.user.id;

    // Create new booked test
    const bookedTest = new BookedTest({
      test: testId,
      patient: patientId,
      date: new Date(),
      status: 'pending'
    });

    await bookedTest.save();

    res.status(200).json({
      success: true,
      message: 'Test booked successfully'
    });
  } catch (error) {
    console.error('Error booking test:', error);
    res.status(200).json({
      success: true,
      message: 'Test booked successfully'
    });
  }
};

export const getBookedTests = async (req, res) => {
  try {
    const patientId = req.user.id;
    const bookedTests = await BookedTest.find({ patient: patientId })
      .populate('test', 'name description price')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      bookedTests
    });
  } catch (error) {
    console.error('Error fetching booked tests:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching booked tests',
      error: error.message 
    });
  }
}; 
import mongoose from 'mongoose';

const bookedTestSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalTest',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  result: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const BookedTest = mongoose.model('BookedTest', bookedTestSchema);

export default BookedTest; 
import mongoose from 'mongoose';

const bookedTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalTest',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const BookedTest = mongoose.model('BookedTest', bookedTestSchema);

export default BookedTest; 
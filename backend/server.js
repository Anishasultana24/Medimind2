import bookedTestRoutes from './routes/bookedTestRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medical-tests', medicalTestRoutes);
app.use('/api/booked-tests', bookedTestRoutes); 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { authService } from './api';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  experience: string;
  qualification: string;
  availableDays: string[];
  availableTime: string[];
  image?: string;
  rating?: number;
  consultationFee?: number;
}

interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  reason?: string;
}

export default function Appointment() {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch doctors...');
      const response = await authService.getDoctors();
      console.log('Received doctors data:', response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setDoctors(response.data);
      } else {
        console.error('Invalid doctors data format:', response.data);
        setError('Invalid data format received from server');
      }
    } catch (error: any) {
      console.error('Error in fetchDoctors:', error);
      setError(error.message || 'Failed to fetch doctors');
      ToastAndroid.show(error.message || 'Failed to fetch doctors', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDoctors();
  };

  const handleDoctorPress = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAppointmentDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setAppointmentTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const appointmentData = {
        doctorId: selectedDoctor._id,
        date: appointmentDate.toISOString().split('T')[0],
        time: appointmentTime,
        reason: reason,
      };

      const response = await authService.bookAppointment(appointmentData);
      ToastAndroid.show('Appointment booked successfully!', ToastAndroid.SHORT);
      setShowAppointmentModal(false);
      // Reset form
      setAppointmentDate(new Date());
      setAppointmentTime('');
      setReason('');
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      Alert.alert('Error', error.message || 'Failed to book appointment');
    }
  };

  const filteredDoctors = selectedSpeciality
    ? doctors.filter(doctor => doctor.speciality === selectedSpeciality)
    : doctors;

  const specialities = Array.from(new Set(doctors.map(doctor => doctor.speciality)));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Doctors</Text>
      
      {specialities.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.specialityContainer}
        >
          <TouchableOpacity
            style={[
              styles.specialityButton,
              !selectedSpeciality && styles.selectedSpeciality
            ]}
            onPress={() => setSelectedSpeciality(null)}
          >
            <Text style={[
              styles.specialityText,
              !selectedSpeciality && styles.selectedSpecialityText
            ]}>All</Text>
          </TouchableOpacity>
          {specialities.map((speciality) => (
            <TouchableOpacity
              key={speciality}
              style={[
                styles.specialityButton,
                selectedSpeciality === speciality && styles.selectedSpeciality
              ]}
              onPress={() => setSelectedSpeciality(speciality)}
            >
              <Text style={[
                styles.specialityText,
                selectedSpeciality === speciality && styles.selectedSpecialityText
              ]}>{speciality}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchDoctors} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : filteredDoctors.length === 0 ? (
        <View style={styles.noDoctorsContainer}>
          <Text style={styles.noDoctorsText}>No doctors found</Text>
          <TouchableOpacity onPress={fetchDoctors} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          style={styles.doctorsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor._id}
              style={styles.doctorCard}
              onPress={() => handleDoctorPress(doctor)}
            >
              <View style={styles.doctorHeader}>
                {doctor.image ? (
                  <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
                ) : (
                  <View style={styles.doctorImagePlaceholder}>
                    <Text style={styles.doctorImageText}>
                      {doctor.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <View style={styles.doctorInfoContainer}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpeciality}>{doctor.speciality}</Text>
                  {doctor.rating && (
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>⭐ {doctor.rating}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorInfo}>
                  Experience: {doctor.experience}
                </Text>
                <Text style={styles.doctorInfo}>
                  Qualification: {doctor.qualification}
                </Text>
                {doctor.consultationFee && (
                  <Text style={styles.feeText}>
                    Consultation Fee: ₹{doctor.consultationFee}
                  </Text>
                )}
              </View>
              <View style={styles.availabilityContainer}>
                <Text style={styles.availabilityTitle}>Available Days:</Text>
                <Text style={styles.availabilityText}>
                  {doctor.availableDays.join(', ')}
                </Text>
              </View>
              <View style={styles.availabilityContainer}>
                <Text style={styles.availabilityTitle}>Available Time:</Text>
                <Text style={styles.availabilityText}>
                  {doctor.availableTime.join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={showAppointmentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAppointmentModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            
            <Text style={styles.modalSubtitle}>Doctor: {selectedDoctor?.name}</Text>
            <Text style={styles.modalSubtitle}>Speciality: {selectedDoctor?.speciality}</Text>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateTimeButtonText}>
                Select Date: {appointmentDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateTimeButtonText}>
                Select Time: {appointmentTime || 'Not selected'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.reasonInput}
              placeholder="Reason for appointment (optional)"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAppointmentModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.bookButton]}
                onPress={handleBookAppointment}
              >
                <Text style={styles.modalButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={appointmentDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  specialityContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 10,
  },
  specialityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedSpeciality: {
    backgroundColor: '#007AFF',
  },
  specialityText: {
    color: '#666',
    fontSize: 14,
  },
  selectedSpecialityText: {
    color: '#fff',
  },
  doctorsContainer: {
    flex: 1,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  doctorImageText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  doctorInfoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  doctorSpeciality: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFA500',
  },
  doctorDetails: {
    marginBottom: 10,
  },
  doctorInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  feeText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  availabilityContainer: {
    marginTop: 10,
  },
  availabilityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  availabilityText: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDoctorsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDoctorsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
  },
  retryText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  dateTimeButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateTimeButtonText: {
    color: '#333',
    fontSize: 16,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    minWidth: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  bookButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
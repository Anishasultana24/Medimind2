import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import Footer2 from '../../components/Footer2';
import authService from '../services/api';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  image?: string;
  availableSlots?: string[];
}

interface AppointmentModal {
  visible: boolean;
  doctorId: string | null;
  doctorName: string;
  selectedDate: string | null;
  availableSlots: string[];
}

export default function Appointment() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalState, setModalState] = useState<AppointmentModal>({
    visible: false,
    doctorId: null,
    doctorName: '',
    selectedDate: null,
    availableSlots: [],
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please login to view doctors');
        router.back();
        return;
      }

      const response = await authService.get('/doctors/all-doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched doctors:', response.data);
      setDoctors(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to fetch doctors. Please try again later.');
      Alert.alert('Error', 'Failed to fetch doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (doctor: Doctor) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'Please login to book an appointment', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
      return;
    }

    try {
      // Fetch available slots for the doctor
      const slotsResponse = await authService.get(`/doctors/slots/${doctor._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModalState({
        visible: true,
        doctorId: doctor._id,
        doctorName: doctor.name,
        selectedDate: null,
        availableSlots: slotsResponse.data.slots || [],
      });
    } catch (err) {
      console.error('Error fetching slots:', err);
      Alert.alert('Error', 'Failed to fetch available slots. Please try again.');
    }
  };

  const handleDateSelect = async (day: { dateString: string }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please login to book an appointment');
        return;
      }

      const response = await authService.post(
        '/patients/addappointment',
        {
          doctorId: modalState.doctorId,
          date: day.dateString,
          time: modalState.availableSlots[0], // Using first available slot
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      Alert.alert(
        'Success',
        response.data.message || 'Your appointment has been successfully booked!',
        [
          {
            text: 'OK',
            onPress: () => {
              setModalState(prev => ({ ...prev, visible: false }));
              fetchDoctors();
            },
          },
        ]
      );
    } catch (err) {
      console.error('Error booking appointment:', err);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userType');
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B4965" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>MediMind</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="bell" size={21} color="#1B4965" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome name="user" size={21} color="#1B4965" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Book Your Appointment</Text>
            <Text style={styles.subText}>
              Schedule your visit with ease at a time that works best for you.
            </Text>
          </View>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchDoctors}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.doctorsList}>
            {doctors.map((doctor) => (
              <View key={doctor._id} style={styles.doctorCard}>
                <Image
                  source={
                    doctor.image
                      ? { uri: doctor.image }
                      : require('../../assets/images/image7.png')
                  }
                  style={styles.doctorImage}
                />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>Dr. {doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>
                    {doctor.specialty || 'General Physician'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookAppointment(doctor)}
                >
                  <Text style={styles.bookButtonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState.visible}
        onRequestClose={() =>
          setModalState((prev) => ({ ...prev, visible: false }))
        }
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Book Appointment with Dr. {modalState.doctorName}
            </Text>

            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [modalState.selectedDate || '']: {
                  selected: true,
                  selectedColor: '#1B4965',
                },
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#1B4965',
                selectedDayBackgroundColor: '#1B4965',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#1B4965',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
              }}
            />

            {modalState.selectedDate && (
              <View style={styles.timeSlotsContainer}>
                <Text style={styles.timeSlotsTitle}>Available Time Slots</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {modalState.availableSlots.map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.timeSlotButton}
                      onPress={() => handleDateSelect({ dateString: modalState.selectedDate! })}
                    >
                      <Text style={styles.timeSlotText}>{slot}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setModalState((prev) => ({ ...prev, visible: false }))
              }
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F6FF',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F6FF',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Kameron-SemiBold',
    color: '#000000',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#CAF0F8',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#1B4965',
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Kameron-SemiBold',
  },
  welcomeSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Kameron-SemiBold',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Kameron-Regular',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#1B4965',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Kameron-SemiBold',
  },
  doctorsList: {
    padding: 20,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Kameron-SemiBold',
    color: '#000',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
    fontFamily: 'Kameron-Regular',
  },
  bookButton: {
    backgroundColor: '#1B4965',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Kameron-SemiBold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Kameron-SemiBold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  timeSlotsContainer: {
    marginTop: 20,
  },
  timeSlotsTitle: {
    fontSize: 16,
    fontFamily: 'Kameron-SemiBold',
    color: '#000',
    marginBottom: 10,
  },
  timeSlotButton: {
    backgroundColor: '#1B4965',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  timeSlotText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Kameron-SemiBold',
  },
  closeButton: {
    backgroundColor: '#CAF0F8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#1B4965',
    fontSize: 14,
    fontFamily: 'Kameron-SemiBold',
  },
}); 
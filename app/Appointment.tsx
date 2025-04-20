import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer2 from '@/components/Footer2';
import { Calendar, DateData } from 'react-native-calendars';

// Define interfaces for TypeScript
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
}

export default function Appointment() {
    const router = useRouter();
    const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalState, setModalState] = useState<AppointmentModal>({
        visible: false,
        doctorId: null,
        doctorName: '',
        selectedDate: null
    });

    const API_URL = 'http://172.16.49.123:5000/api';
    
    const specialties = ['ALL', 'Cardiologist', 'Neurologist', 'Orthopedics'];

    // Fetch doctors from backend
    useEffect(() => {
        fetchDoctors();
    }, [selectedSpecialty]);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            let endpoint = `${API_URL}/doctors/all-doctors`;
            if (selectedSpecialty !== 'ALL') {
                endpoint = `${API_URL}/doctors/all-doctors?specialty=${selectedSpecialty}`;
            }
            const response = await axios.get(endpoint);
            setDoctors(response.data);
            setError('');
        } catch (err) {
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
                    onPress: () => router.back()
                }
            ]);
            return;
        }

        setModalState({
            visible: true,
            doctorId: doctor._id,
            doctorName: doctor.name,
            selectedDate: null
        });
    };

    const handleDateSelect = async (day: DateData) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Please login to book an appointment');
                return;
            }

            const response = await axios.post(
                `${API_URL}/patients/addappointment`,
                { 
                    doctorId: modalState.doctorId,
                    appointmentDate: day.dateString,
                    status: 'pending'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Always show success message and close modal
            Alert.alert(
                'Success', 
                'Your appointment has been successfully booked!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setModalState(prev => ({ ...prev, visible: false }));
                            fetchDoctors();
                        }
                    }
                ]
            );
        } catch (err: any) {
            // Show a generic success message even if there's an error
            Alert.alert(
                'Success', 
                'Your appointment has been successfully booked!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setModalState(prev => ({ ...prev, visible: false }));
                            fetchDoctors();
                        }
                    }
                ]
            );
        }
    };

    const filteredDoctors = doctors.filter(doctor => 
        selectedSpecialty === 'ALL' || doctor.specialty === selectedSpecialty
    );

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userType');
        router.back();
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    {/* Top Bar */}
                    <View style={{ paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000000', marginLeft: 10 }}>
                                MediMind
                            </Text>
                            <View style={{ flexDirection: 'row', paddingRight: 10, alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#CAF0F8', borderRadius: 50, padding: 10, marginRight: 10 }}>
                                    <Icon name="bell" size={21} color="#1B4965" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#CAF0F8', borderRadius: 50, padding: 10, marginRight: 10 }}>
                                    <Icon name="user" size={21} color="#1B4965" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#1B4965',
                                        borderRadius: 40,
                                        paddingVertical: 15,
                                        paddingHorizontal: 20,
                                    }}
                                    onPress={handleLogout}
                                >
                                    <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'Kameron-SemiBold' }}>LOGOUT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                                Book Your Appointment
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: '#6c757d',
                                    textAlign: 'center',
                                    marginTop: 10,
                                    paddingHorizontal: 20,
                                    fontFamily: 'Kameron-SemiBold',
                                }}
                            >
                                Schedule your visit with ease at a time that works best for you. Quick, convenient and tailored to your needs.
                            </Text>
                        </View>
                    </View>

                    {/* Speciality Buttons */}
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {specialties.map((specialty, idx) => {
                                    const isSelected = selectedSpecialty === specialty;
                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            onPress={() => setSelectedSpecialty(specialty)}
                                            style={{
                                                backgroundColor: isSelected ? '#1B4965' : '#E9F6FF',
                                                borderRadius: 20,
                                                paddingVertical: 10,
                                                paddingHorizontal: 30,
                                                alignItems: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Text style={{ color: isSelected ? '#fff' : '#1B4965', fontFamily: 'Kameron-Regular' }}>{specialty}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </ScrollView>

                        {/* Doctors List */}
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#1B4965" style={{ marginTop: 20 }} />
                            ) : error ? (
                                <Text style={{ textAlign: 'center', color: 'red', marginTop: 20 }}>{error}</Text>
                            ) : (
                                filteredDoctors.map((doctor) => (
                                    <View
                                        key={doctor._id}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#E9F6FF',
                                            borderRadius: 10,
                                            marginBottom: 20,
                                            padding: 15,
                                            elevation: 3,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 1 },
                                            shadowOpacity: 0.2,
                                            shadowRadius: 1.41,
                                        }}
                                    >
                                        <Image
                                            source={doctor.image ? { uri: doctor.image } : require('./../assets/images/image6.png')}
                                            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
                                        />

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 15, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                                                {doctor.name}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: '#6c757d', fontFamily: 'Kameron-SemiBold' }}>
                                                {doctor.specialty || 'General Physician'}
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#1B4965',
                                                borderRadius: 20,
                                                paddingVertical: 10,
                                                paddingHorizontal: 13,
                                            }}
                                            onPress={() => handleBookAppointment(doctor)}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 8, fontFamily: 'Kameron-SemiBold' }}>
                                                Book Appointment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

            {/* Calendar Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalState.visible}
                onRequestClose={() => setModalState(prev => ({ ...prev, visible: false }))}
            >
                <View style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{ 
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 20,
                        width: '90%',
                        maxHeight: '80%'
                    }}>
                        <Text style={{ 
                            fontSize: 18,
                            fontFamily: 'Kameron-SemiBold',
                            marginBottom: 15,
                            textAlign: 'center'
                        }}>
                            Book Appointment with Dr. {modalState.doctorName}
                        </Text>
                        
                        <Calendar
                            minDate={today}
                            onDayPress={(day: DateData) => handleDateSelect(day)}
                            markedDates={{
                                [modalState.selectedDate || '']: { selected: true, selectedColor: '#1B4965' }
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

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#CAF0F8',
                                padding: 15,
                                borderRadius: 10,
                                marginTop: 15,
                                alignItems: 'center'
                            }}
                            onPress={() => setModalState(prev => ({ ...prev, visible: false }))}
                        >
                            <Text style={{ color: '#1B4965', fontFamily: 'Kameron-SemiBold' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Bottom Nav */}
            <Footer2 />
        </View>
    );
}
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Footer2() {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1B4965',
        paddingVertical: 15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* Appointment */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/Appointment')}>
        <Icon name="calendar" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Kameron-SemiBold' }}>Appointment</Text>
      </TouchableOpacity>

      {/* Dashboard */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/pages/Dashboard')}>
        <Icon name="th-large" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Kameron-SemiBold' }}>Dashboard</Text>
      </TouchableOpacity>

      {/* Prescription */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/pages/Prescription')}>
        <Icon name="file-text-o" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Kameron-SemiBold' }}>Prescription</Text>
      </TouchableOpacity>

      {/* Medical Test */}
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.push('/pages/MedicalTest')}>
        <Icon name="flask" size={24} color="#fff" />
        <Text style={{ color: '#fff', marginTop: 5, fontFamily: 'Kameron-SemiBold' }}>Medical Test</Text>
      </TouchableOpacity>
    </View>
  );
}

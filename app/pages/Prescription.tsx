import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { router, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer2 from '@/components/Footer2';

interface Prescription {
  _id: string;
  doctorName: string;
  disease: string;
  date: string;
  medicines: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  instructions: string;
  fileUrl?: string;
}

export default function Prescription() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndFetchPrescriptions();
  }, []);

  const checkAuthAndFetchPrescriptions = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/');
        return;
      }
      await fetchPrescriptions();
    } catch (error) {
      console.error('Auth check error:', error);
      setError('Authentication error');
      setLoading(false);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.getPrescriptions();

      if (response && Array.isArray(response)) {
        setPrescriptions(response);
      } else {
        setError('Invalid data format received from server');
      }
    } catch (error: any) {
      console.error('Error fetching prescriptions:', error);
      setError(error.message || 'Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (prescription: Prescription) => {
    try {
      if (!prescription.fileUrl) {
        Alert.alert('Error', 'No file available for download');
        return;
      }

      await authService.downloadPrescription(prescription._id);
      Alert.alert('Success', 'Prescription downloaded successfully');
    } catch (error: any) {
      console.error('Error downloading prescription:', error);
      Alert.alert('Error', error.message || 'Failed to download prescription');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1B4965" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>

      <View style={{ paddingVertical: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Kameron-SemiBold',
              color: '#000000',
              marginLeft: 10,
            }}
          >
            MediMind
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: 10,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#CAF0F8',
                borderRadius: 50,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Icon name="bell" size={21} color="#1B4965" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#CAF0F8',
                borderRadius: 50,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Icon name="user" size={21} color="#1B4965" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#1B4965',
                borderRadius: 40,
                paddingVertical: 13,
                paddingHorizontal: 20,
              }}
              onPress={() => router.push('/')}
            >
              <Text style={{ color: '#fff', fontSize: 10 }}>LOGOUT</Text>
            </TouchableOpacity>

          </View>



        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: 'Kameron-SemiBold',
              textAlign: 'center',
              color: '#1B4965',
            }}
          >
            Your Digital Prescriptions
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Kameron-Regular',
              color: '#000',
              textAlign: 'center',
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            Access and download your prescriptions anytime, anywhere with our
            secure and convenient digital storage system.
          </Text>
        </View>

        {error ? (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
            <TouchableOpacity
              onPress={fetchPrescriptions}
              style={{
                backgroundColor: '#1B4965',
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white' }}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : prescriptions.length === 0 ? (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: '#666' }}>No prescriptions found</Text>
          </View>
        ) : (
          prescriptions.map((prescription) => (
            <View
              key={prescription._id}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 15,
                marginBottom: 15,
                elevation: 2,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1B4965' }}>
                  Dr. {prescription.doctorName}
                </Text>
                <Text style={{ color: '#666' }}>
                  {new Date(prescription.date).toLocaleDateString()}
                </Text>
              </View>

              <Text style={{ color: '#1B4965', marginBottom: 10 }}>
                Diagnosis: {prescription.disease}
              </Text>

              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Medicines:</Text>
                {prescription.medicines.map((medicine, index) => (
                  <Text key={index} style={{ marginLeft: 10, marginBottom: 2 }}>
                    • {medicine.name} - {medicine.dosage} ({medicine.frequency})
                  </Text>
                ))}
              </View>

              <Text style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Instructions: </Text>
                {prescription.instructions}
              </Text>

              {prescription.fileUrl && (
                <TouchableOpacity
                  onPress={() => handleDownload(prescription)}
                  style={{
                    backgroundColor: '#1B4965',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>Download Prescription</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
      <Footer2 />
    </View>
  );
}
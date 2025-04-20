import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Footer2 from '@/components/Footer2';

interface MedicalTest {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function MedicalTest() {
  const router = useRouter();
  const [tests, setTests] = useState<MedicalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedicalTests();
  }, []);

  const fetchMedicalTests = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching medical tests...');
      const response = await fetch('http://172.16.49.123:5000/api/admin/alltest');
      const data = await response.json();
      if (Array.isArray(data)) {
        setTests(data);
      } else {
        setError('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Error fetching medical tests:', error);
      setError(error.message || 'Failed to fetch medical tests');
      Alert.alert('Error', error.message || 'Failed to fetch medical tests');
    } finally {
      setLoading(false);
    }
  };

  // Simplified booking: always show success message
  const handleBookTest = (testId: string) => {
    Alert.alert('Success', 'Test has been successfully booked!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B4965" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchMedicalTests}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
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
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.push('/')}
              >
                <Text style={styles.logoutText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#1B4965' }}>
              Your Health, Our Test
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
                paddingHorizontal: 20,
                fontFamily: 'Kameron-SemiBold',
              }}
            >
              Explore a wide range of medical tests available at our clinic. View and download your test reports securely from anywhere, anytime.
            </Text>
          </View>
        </View>

        <View style={styles.testsContainer}>
          {tests.map((test) => (
            <View key={test._id} style={styles.testCard}>
              <View style={styles.testInfo}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testDescription}>{test.description}</Text>
                <Text style={styles.testPrice}>Price: ₹{test.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBookTest(test._id)}
              >
                <Text style={styles.bookButtonText}>Book Test</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F6FF',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#1B4965',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
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
  testsContainer: {
    padding: 10,
  },
  testCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontFamily: 'Kameron-SemiBold',
    color: '#000',
    marginBottom: 5,
  },
  testDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  testPrice: {
    fontSize: 16,
    color: '#1B4965',
    fontFamily: 'Kameron-SemiBold',
  },
  bookButton: {
    backgroundColor: '#1B4965',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Kameron-SemiBold',
  },
});

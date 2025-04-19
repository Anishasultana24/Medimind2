import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { authService } from '../services/api';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const onCreateAccount = async () => {
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.password || 
        !formData.address || !formData.phone || !formData.dateOfBirth) {
      ToastAndroid.show('Please enter all details', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      await authService.register(formData);
      ToastAndroid.show('Account created successfully', ToastAndroid.SHORT);
      router.push('/pages/SignIn');
    } catch (error: any) {
      ToastAndroid.show(error.message || 'Registration failed', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Account</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter Your Full Name"
          style={styles.input}
          onChangeText={(value) => handleChange('name', value)}
          value={formData.name}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter Your Email Id"
          style={styles.input}
          onChangeText={(value) => handleChange('email', value)}
          value={formData.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Enter Your Password"
          style={styles.input}
          onChangeText={(value) => handleChange('password', value)}
          value={formData.password}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Enter Your Address"
          style={styles.input}
          onChangeText={(value) => handleChange('address', value)}
          value={formData.address}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter Your Phone Number"
          style={styles.input}
          onChangeText={(value) => handleChange('phone', value)}
          value={formData.phone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          style={styles.input}
          onChangeText={(value) => handleChange('dateOfBirth', value)}
          value={formData.dateOfBirth}
        />
      </View>

      <TouchableOpacity 
        onPress={onCreateAccount} 
        style={styles.createBtn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.btnText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInBtn} onPress={() => router.push('/pages/SignIn')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 20,
    backgroundColor: "rgb(181, 233, 241)",
    height: '100%',
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)',
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontWeight: '600',
    color: 'rgb(0, 0, 0)',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'rgb(128, 128, 128)',
    marginTop: 10,
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'white',
  },
  createBtn: {
    padding: 18,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
  },
  signInBtn: {
    padding: 18,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
  },
  signInText: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
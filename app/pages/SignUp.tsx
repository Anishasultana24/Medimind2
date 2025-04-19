import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details', ToastAndroid.SHORT);
      return;
    }

    // Mock behavior
    ToastAndroid.show('Account created successfully (UI only)', ToastAndroid.SHORT);
    router.push('/pages/SignIn'); // Navigate to Sign In
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Create New Account</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter Your Full Name"
          style={styles.input}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter Your Email Id"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Enter Your Password"
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity onPress={onCreateAccount} style={styles.createBtn}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInBtn} onPress={() => router.push('/pages/SignIn')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 30,
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
  },
  createBtn: {
    padding: 18,
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 15,
    marginTop: 50,
  },
  btnText: {
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
  },
  signInBtn: {
    padding: 18,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  signInText: {
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
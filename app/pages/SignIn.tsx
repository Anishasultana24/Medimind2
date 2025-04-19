import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation, useRouter } from "expo-router";
  import Ionicons from "@expo/vector-icons/Ionicons";
  import { authService } from '../services/api';
  
  export default function SignIn() {
    const router = useRouter();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    const handleSignIn = async () => {
      if (!email.trim() || !password.trim()) {
        ToastAndroid.show("Please enter both email and password", ToastAndroid.SHORT);
        return;
      }
  
      try {
        setLoading(true);
        await authService.login({ email, password });
        ToastAndroid.show("Signed in successfully!", ToastAndroid.SHORT);
        router.replace("/Appointment");
      } catch (error: any) {
        ToastAndroid.show(error.message || "Invalid email or password", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={28} color="black" />
        </TouchableOpacity>
  
        <Text style={styles.title}>Let's Sign You In</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
        <Text style={styles.subtitle}>You Have Been Missed</Text>
  
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
  
        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter Your Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
  
        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>
  
        {/* Create Account */}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => router.push("/pages/SignUp")}
        >
          <Text style={styles.createAccountText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 25,
      backgroundColor: "rgb(181, 233, 241)", // main background
      height: '100%',
      paddingTop: 40,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 20,
    },
    subtitle: {
      fontSize: 20,
      color: "grey",
      marginTop: 5,
    },
    inputGroup: {
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
    },
    input: {
      padding: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: "grey",
      marginTop: 5,
      backgroundColor: "#f9f9f9",
    },
    signInButton: {
      padding: 18,
      backgroundColor: "black",
      borderRadius: 15,
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signInText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    createAccountButton: {
      padding: 18,
      backgroundColor: "white",
      borderRadius: 15,
      marginTop: 20,
      borderWidth: 1,
      borderColor: "black",
    },
    createAccountText: {
      color: "black",
      textAlign: "center",
      fontWeight: "bold",
    },
  });
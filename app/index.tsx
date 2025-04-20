import { Stack } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router'

import ExpertIndex from "@/components/ExpertIndex";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";


export default function Index() {
  const router=useRouter();

  return (
    <><Stack.Screen options={{ headerShown: false }} />
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.innerContainer}>

            {/* Top Navbar */}
            <View style={styles.topNav}>
              <Text style={styles.headerText}>Medi Mind</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>ADMIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Heading */}
            <Text style={styles.centerTitle}>MEDI</Text>
            <Text style={styles.centerTitle}>MIND</Text>

            {/* Description */}
            <Text style={styles.contentText}>
              Effortlessly manage your clinic's appointments, prescriptions,
              medical records, billing, and patient information with a streamlined,
              user-friendly application.
            </Text>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={()=>router.push('/pages/SignIn')}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            {/* Illustration */}
            <Image
              source={require("./../assets/images/OBJECTS.png")}
              resizeMode="contain"
              style={styles.image}
            />

            {/* Stats */}
            <View style={styles.statsContainer}>
              {/* Clients */}
              <View style={styles.statsBox}>
                <MaskedView
                  maskElement={
                    <Text style={styles.statsNumber}>1000+</Text>
                  }>
                  <LinearGradient
                    colors={['#6DDCFF', '#7F60F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={[styles.statsNumber, { opacity: 0 }]}>1000+</Text>
                  </LinearGradient>
                </MaskedView>
                <Text style={styles.statsLabel}>Clients</Text>
              </View>

              {/* Doctors */}
              <View style={styles.statsBox}>
                <MaskedView
                  maskElement={
                    <Text style={styles.statsNumber}>60+</Text>
                  }>
                  <LinearGradient
                    colors={['#6DDCFF', '#7F60F9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <Text style={[styles.statsNumber, { opacity: 0 }]}>60+</Text>
                  </LinearGradient>
                </MaskedView>
                <Text style={styles.statsLabel}>Doctors</Text>
              </View>
            </View>

          {/* //Our service section */}

            <View >
              <View>
                <Text style={{ fontSize: 40, fontFamily: 'Kameron-SemiBold', color: '#1B4964', marginTop: 40, textAlign: 'center' }}>Our Services</Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image14.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image2.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                </View>

                {/* Second row */}
                <View style={styles.cardRow}>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image3.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image4.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                </View>

                {/* Third row */}
                <View style={styles.cardRow}>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image5.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                  <View style={styles.card}>
                    <Image
                      style={styles.cardImage}
                      source={require('./../assets/images/image5.png')}
                    />
                    <Text style={styles.cardText}>DENTIST</Text>
                  </View>
                </View>
              </View>

            {/* //MEET ExpertIndex */}
              <ExpertIndex />

            {/* //FAQ section */}
              <Faq />



            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4f0fb',
  },
  innerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 64,
    alignItems: 'center',
    flexGrow: 1,
  },
  topNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,

    fontWeight: 'bold',
    color: '#1B4965',
    fontFamily: 'Kameron-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1B4965',
    paddingVertical: 8,
    paddingHorizontal:20,
    borderRadius: 12,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Kameron-SemiBold',
  },
  centerTitle: {
    color: '#164e83',
    fontSize: 50,
    textAlign: 'center',
    // lineHeight: 45,
    fontWeight: '900',
    fontFamily: 'Kameron-SemiBold',
    // marginTop:20
  },
  contentText: {
    fontSize: 12,
    color: '#1b2b40',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    fontFamily: 'Kameron-SemiBold',
  },
  loginButton: {
    backgroundColor: '#164e83',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Kameron-SemiBold',
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d7ecfb',
    marginTop: 40,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsBox: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: 'Kameron-SemiBold',
  },
  statsLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 162,
    height: 149,
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
    // marginLeft:40,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 5 },
    shadowOpacity: 2.50,
    shadowRadius: 7.84,
    elevation: 9,
    marginRight: 20,
  },
  cardImage: {
    width: 120,
    height: 90,
    // marginBottom: 2,
  },
  cardText: {
    color: '#1B4965',
    fontSize: 16,
    fontFamily: 'Kameron-SemiBold',
    textAlign: 'center',
  },
});
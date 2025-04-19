import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import Footer2 from '@/components/Footer2';
import { router } from 'expo-router';

export default function Dashboard() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const onDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 180, padding: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>HealthNexus</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={iconButtonStyle}>
              <Icon name="bell" size={21} color="#1B4965" />
            </TouchableOpacity>
            <TouchableOpacity style={iconButtonStyle}>
              <Icon name="user" size={21} color="#1B4965" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => router.push('/')}
            >
              <Text style={{ color: '#fff', fontSize: 10 }}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <Text style={styles.calendarHeading}>Select a Date</Text>
          <Calendar
            style={{
              elevation: 3, // For shadow effect on Android
              shadowColor: '#000', // For shadow effect on iOS
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            }}
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#1B4965',
              },
            }}
          />

        </View>

        {/* Pay Bill Amount Section */}
        <View style={styles.billContainer}>
          <Text style={styles.heading}>Pay Bill Amount</Text>

          <Text style={styles.label}>UPI ID</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require('./../../assets/images/Paymentmethod.png')}
              style={styles.icon}
            />
            <TextInput
              placeholder="1234 1234 1234 1234"
              style={styles.input}
            />
          </View>

          <View style={{ flexDirection: 'row', margin: 10 }}>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#4CAF50',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => { }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#4CAF50',
                }}
              />
            </TouchableOpacity>
            <Text style={{ color: '#000', fontSize: 15, paddingHorizontal: 5 }}>
              Pay by Credit Card
            </Text>
            <Icon name="lock" size={18} color="#000" style={{ marginLeft: 10 }} />
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 50 }}>
            <TouchableOpacity>
              <Image
                style={{ margin: 5, height: 32, width: 50 }}
                source={require('./../../assets/images/Paymentmethod.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ margin: 5, height: 32, width: 50 }}
                source={require('./../../assets/images/Possiblepayments.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ margin: 5, height: 32, width: 50 }}
                source={require('./../../assets/images/Visa.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ margin: 5, height: 32, width: 50 }}
                source={require('./../../assets/images/Discover.png')}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payText}>Pay Now</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: '#000',
              marginLeft: 135,
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 10,
            }}
          >
            Bill History
          </Text>

          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {[1, 2, 3].map((_, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#D9D9D9',
                  borderRadius: 5,
                  marginBottom: 20,
                  padding: 15,
                  height: 63,
                  elevation: 3,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#000', fontSize: 16 }}>
                    Services Name
                  </Text>
                  <Text style={{ color: '#000', fontSize: 10 }}>
                    Transition Id
                  </Text>
                  <Text style={{ color: '#000', fontSize: 10 }}>Date</Text>
                </View>
                <Text style={{ color: '#000', fontSize: 16 }}>Amount</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <Footer2 />
    </View>
  );
}

const iconButtonStyle = {
  backgroundColor: '#CAF0F8',
  borderRadius: 50,
  padding: 10,
  marginRight: 10,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#1B4965',
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 10,
  },
  calendarHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1B4965',
  },
  billContainer: {
    marginTop: 30,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: '500',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  payButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  payText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Footer2 from '@/components/Footer2';
import { router, useRouter } from 'expo-router';




export default function Prescription() {



  return (
    <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={{ paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: 'Kameron-SemiBold',

                color: '#1B4965',
              }}
            >
              Your Digital Prescriptions
            </Text>

            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Kameron-Regular',
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
                paddingHorizontal: 20,
              }}
            >
              Access and download your prescriptions anytime, anywhere with our
              secure and convenient digital storage system.
            </Text>
          </View>
        </View>

        {/* Scrollable Card Section */}
        <View style={{ flex: 1, padding: 10 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Kameron-SemiBold',
              color: '#1B4965',
              marginBottom: 15,
              marginLeft: 5,
            }}
          >
            Your Prescriptions
          </Text>

          <ScrollView
            style={{
              maxHeight: 450,
              backgroundColor: 'white',
              padding: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            {[1, 2, 3, 4, 5].map((_, index) => (
              <View
                key={index}
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
                  source={require('./../../assets/images/image7.png')}
                  style={{
                    width: 51,
                    height: 45,
                    borderRadius: 15,
                    marginRight: 15,
                  }}
                />


                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      
                      color: '#1B4965',
                      fontFamily: 'Kameron-SemiBold',
                    }}
                  >
                    Doctor Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#1B4965',
                      fontFamily: 'Kameron-SemiBold',
                    }}
                  >
                    Disease
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#1B4965',
                      fontFamily: 'Kameron-SemiBold',
                    }}
                  >
                    Date
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#1B4965',
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 8 }}>Download</Text>
                </TouchableOpacity>
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
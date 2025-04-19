import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Footer2 from '@/components/Footer2';
import { router, useRouter } from 'expo-router';



export default function MedicalTest() {
  

  
  return (
    <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header */}
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000', marginLeft: 10 }}>
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
                  paddingVertical: 13,
                  paddingHorizontal: 20,
                }}
                onPress={() => router.push('/')}
              >
                <Text style={{ color: '#fff', fontSize: 10,fontFamily: 'Kameron-SemiBold', }}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Heading */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#1B4965' }}>
              Your Health, Our Test
            </Text>
            <Text
              style={{
                fontSize: 10,
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

        {/* === Recommended Tests === */}
        <View style={{ backgroundColor: '#FFF', padding: 20, marginBottom: 10, margin: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 16, fontFamily: 'Kameron-SemiBold', color: '#1B4965', marginBottom: 5 }}>
            Recommended Tests
          </Text>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E9F6FF',
                borderRadius: 10,
                marginBottom: 15,
                padding: 15,
                elevation: 3,
              }}
            >
              <View
                style={{
                  height: 56,
                  width: 71,
                  borderRadius: 15,
                  backgroundColor: '#1B4965',
                  marginRight: 20,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#1B4965', fontFamily: 'Kameron-SemiBold', }}>Test Name</Text>
                <Text style={{ fontSize: 10, color: '#1B4965' }}>Price</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1B4965',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 10 }}>Book Test</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* === Popular Tests === */}
        <View style={{ backgroundColor: '#FFF', padding: 20, margin: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1B4965', marginBottom: 5 }}>
            Popular Tests
          </Text>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#E9F6FF',
                borderRadius: 10,
                marginBottom: 15,
                padding: 15,
                elevation: 3,
              }}
            >
              <View
                style={{
                  height: 56,
                  width: 71,
                  borderRadius: 15,
                  backgroundColor: '#1B4965',
                  marginRight: 20,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: '#1B4965', fontWeight: 'bold' }}>Test Name</Text>
                <Text style={{ fontSize: 10, color: '#1B4965' }}>Price</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1B4965',
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 10 }}>Book Test</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer2 />
    </View>
  );
}

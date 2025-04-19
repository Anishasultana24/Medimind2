import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import Index from '.';
import Footer2 from '@/components/Footer2';

export default function Appointment() {
    const router = useRouter();
    const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');

   
    
    const specialties = ['ALL', 'Cardiologist', 'Neurologist', 'Orthopedics'];

    return (
        <View style={{ flex: 1, backgroundColor: '#E9F6FF' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10 }}>
                    {/* Top Bar */}
                    <View style={{ paddingVertical: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'Kameron-SemiBold', color: '#000000', marginLeft: 10 }}>
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
                                        paddingVertical: 15,
                                        paddingHorizontal: 20,
                                    }}
                                    onPress={() => router.push('/')}

                                >
                                    <Text style={{ color: '#fff', fontSize: 10 ,fontFamily: 'Kameron-SemiBold',}}>LOGOUT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                                Book Your Appointment
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: '#6c757d',
                                    textAlign: 'center',
                                    marginTop: 10,
                                    paddingHorizontal: 20,
                                    fontFamily: 'Kameron-SemiBold',
                                }}
                            >
                                Schedule your visit with ease at a time that works best for you. Quick, convenient and tailored to your needs.
                            </Text>
                        </View>
                    </View>

                    {/* Speciality Buttons */}
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {specialties.map((specialty, idx) => {
                                    const isSelected = selectedSpecialty === specialty;
                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            onPress={() => setSelectedSpecialty(specialty)}
                                            style={{
                                                backgroundColor: isSelected ? '#1B4965' : '#E9F6FF',
                                                borderRadius: 20,
                                                paddingVertical: 10,
                                                paddingHorizontal: 30,
                                                alignItems: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Text style={{ color: isSelected ? '#fff' : '#1B4965',fontFamily: 'Kameron-Regular', }}>{specialty}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </ScrollView>

                        {/* Doctors List */}
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            {[1, 2, 3, 4].map((_, index) => (
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
                                        source={require('./../assets/images/image6.png')}
                                        style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
                                    />

                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 15, fontFamily: 'Kameron-SemiBold', color: '#000' }}>
                                            Doctor Name
                                        </Text>
                                        <Text style={{ fontSize: 10, color: '#6c757d',fontFamily: 'Kameron-SemiBold', }}>Specialist</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#1B4965',
                                            borderRadius: 20,
                                            paddingVertical: 10,
                                            paddingHorizontal: 13,
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 8,fontFamily: 'Kameron-SemiBold', }}>Book Appointment</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Nav */}
            <Footer2/>
        </View>
    );
}

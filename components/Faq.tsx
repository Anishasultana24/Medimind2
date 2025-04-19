import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Footer from './Footer';

export default function Faq() {
  const [isFAQ1Collapsed, setIsFAQ1Collapsed] = useState(true);
  const [isFAQ2Collapsed, setIsFAQ2Collapsed] = useState(true);
  const [isFAQ3Collapsed, setIsFAQ3Collapsed] = useState(true);
  const [isFAQ4Collapsed, setIsFAQ4Collapsed] = useState(true);
  const [isFAQ5Collapsed, setIsFAQ5Collapsed] = useState(true);

  return (
    <View>
    <View style={styles.container}>
      <Text style={styles.title}>FAQ</Text>

      <Accordion
        question="What services do you offer?"
        answer="We offer a wide range of healthcare services including general practice, dentistry, and more."
        collapsed={isFAQ1Collapsed}
        toggle={() => setIsFAQ1Collapsed(!isFAQ1Collapsed)}
      />

      <Accordion
        question="How can I book an appointment?"
        answer="You can book an appointment using our mobile app or through our website by logging in."
        collapsed={isFAQ2Collapsed}
        toggle={() => setIsFAQ2Collapsed(!isFAQ2Collapsed)}
      />

      <Accordion
        question="Do you provide emergency care?"
        answer="Yes, we provide 24/7 emergency care with expert doctors on call."
        collapsed={isFAQ3Collapsed}
        toggle={() => setIsFAQ3Collapsed(!isFAQ3Collapsed)}
      />

      <Accordion
        question="Are your doctors certified?"
        answer="All our doctors are certified professionals with years of experience."
        collapsed={isFAQ4Collapsed}
        toggle={() => setIsFAQ4Collapsed(!isFAQ4Collapsed)}
      />

      <Accordion
        question="Do you support online consultations?"
        answer="Yes, we provide online consultations via chat and video calls."
        collapsed={isFAQ5Collapsed}
        toggle={() => setIsFAQ5Collapsed(!isFAQ5Collapsed)}
      />
       
    </View>
    {/* <Footer/> */}
    </View>
  );
}

const Accordion = ({ question, answer, collapsed, toggle }) => (
  <TouchableOpacity onPress={toggle} style={styles.accordionHeader}>
    <View style={styles.accordionRow}>
      <Text style={styles.accordionTitle}>{question}</Text>
      <Text style={styles.accordionSign}>{collapsed ? '+' : '-'}</Text>
    </View>
    <Collapsible collapsed={collapsed}>
      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </Collapsible>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 40,
    color: '#1B4965',
    textAlign: 'center',
    // fontWeight: 'bold',
    marginBottom: 20,
    fontFamily:'Kameron-SemiBold'
  },
  accordionHeader: {
    backgroundColor: '#1B4965',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  accordionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    fontFamily:'Kameron-Medium'
  },
  accordionSign: {
    color: 'white',
    fontSize: 24,
  },
  answerContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  answerText: {
    color: 'white',
    fontSize: 14,
    fontFamily:'Kameron-Medium'
  },
});

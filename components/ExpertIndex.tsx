import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ExpertIndex() {
    return (
        <View>
            <Text style={styles.meetSection}>Meet Our{"\n"}  Expert{"\n"}  Doctors</Text>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 15, fontFamily: 'Kameron-Medium', color: '#000', textAlign: 'center' }}>   A Dedicated team of expericed proffesionals,{"\n"}committed to providing the highest quality care{"\n"}      and personalized attentionfor every patient</Text>
            </View>
            <View style={styles.columnContainer}>
                {/* First Column  */}
                <View style={{ marginTop: 90 }}>
                    <View style={styles.column}>
                        <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 107, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                            <Image style={{ height: 115, width: 90, marginTop: 20 }} source={require('./../assets/images/image7.png')} />

                        </View>
                        <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 107, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                            <Image style={{ height: 115, width: 100, marginTop: 20 }} source={require('./../assets/images/image6.png')} />

                        </View>
                    </View>
                </View>
                {/* Second Column */}
                <View style={styles.column}>
                    <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 122, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                        <Image style={{ height: 115, width: 100, marginTop: 20 }} source={require('./../assets/images/image6.png')} />

                    </View>
                    <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 120, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                        <Image style={{ height: 115, width: 100, marginTop: 20 }} source={require('./../assets/images/image9.png')} />

                    </View>
                    <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 107, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                        <Image style={{ height: 124, width: 95, marginTop: 10 }} source={require('./../assets/images/image8.png')} />

                    </View>
                </View>

                {/* Third Column  */}
                <View style={styles.column}>
                    <View style={{ marginTop: 90 }}>
                        <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 107, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                            <Image style={{ height: 115, width: 100, marginTop: 20 }} source={require('./../assets/images/image9.png')} />

                        </View>
                        <View style={{ backgroundColor: '#1B4965', borderRadius: 10, width: 122, height: 145, alignItems: 'center', padding: 10, marginBottom: 15, }}>
                            <Image style={{ height: 125, width: 108, marginTop: 10 }} source={require('./../assets/images/image10.png')} />

                        </View>
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    meetSection: {
        fontSize: 50,
        fontFamily: 'Kameron-Medium',
        color: '#1B4965',
        paddingLeft: 30,
        textAlign: 'center'
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 90,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },

})
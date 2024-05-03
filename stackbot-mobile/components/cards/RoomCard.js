import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RoomCard = ({ name, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View>
                <Image source={icon} style={styles.image}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.houseName}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#d6d6d6'
    },
    image: {
        width: 100, // Adjust width and height as needed
        height: 100,
    },
    textContainer: {
        flex: 1,
        marginTop: 10,
    },
    houseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
});

export default RoomCard;

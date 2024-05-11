import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ItemCard = ({ name, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.iconContainer}>
                <Image source={icon} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.houseName}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#d6d6d6'
    },
    image: {
        width: 30, // Adjust width and height as needed
        height: 30,
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    houseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    houseDescription: {
        fontSize: 16,
    },
});

export default ItemCard;

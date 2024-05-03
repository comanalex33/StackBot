import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HousesHeader = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => {
                    // Handle microphone icon press
                }}
            >
                <MaterialCommunityIcons name="microphone" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => {
                    // Handle logout icon press
                }}
            >
                <MaterialCommunityIcons name="logout" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 30
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    headerIcon: {
        padding: 15,
    },
});

export default HousesHeader;

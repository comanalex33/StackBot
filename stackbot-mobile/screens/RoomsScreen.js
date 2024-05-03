import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import RoomCard from '../components/cards/RoomCard';

import '../assets/kitchen.png'
import '../assets/double-bed.png'
import '../assets/living-room.png'
import '../assets/door.png'

const data = [
    { id: '1', name: 'Living', description: 'living for Card 1' },
    { id: '2', name: 'Bedroom Alex', description: 'Bedroom for Card 2' },
    { id: '3', name: 'Kitchen', description: 'Kitchen for Card 3' },
    { id: '4', name: 'Storage Closet', description: 'Description for Card 4' },
    // Add more data as needed
];

const RoomsScreen = ({ route }) => {

    const { house } = route.params;

    const getIcon = (description) => {

        // let iconFile = roomIcons.other

        if(String(description).toLowerCase().includes('kitchen')) {
            return require('../assets/kitchen.png')
        }

        if(String(description).toLowerCase().includes('bed')) {
            return require('../assets/double-bed.png')
        }

        if(String(description).toLowerCase().includes('living')) {
            return require('../assets/living-room.png')
        }

        return require('../assets/door.png')
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <RoomCard name={item.name} icon={getIcon(item.description + " " + item.name)}/>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContainer}
            numColumns={2} // Display two cards per row
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
})

export default RoomsScreen;

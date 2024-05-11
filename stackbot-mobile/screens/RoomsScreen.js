import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import StorageCard from '../components/cards/StorageCard';

import '../assets/kitchen.png'
import '../assets/double-bed.png'
import '../assets/living-room.png'
import '../assets/door.png'
import StorageModel from '../models/StorageModel';

const data = [
    { id: '1', name: "Living", type: 'room', description: 'Living Room for Room 1', storageId: null },
    { id: '2', name: "Bedroom Alex", type: 'room', description: 'Bedroom for Room 2', storageId: null },
    { id: '3', name: "Kitchen", type: 'room', description: 'Kitchen for Room 3', storageId: null },
    { id: '4', name: "Storage Closet", type: 'room', description: 'Description for Room 4', storageId: null },
    // Add more data as needed
];

const RoomsScreen = ({ route, navigation }) => {

    const { house } = route.params;
    const houseModel = new StorageModel(house)

    const handleRoomClick = (item) => {
        const room = new StorageModel(item)
        navigation.navigate("RoomContent", { house: houseModel, room: room })
    }

    const getIcon = (description) => {

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
            <StorageCard storage={item} icon={getIcon(item.description + " " + item.name)} onPress={() => handleRoomClick(item)}/>
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

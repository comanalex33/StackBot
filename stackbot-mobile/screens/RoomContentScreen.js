import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import RoomCard from '../components/cards/RoomCard';

import '../assets/fridge.png'
import '../assets/boxes.png'

const data = [
    { id: '1', name: 'Fridge', type: 'fridge', description: 'living for Card 1' },
    { id: '2', name: 'Deposit 1', type: 'deposit', description: 'Bedroom for Card 2' },
    { id: '3', name: 'Deposit 2', type: 'deposit', description: 'Kitchen for Card 3' },
    { id: '4', name: 'Deposit 3', type: 'deposit', description: 'Description for Card 4' },
    // Add more data as needed
];

const RoomContentScreen = ({ route, navigation }) => {

    const { house, room } = route.params;

    const handleSpaceClick = (item) => {
        const spaceData = {
            name: item.name,
            description: item.description,
            type: item.type
        }

        navigation.navigate("Items", { house: house, room: room, space: spaceData })
    }

    const getIcon = (type) => {

        if(type === 'fridge') {
            return require('../assets/fridge.png')
        }

        return require('../assets/boxes.png')
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <RoomCard name={item.name} icon={getIcon(item.type)} onPress={() => handleSpaceClick(item)}/>
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

export default RoomContentScreen;

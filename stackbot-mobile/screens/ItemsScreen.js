import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import RoomCard from '../components/cards/RoomCard';

import '../assets/fridge-item.png'
import '../assets/deposit-item.png'
import ItemCard from '../components/cards/ItemCard';

const data = [
    { id: '1', name: 'Item 1', count: 1, warrantyDate: '12/13/2023', expirationDate: '12/13/2023', description: "Description for Item 1" },
    { id: '2', name: 'Item 2', count: 4, warrantyDate: '12/13/2023', expirationDate: '12/13/2023', description: "Description for Item 2" },
    { id: '3', name: 'Item 3', count: 1, warrantyDate: '12/13/2023', expirationDate: '12/13/2023', description: "Description for Item 3" },
    { id: '4', name: 'Item 4', count: 3, warrantyDate: '12/13/2023', expirationDate: '12/13/2023', description: "Description for Item 4" },
    // Add more data as needed
];

const ItemsScreen = ({ route }) => {

    const { house, room, space } = route.params;

    const getIcon = () => {

        if(space.type === 'fridge') {
            return require('../assets/fridge-item.png')
        }

        return require('../assets/deposit-item.png')
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <ItemCard name={item.name} icon={getIcon()}/>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContainer}
            numColumns={1} // Display two cards per row
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

export default ItemsScreen;

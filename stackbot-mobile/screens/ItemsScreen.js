import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ItemCard from '../components/cards/ItemCard';

import '../assets/fridge-item.png'
import '../assets/deposit-item.png'
import StorageModel from '../models/StorageModel';
import ItemModel from '../models/ItemModel';

const data = [
    { id: '1', name: 'Item 1', count: 1, warrantyDate: '2024-06-14T18:03:00.000Z', expirationDate: '2024-06-14T18:03:00.000Z', description: "Description for Item 1", storageId: null },
    { id: '2', name: 'Item 2', count: 4, warrantyDate: '2024-06-14T18:03:00.000Z', expirationDate: '2024-06-14T18:03:00.000Z', description: "Description for Item 2", storageId: null },
    { id: '3', name: 'Item 3', count: 1, warrantyDate: '2024-06-14T18:03:00.000Z', expirationDate: '2024-06-14T18:03:00.000Z', description: "Description for Item 3", storageId: null },
    { id: '4', name: 'Item 4', count: 3, warrantyDate: '2024-06-14T18:03:00.000Z', expirationDate: '2024-06-14T18:03:00.000Z', description: "Description for Item 4", storageId: null },
    // Add more data as needed
];

const ItemsScreen = ({ route, navigation }) => {

    const { house, room, space } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)
    const spaceModel = new StorageModel(space)

    const handleItemClick = (item) => {
        const itemModel = new ItemModel(item)
        navigation.navigate("ItemDetails", { house: houseModel, room: roomModel, space: spaceModel, item: itemModel })
    }

    const getIcon = () => {

        if(space.type === 'fridge') {
            return require('../assets/fridge-item.png')
        }

        return require('../assets/deposit-item.png')
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <ItemCard name={item.name} icon={getIcon()} onPress={() => handleItemClick(item)}/>
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

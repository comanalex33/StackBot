import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ItemCard from '../components/cards/ItemCard';

import '../assets/fridge-item.png'
import '../assets/deposit-item.png'
import StorageModel from '../models/StorageModel';
import ItemModel from '../models/ItemModel';
import { getItemsByStorageName } from '../services/BackendApiService/storageService';
import UpdateTypes from '../services/UpdateService/UpdateTypes';
import { useUpdate } from '../services/UpdateService/UpdateContext';

// Item entry example
//    { id: '1', name: 'Item 1', count: 1, warrantyDate: '2024-06-14T18:03:00.000Z', expirationDate: '2024-06-14T18:03:00.000Z', description: "Description for Item 1" }

const ItemsScreen = ({ route, navigation }) => {

    const { house, room, space } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)
    const spaceModel = new StorageModel(space)

    const { updates } = useUpdate();
    const [items, setItems] = useState([])

    // Get items when screen opens
    useEffect(() => {
        getItemsByStorageName(spaceModel.getName())
            .then(response => {
                setItems(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // Update items list
    const updateItemsList = () => {
        getItemsByStorageName(spaceModel.getName())
            .then(response => {
                setItems(response.data)
            })
            .catch(error => console.log(error))
    }

    // Update context
    useEffect(() => {
        const latestUpdate = updates[updates.length - 1];
        if(latestUpdate && latestUpdate === UpdateTypes.TRIGGER_ITEMS_UPDATE) {
            updateItemsList()
        }
    }, [updates])

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
            data={items}
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

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import StorageCard from '../components/cards/StorageCard';

import '../assets/fridge.png'
import '../assets/boxes.png'
import StorageModel from '../models/StorageModel';
import { getSubstorages } from '../services/ApiService/storageService';

// Substorage entry example
//   { id: '1', name: "Living", type: 2 or 3, description: 'Living Room for Room 1', parentStorageId: null }

const RoomContentScreen = ({ route, navigation }) => {

    const { house, room } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)

    const [substorages, setSubstorages] = useState([])

    useEffect(() => {
        getSubstorages(roomModel.getId())
            .then(response => {
                setSubstorages(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const handleSpaceClick = (item) => {
        const substorageModel = new StorageModel(item)
        navigation.navigate("Items", { house: houseModel, room: roomModel, space: substorageModel })
    }

    const getIcon = (item) => {
        const substorageModel = new StorageModel(item)

        if(substorageModel.getTypeText() === 'fridge') {
            return require('../assets/fridge.png')
        }

        return require('../assets/boxes.png')
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <StorageCard storage={item}  icon={getIcon(item)} onPress={() => handleSpaceClick(item)}/>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={substorages}
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

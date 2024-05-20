import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import StorageCard from '../components/cards/StorageCard';

import '../assets/fridge.png'
import '../assets/boxes.png'
import StorageModel from '../models/StorageModel';
import { getSubstorages } from '../services/ApiService/storageService';
import { useUpdate } from '../services/UpdateService/UpdateContext';
import UpdateTypes from '../services/UpdateService/UpdateTypes';

// Substorage entry example
//   { id: '1', name: "Living", type: 2 or 3, description: 'Living Room for Room 1', parentStorageId: null }

const RoomContentScreen = ({ route, navigation }) => {

    const { house, room } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)

    const { updates } = useUpdate();
    const [substorages, setSubstorages] = useState([])

    // Get substorages when screen opens
    useEffect(() => {
        getSubstorages(roomModel.getId())
            .then(response => {
                setSubstorages(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // Update substorages list
    const updateSubstoragesList = () => {
        getSubstorages(roomModel.getId())
            .then(response => {
                setSubstorages(response.data)
            })
            .catch(error => console.log(error))
    }

    // Update context
    useEffect(() => {
        const latestUpdate = updates[updates.length - 1];
        if(latestUpdate && latestUpdate === UpdateTypes.TRIGGER_SUBSTORAGES_UPDATE) {
            updateSubstoragesList()
        }
    }, [updates])

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

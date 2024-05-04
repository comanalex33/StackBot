import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import '../assets/fridge-item.png'
import '../assets/deposit-item.png'
import ItemDetailCard from '../components/cards/ItemDetailCard';
import ItemModel from '../models/ItemModel';
import StorageModel from '../models/StorageModel';

const ItemDetailsScreen = ({ route }) => {

    const { house, room, space, item } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)
    const spaceModel = new StorageModel(space)
    const itemModel = new ItemModel(item)

    const getIcon = () => {

        if (space.type === 'fridge') {
            return require('../assets/fridge-item.png')
        }

        return require('../assets/deposit-item.png')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerImageContainer}>
                    <Image source={getIcon()} style={styles.image} />
                </View>
                <View style={styles.headerDescriptionContainer}>
                    <View style={styles.headerDescription}>
                        <Text style={styles.headerTitleText}>{itemModel.getName()}</Text>
                        <Text style={styles.headerDescriptionText}>{itemModel.getDescription()}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <ItemDetailCard title={"Count"} value={itemModel.getCount()} />
                {(space.type === 'fridge') ?
                    <ItemDetailCard title={"Expiration Date"} value={itemModel.getExpirationDate()} />
                    :
                    <ItemDetailCard title={"Warranty Date"} value={itemModel.getWarrantyDate()} />
                }
                <ItemDetailCard title={"House"} value={houseModel.getName()} />
                <ItemDetailCard title={"Location"} value={roomModel.getName() + " > " + spaceModel.getName()} />
            </View>
            <View style={styles.controls}>
                <TouchableOpacity>
                    <View style={styles.button} backgroundColor="blue">
                        <Text style={styles.buttonText}>Modify</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button} backgroundColor="red">
                        <Text style={styles.buttonText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Header styles
    header: {
        flex: 0.35,
        flexDirection: 'row',
        paddingRight: 10
    },
    headerDescriptionContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    headerDescription: {
        flex: 1,
        height: '80%',
        width: '80%',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    headerDescriptionText: {
        marginTop: 10
    },
    headerImageContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100, // Adjust width and height as needed
        height: 100,
    },

    // Content
    content: {
        flex: 0.45,
        flexDirection: 'column'
    },

    // Controls
    controls: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        borderRadius: 8,
        flex: 0.4,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 14,
        padding: 5,
        textAlign: 'center',
    }
})

export default ItemDetailsScreen;

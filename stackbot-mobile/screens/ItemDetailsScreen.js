import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import '../assets/fridge-item.png'
import '../assets/deposit-item.png'
import ItemDetailCard from '../components/cards/ItemDetailCard';
import ItemModel from '../models/ItemModel';
import StorageModel from '../models/StorageModel';
import ModifyItemDialog from '../components/dialogs/ModifyItemDialog';
import { formatDate } from '../Helper';
import DeleteItemDialog from '../components/dialogs/DeleteItemDialog';
import { deleteItem } from '../services/BackendApiService/itemService';
import { useUpdate } from '../services/UpdateService/UpdateContext';
import UpdateTypes from '../services/UpdateService/UpdateTypes';

const ItemDetailsScreen = ({ route, navigation }) => {

    const { house, room, space, item } = route.params;
    const houseModel = new StorageModel(house)
    const roomModel = new StorageModel(room)
    const spaceModel = new StorageModel(space)
    const [itemModel, setItemModel] = useState(new ItemModel(item))

    const { addUpdate } = useUpdate();

    const [modifyItemDialogVisible, setModifyItemDialogVisible] = useState(false)
    const [deleteItemDialogVisible, setDeleteItemDialogVisible] = useState(false)

    const toggleModifyItemDialog = () => {
        setModifyItemDialogVisible(!modifyItemDialogVisible);
    }

    const toggleDeleteItemDialog = () => {
        setDeleteItemDialogVisible(!deleteItemDialogVisible)
    }

    const updateItem = (newItem) => {
        const newItemModel = new ItemModel(newItem)
        setItemModel(newItemModel)
    }

    const getIcon = () => {

        if (spaceModel.getTypeText() === 'fridge') {
            return require('../assets/fridge-item.png')
        }

        return require('../assets/deposit-item.png')
    }

    const handleItemDelete = () => {
        deleteItem(itemModel.getName())
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    alert(`${response.status}: Something went wrong`)
                    return
                }

                console.log(`Item ${itemModel.getName()} is deleted`)
                addUpdate(UpdateTypes.TRIGGER_ITEMS_UPDATE)
                navigation.goBack()
            })
            .catch(error => {
                const response = error.response

                if (!response) {
                    alert("Something went wrong!")
                }

                if ('message' in response.data) {
                    alert(`${response.status}: ${response.data.message}`)
                } else {
                    alert(`${response.status}: Something went wrong!`)
                }
            })
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
                {(spaceModel.getTypeText() === 'fridge') ?
                    <ItemDetailCard title={"Expiration Date"} value={formatDate(itemModel.getExpirationDate())} />
                    :
                    <ItemDetailCard title={"Warranty Date"} value={formatDate(itemModel.getWarrantyDate())} />
                }
                <ItemDetailCard title={"House"} value={houseModel.getName()} />
                <ItemDetailCard title={"Location"} value={roomModel.getName() + " > " + spaceModel.getName()} />
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={toggleModifyItemDialog}>
                    <View style={styles.button} backgroundColor="blue">
                        <Text style={styles.buttonText}>Modify</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDeleteItemDialog}>
                    <View style={styles.button} backgroundColor="red">
                        <Text style={styles.buttonText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Modify Item Dialog */}
            <ModifyItemDialog item={itemModel} visible={modifyItemDialogVisible} onClose={toggleModifyItemDialog} spaceType={spaceModel.getTypeText()} updateCurrentItem={updateItem} />

            {/* Delete Item Dialog */}
            <DeleteItemDialog item={itemModel} visible={deleteItemDialogVisible} onClose={toggleDeleteItemDialog} onSubmit={handleItemDelete} />
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

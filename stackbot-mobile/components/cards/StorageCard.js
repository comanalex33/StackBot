import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DeleteStorageDialog from '../dialogs/DeleteStorageDialog';
import StorageModel from '../../models/StorageModel';
import { StorageTypes } from '../../models/StorageTypes';
import ModifyStorageDialog from '../dialogs/ModifyStorageDialog';
import { useUpdate } from '../../services/UpdateService/UpdateContext';
import UpdateTypes from '../../services/UpdateService/UpdateTypes';
import { deleteStorage } from '../../services/BackendApiService/storageService';

const StorageCard = ({ storage, icon, onPress }) => {

    const storageModel = new StorageModel(storage)

    const { addUpdate } = useUpdate();
    const [controlsOpen, setControlsOpen] = useState(false)

    const [modifyStorageDialogVisible, setModifyStorageDialogVisible] = useState(false)
    const [deleteStorageDialogVisible, setDeleteStorageDialogVisible] = useState(false)

    const toggleControls = () => {
        setControlsOpen(!controlsOpen)
    }

    const toggleModifyStorageDialogVisible = () => {
        if (modifyStorageDialogVisible) {
            toggleControls()
        }

        setModifyStorageDialogVisible(!modifyStorageDialogVisible);
    }

    const toggleDeleteStorageDialogVisible = () => {
        if (deleteStorageDialogVisible) {
            toggleControls()
        }

        setDeleteStorageDialogVisible(!deleteStorageDialogVisible)
    }

    const handleStorageDelete = () => {
        if (storageModel.getTypeText() === StorageTypes.Room) {
            console.log(`Room ${storageModel.getName()} is deleted`)
        } else if (storageModel.getTypeText() === StorageTypes.Fridge) {
            console.log(`Fridge ${storageModel.getName()} is deleted`)
        } else if (storageModel.getTypeText() === StorageTypes.Deposit) {
            console.log(`Deposit ${storageModel.getName()} is deleted`)
        }

        deleteStorage(storageModel.getName())
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    alert(`${response.status}: Something went wrong`)
                    return
                }

                console.log(`Storage ${storageModel.getName()} is deleted`)
                updateListTrigger()
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

    const updateListTrigger = () => {
        if (storageModel.getTypeText() === StorageTypes.Room) {
            addUpdate(UpdateTypes.TRIGGER_ROOMS_UPDATE)
        } else {
            addUpdate(UpdateTypes.TRIGGER_SUBSTORAGES_UPDATE)
        }
    }

    return (
        <View>
            <TouchableOpacity onLongPress={toggleControls} onPress={onPress} style={styles.card}>
                <View style={controlsOpen ? styles.blurredContent : styles.content}>
                    <View>
                        <Image source={icon} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.houseName}>{storageModel.getName()}</Text>
                    </View>
                </View>
                {controlsOpen &&
                    <View style={styles.controls}>
                        <View>
                            <TouchableOpacity onPress={toggleModifyStorageDialogVisible}>
                                <View style={styles.button} backgroundColor="blue">
                                    <Text style={styles.buttonText}>Modify</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleDeleteStorageDialogVisible}>
                                <View style={styles.button} backgroundColor="red">
                                    <Text style={styles.buttonText}>Delete</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={toggleControls} style={styles.closeButtonContainer}>
                            <View style={styles.closeButton} backgroundColor="white">
                                <AntDesign name="close" size={18} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </TouchableOpacity>

            {/* Modify Storage Dialog */}
            <ModifyStorageDialog storage={storageModel} visible={modifyStorageDialogVisible} onClose={toggleModifyStorageDialogVisible} updateList={updateListTrigger} />

            {/* Delete Storage Dialog */}
            <DeleteStorageDialog storage={storageModel} visible={deleteStorageDialogVisible} onClose={toggleDeleteStorageDialogVisible} onSubmit={handleStorageDelete} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#d6d6d6'
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    blurredContent: {
        opacity: 0.2,
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 100, // Adjust width and height as needed
        height: 100,
    },
    textContainer: {
        flex: 1,
    },
    houseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },

    // Controls
    controls: {
        margin: 15,
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 15,
        textAlign: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    closeButton: {
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default StorageCard;

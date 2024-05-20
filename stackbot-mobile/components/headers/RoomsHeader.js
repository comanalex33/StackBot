import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddRoomDialog from '../dialogs/AddRoomDialog';
import StorageModel from '../../models/StorageModel';
import MembersDialog from '../dialogs/MembersDialog';

const RoomsHeader = ({ route }) => {

    const { house } = route.params;
    const houseModel = new StorageModel(house)

    const [addRoomDialogVisible, setAddRoomDialogVisible] = useState(false);
    const [membersDialogVisible, setMembersDialogVisible] = useState(false)

    const toggleAddRoomDialog = () => {
        setAddRoomDialogVisible(!addRoomDialogVisible);
    }

    const toggleMembersDialog = () => {
        setMembersDialogVisible(!membersDialogVisible)
    }

    return (
        <View style={styles.header}>
            <View style={styles.headerLeftContainer}>
                <TouchableOpacity
                    style={styles.headerIcon}
                    onPress={() => {
                        // Handle microphone icon press
                    }}
                >
                    <MaterialCommunityIcons name="microphone" size={34} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.headerRightContainer}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{houseModel.getName()}</Text>
                </View>
                <View style={styles.headerControlsContainer}>
                    <TouchableOpacity onPress={toggleAddRoomDialog}>
                        <View style={styles.button} backgroundColor="blue" paddingHorizontal={5}>
                            <Text style={styles.buttonText}>+ Add Room</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleMembersDialog}>
                        <View style={styles.button} backgroundColor="gray">
                            <MaterialCommunityIcons name="account-group" size={25} color="white" paddingHorizontal={30} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Add Room Dialog */}
            <AddRoomDialog visible={addRoomDialogVisible} onClose={toggleAddRoomDialog} house={houseModel}/>

            {/* See Members Dialog */}
            <MembersDialog visible={membersDialogVisible} onClose={toggleMembersDialog}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 30,
        marginBottom: 5
    },
    headerLeftContainer: {
        justifyContent: 'center',
        height: '100%',
        width: '30%',
    },
    headerRightContainer: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '70%',
    },
    headerTitleContainer: {
        flex: 0.5,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    headerControlsContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
    },
    headerIcon: {
        padding: 15,
    },
    button: {
        borderRadius: 8,
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 14,
        padding: 5,
        textAlign: 'center',
    }
});

export default RoomsHeader;

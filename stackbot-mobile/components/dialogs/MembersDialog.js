import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import CustomDialog from './CustomDialog';
import UserCard from '../cards/UserCard';
import UserModel from '../../models/UserModel';
import StorageModel from '../../models/StorageModel';
import { addMember, getMembers } from '../../services/BackendApiService/storageService';
import BaseModel from '../../models/BaseModel';

// const members = [
//     { id: 1, email: 'user1@example.com', firstName: "First 1", lastName: "Last", password: 'pass' },
//     { id: 2, email: 'user2@example.com', firstName: "First 2", lastName: "Last", password: 'pass' },
//     { id: 3, email: 'user3@example.com', firstName: "First 3", lastName: "Last", password: 'pass' }
// ]

const MembersDialog = ({ visible, onClose, house }) => {

    const houseModel = new StorageModel(house)

    const [members, setMembers] = useState([])

    const [addNewMemberActive, setAddNewMemberActive] = useState(false)
    const [newMemberEmail, setNewMemberEmail] = useState('')

    useEffect(() => {
        updateMembersList()
    }, [])

    const updateMembersList = () => {
        getMembers(houseModel.getId())
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    alert(`${response.status}: Something went wrong!`)
                    return
                }

                setMembers(response.data)
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

    const handleAddMember = () => {
        console.log(newMemberEmail)
        addMember(houseModel.getId(), newMemberEmail)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    alert(`${response.status}: Something went wrong!`)
                    return
                }

                updateMembersList()
                toggleActivateAddNewMember()
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

    const toggleActivateAddNewMember = () => {
        setAddNewMemberActive(!addNewMemberActive)
    }

    const handleCloseDialog = () => {
        setNewMemberEmail('')
        setAddNewMemberActive(false)
        onClose()
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <UserCard name={item.getName()} email={item.getEmail()} />
        </View>
    );

    return (
        <CustomDialog visible={visible} onClose={handleCloseDialog}>
            <Text style={styles.title}>Members</Text>
            <FlatList
                style={styles.container}
                data={members.map(member => new UserModel(member))}
                renderItem={renderCard}
                keyExtractor={item => item.getId()}
                contentContainerStyle={styles.flatListContainer}
                numColumns={1}
            />
            {addNewMemberActive ?
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="New Member Email"
                        onChangeText={newEmail => setNewMemberEmail(newEmail)}
                        value={newMemberEmail}
                    />
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={handleAddMember}>
                            <View style={styles.button} backgroundColor="blue">
                                <Text style={styles.buttonText}>Add</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleActivateAddNewMember}>
                            <View style={styles.button} backgroundColor="red">
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <TouchableOpacity onPress={toggleActivateAddNewMember}>
                    <View style={styles.addButton} backgroundColor="gray">
                        <Text style={styles.buttonText}>+ Add Member</Text>
                    </View>
                </TouchableOpacity>
            }
        </CustomDialog>
    )
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },
    container: {
        width: '100%',
        backgroundColor: '#fff'
    },
    flatListContainer: {
    },
    cardContainer: {
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },

    // Controls
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    addButton: {
        borderRadius: 8,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 8,
        width: 100,
        marginEnd: 10,
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
});

export default MembersDialog;

import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import CustomDialog from './CustomDialog';
import UserCard from '../cards/UserCard';
import UserModel from '../../models/UserModel';

const members = [
    { id: 1, email: 'user1@example.com', firstName: "First 1", lastName: "Last", password: 'pass' },
    { id: 2, email: 'user2@example.com', firstName: "First 2", lastName: "Last", password: 'pass' },
    { id: 3, email: 'user3@example.com', firstName: "First 3", lastName: "Last", password: 'pass' }
]

const MembersDialog = ({ visible, onClose }) => {

    const memberModels = members.map(member => new UserModel(member))

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <UserCard name={item.getName()} email={item.getEmail()}/>
        </View>
    );

    return (
        <CustomDialog visible={visible} onClose={onClose}>
            <Text style={styles.title}>Members</Text>
            <FlatList
                style={styles.container}
                data={memberModels}
                renderItem={renderCard}
                keyExtractor={item => item.getId()}
                contentContainerStyle={styles.flatListContainer}
                numColumns={1}
            />
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
});

export default MembersDialog;

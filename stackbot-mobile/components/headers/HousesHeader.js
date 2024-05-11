import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfirmLogoutDialog from '../dialogs/ConfirmLogoutDialog';

const HousesHeader = () => {

    const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

    const toggleLougoutDialogVisible = () => {
        setLogoutDialogVisible(!logoutDialogVisible);
    }

    const handleLogout = () => {
        console.log("Logout User")

        // TODO - Implement user log out
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={() => {
                    // TODO - Handle microphone icon press
                }}
            >
                <MaterialCommunityIcons name="microphone" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.headerIcon}
                onPress={toggleLougoutDialogVisible}
            >
                <MaterialCommunityIcons name="logout" size={24} color="red" />
            </TouchableOpacity>

            {/* Logout Confirmation Dialog */}
            <ConfirmLogoutDialog visible={logoutDialogVisible} onClose={toggleLougoutDialogVisible} onSubmit={handleLogout}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 30
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    headerIcon: {
        padding: 15,
    },
});

export default HousesHeader;

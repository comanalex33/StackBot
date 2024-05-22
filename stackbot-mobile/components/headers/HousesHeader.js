import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfirmLogoutDialog from '../dialogs/ConfirmLogoutDialog';
import { unsetAuthToken } from '../../services/BackendApiService/backendApi';
import { useUpdate } from '../../services/UpdateService/UpdateContext';
import UpdateTypes from '../../services/UpdateService/UpdateTypes';
import { unsetAuthTokenForAI } from '../../services/AIApiService/aiApi';
import RecordingButton from '../buttons/RecordingButton';

const HousesHeader = () => {

    const { addUpdate } = useUpdate();

    const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

    const toggleLougoutDialogVisible = () => {
        setLogoutDialogVisible(!logoutDialogVisible);
    }

    const handleLogout = () => {
        console.log("Logout User")

        unsetAuthToken()
        unsetAuthTokenForAI()
        toggleLougoutDialogVisible()
        addUpdate(UpdateTypes.TRIGGER_LOGOUT)
    }

    return (
        <View style={styles.header}>
            <RecordingButton style={styles.headerIcon} size={24}/>
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

import React from 'react'
import CustomDialog from './CustomDialog'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConfirmLogoutDialog = ({ visible, onClose, onSubmit }) => {

    return (
        <CustomDialog visible={visible} onClose={onClose}>
            <Text style={styles.text}>Are you sure you want to log out ?</Text>
            <View style={styles.controls}>
                <TouchableOpacity onPress={onClose}>
                    <View style={styles.button} backgroundColor="red">
                        <Text style={styles.buttonText}>No</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSubmit}>
                    <View style={styles.button} backgroundColor="blue">
                        <Text style={styles.buttonText}>Yes</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </CustomDialog>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        fontSize: 20
    },
    boldText: {
        fontWeight: 'bold',
    },

    // Controls
    controls: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        borderRadius: 8,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 20,
        padding: 5,
        textAlign: 'center',
    }
})

export default ConfirmLogoutDialog;

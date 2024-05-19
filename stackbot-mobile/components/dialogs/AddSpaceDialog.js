import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import CustomDialog from './CustomDialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import StorageModel from '../../models/StorageModel';
import { StorageTypes } from '../../models/StorageTypes';

// Setup validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    type: Yup.string()
        .required('Type is required'),
});

const AddSpaceDialog = ({ visible, onClose, roomId }) => {

    const handleCreateSpace = (name, description, type) => {
        const space = new StorageModel({
            name: name,
            description: description,
            type: type,
            parentStorageId: roomId
        })

        // TODO - Handle Space creation
        console.log(space)
    }

    return (
        <CustomDialog visible={visible} onClose={onClose}>
            <Text style={styles.title}>Add Space</Text>
            <Formik
                initialValues={{ name: '', description: '', type: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values.type)
                    handleCreateSpace(values.name, values.description, values.type)
                    onClose(); // Close the dialog on successful submission
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={[styles.typeButton, values.type === StorageTypes.Fridge && styles.selectedButton]}
                                onPress={() => setFieldValue('type', StorageTypes.Fridge)}
                            >
                                <Text>Fridge</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.typeButton, values.type === StorageTypes.Deposit && styles.selectedButton]}
                                onPress={() => setFieldValue('type', StorageTypes.Deposit)}
                            >
                                <Text>Deposit</Text>
                            </TouchableOpacity>
                        </View>
                        {touched.type && errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {touched.name && errors.name ? (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        ) : null}
                        <TextInput
                            style={styles.inputMulti}
                            placeholder="Description"
                            onChangeText={handleChange('description')}
                            onBlur={handleBlur('description')}
                            value={values.description}
                            multiline
                            numberOfLines={4}
                        />
                        {touched.description && errors.description ? (
                            <Text style={styles.errorText}>{errors.description}</Text>
                        ) : null}
                        <View style={styles.controls}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.button} backgroundColor="blue">
                                    <Text style={styles.buttonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
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
    input: {
        width: '100%',
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    inputMulti: {
        width: '100%',
        height: 100,  // Adjust height based on design needs
        textAlignVertical: 'top', // Ensures text starts from the top
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 15,
    },
    typeButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    selectedButton: {
        backgroundColor: '#07ad02', // Blue background for selected button
        borderColor: '#0056b3', // Darker blue border for selected button
    },
    buttonText: {
        color: 'black', // Text color for unselected buttons
    },
    selectedButtonText: {
        color: 'white', // Text color for selected button
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
        width: 200,
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
});

export default AddSpaceDialog;

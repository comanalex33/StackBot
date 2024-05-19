import React from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import CustomDialog from './CustomDialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StorageTypes } from '../../models/StorageTypes';
import StorageModel from '../../models/StorageModel';

// Setup validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required')
});

const ModifyStorageDialog = ({ storage, visible, onClose }) => {

    const storageModel = new StorageModel(storage)

    const handleUpdateStorage = (name, description) => {
        const updatedStorage = storageModel
        updatedStorage.setName(name)
        updatedStorage.setDescription(description)

        // TODO - Handle Storage update
        if (!updatedStorage.isEqual(storage)) {
            console.log("Something changed")
            console.log(updatedStorage)

            if (storageModel.getTypeText() === StorageTypes.House) {
                // House
            } else if (storageModel.getTypeText() === StorageTypes.Room) {
                // Room
            } else if (storageModel.getTypeText() === StorageTypes.Deposit) {
                // Deposit
            } else {
                // Fridge
            }
        }
    }

    const getStorageTypeName = () => {
        if (storageModel.getTypeText() === StorageTypes.House) {
            return "House"
        } else if (storageModel.getTypeText() === StorageTypes.Room) {
            return "Room"
        } else if (storageModel.getTypeText() === StorageTypes.Deposit) {
            return "Deposit"
        } else {
            return "Fridge"
        }
    }

    return (
        <CustomDialog visible={visible} onClose={onClose}>
            <Text style={styles.title}>Modify {getStorageTypeName}</Text>
            <Formik
                initialValues={{ name: storageModel.getName(), description: storageModel.getDescription() }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleUpdateStorage(values.name, values.description)
                    onClose(); // Close the dialog on successful submission
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
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

export default ModifyStorageDialog;

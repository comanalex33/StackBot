import React, { useEffect } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import CustomDialog from './CustomDialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateButton from '../buttons/DateButton';
import { formatDate, formatDateForApiRequest } from '../../Helper';
import ItemModel from '../../models/ItemModel';
import { StorageTypes } from '../../models/StorageTypes';
import { updateItem } from '../../services/BackendApiService/itemService';
import { useUpdate } from '../../services/UpdateService/UpdateContext';
import UpdateTypes from '../../services/UpdateService/UpdateTypes';

// Setup validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    count: Yup.number()
        .required('Count is required'),
    date: Yup.date()
        .required('Date is required').nullable()
});

const ModifyItemDialog = ({ item, visible, onClose, spaceType, updateCurrentItem }) => {

    const itemModel = new ItemModel(item)

    const { addUpdate } = useUpdate();

    const handleUpdateItem = (name, description, count, date) => {
        const updatedItem = itemModel
        updatedItem.setName(name)
        updatedItem.setDescription(description)
        updatedItem.setCount(Number(count))
        if (spaceType === StorageTypes.Fridge) {
            updatedItem.setExpirationDate((spaceType === StorageTypes.Fridge) ? formatDateForApiRequest(date) : item.expirationDate)
        } else {
            updatedItem.setWarrantyDate((spaceType === StorageTypes.Deposit) ? formatDateForApiRequest(date) : item.expirationDate)
        }

        if (!updatedItem.isEqual(item)) {

            updateItem(item.name, name, Number(count), description,
                (spaceType === StorageTypes.Fridge) ? formatDateForApiRequest(date) : item.expirationDate,
                (spaceType === StorageTypes.Deposit) ? formatDateForApiRequest(date) : item.warrantyDate)
                .then(response => {
                    if (response.status !== 200) {
                        alert(`Something went wrong ${response.status}`)
                        return
                    }

                    const newItem = new ItemModel({
                        id: item.id,
                        name: response.data.name,
                        description: response.data.description,
                        count: response.data.count,
                        expirationDate: response.data.expirationDate,
                        warrantyDate: response.data.warrantyDate,
                        parentStorageId: item.parentStorageId
                    })
                    
                    updateCurrentItem(newItem)
                    addUpdate(UpdateTypes.TRIGGER_ITEMS_UPDATE)
                    onClose()
                })
                .catch(error => {
                    const response = error.response

                    console.log(response.status)

                    if (!response) {
                        alert("Something went wrong!")
                    }

                    if (response.status === 401) {
                        alert(response.data.message)
                    } else {
                        alert("Something went wrong!")
                    }
                })
        }
    }

    return (
        <CustomDialog visible={visible} onClose={onClose}>
            <Text style={styles.title}>Modify Item</Text>
            <Formik
                initialValues={{ name: item.name, description: item.description, count: String(item.count), date: (spaceType === StorageTypes.Fridge) ? item.expirationDate : item.warrantyDate }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleUpdateItem(values.name, values.description, values.count, values.date)
                    // onClose(); // Close the dialog on successful submission
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
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
                        <TextInput
                            style={styles.input}
                            placeholder="Count"
                            keyboardType="numeric"
                            onChangeText={handleChange('count')}
                            onBlur={handleBlur('count')}
                            value={values.count}
                        />
                        {touched.count && errors.count ? (
                            <Text style={styles.errorText}>{errors.count}</Text>
                        ) : null}
                        <View style={styles.dateContainer}>
                            <View>
                                <Text>{spaceType === StorageTypes.Fridge ? 'Expiration Date' : 'Warranty Date'}</Text>
                            </View>
                            <DateButton text={values.date === null ? "-" : formatDate(values.date)} onPress={() => {
                                DateTimePickerAndroid.open({
                                    value: values.date === null ? new Date() : new Date(values.date),
                                    onChange: (event, selectedDate) => {
                                        setFieldValue('date', selectedDate || values.date);
                                    },
                                    mode: 'date'
                                });
                            }} />
                        </View>
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
    dateContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
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

export default ModifyItemDialog;

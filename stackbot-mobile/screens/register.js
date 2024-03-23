import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const reviewSchema = yup.object({
    email: yup.string()
        .email('Invalid Email format')
        .required('Email is required'),
    firstName: yup.string()
        .required('First Name is required'),
    lastName: yup.string()
        .required('Last Name is required'),
    password: yup.string()
        .required('Password is required')
        .min(4),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirming password is required'),
});

export default function Register({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleRegister = (values) => {
        alert("User registered")
        // TODO - Call Register function
        navigation.goBack()
    }

    return (
        <View style={globalStyles.container}>
            <ImageBackground source={require('../assets/auth_background.png')} style={styles.backgroundImage}>
                <View style={styles.authContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.loginTitle}>Create Account</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' }}
                            validationSchema={reviewSchema}
                            onSubmit={(values, actions) => {
                                actions.resetForm();
                                handleRegister(values);
                            }}
                            onReset={() => { }}
                        >
                            {props => (
                                <View>
                                    <TextInput
                                        style={globalStyles.input}
                                        keyboardType="email-address"
                                        placeholder='Email'
                                        placeholderTextColor="#aaa"
                                        onChangeText={props.handleChange('email')}
                                        onBlur={props.handleBlur('email')}
                                        value={props.values.email}
                                    />
                                    {/* only if the left value is a valid string, will the right value be displayed */}
                                    <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='First Name'
                                        placeholderTextColor="#aaa"
                                        onChangeText={props.handleChange('firstName')}
                                        onBlur={props.handleBlur('firstName')}
                                        value={props.values.firstName}
                                    />
                                    {/* only if the left value is a valid string, will the right value be displayed */}
                                    <Text style={globalStyles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>

                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder='Last Name'
                                        placeholderTextColor="#aaa"
                                        onChangeText={props.handleChange('lastName')}
                                        onBlur={props.handleBlur('lastName')}
                                        value={props.values.lastName}
                                    />
                                    {/* only if the left value is a valid string, will the right value be displayed */}
                                    <Text style={globalStyles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>

                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            secureTextEntry={!showPassword}
                                            value={props.values.password}
                                            onChangeText={props.handleChange('password')}
                                            style={styles.passwordInput}
                                            placeholder="Password"
                                            placeholderTextColor="#aaa"
                                        />
                                        <MaterialCommunityIcons
                                            name={showPassword ? 'eye-off' : 'eye'}
                                            size={24}
                                            color="#aaa"
                                            style={styles.icon}
                                            onPress={toggleShowPassword}
                                        />
                                    </View>
                                    {/* only if the left value is a valid string, will the right value be displayed */}
                                    <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                                    <TextInput
                                        secureTextEntry
                                        style={globalStyles.input}
                                        placeholder='Confirm Password'
                                        placeholderTextColor="#aaa"
                                        onChangeText={props.handleChange('confirmPassword')}
                                        onBlur={props.handleBlur('confirmPassword')}
                                        value={props.values.confirmPassword}
                                    />
                                    {/* only if the left value is a valid string, will the right value be displayed */}
                                    <Text style={globalStyles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>

                                    <FlatButton onPress={props.handleSubmit} text='register' />
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    authContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginTitle: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        marginBottom: 50
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
    passwordInput: {
        padding: 10,
        fontSize: 18,
    },
    icon: {
        marginRight: 10,
    },
    createAccountButton: {
        marginStart: 10,
        color: 'blue'
    }
})
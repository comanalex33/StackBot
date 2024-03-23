import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const reviewSchema = yup.object({
    email: yup.string()
        .email('Invalid Email format')
        .required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(4),
});

export default function Login({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleChangeToRegisterPage = () => {
        navigation.navigate("Register")
    }

    const handleLogin = (values) => {
        alert("User Logged in")
        // TODO - Call Login function
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.formContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.loginTitle}>StackBot</Text>
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        handleLogin(values);
                    }}
                    onReset={() => { }}
                >
                    {props => (
                        <View>
                            <TextInput
                                style={globalStyles.input}
                                keyboardType="email-address"
                                placeholder='Enter Email'
                                placeholderTextColor="#aaa"
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                value={props.values.email}
                            />
                            {/* only if the left value is a valid string, will the right value be displayed */}
                            <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

                            <View style={styles.passwordContainer}>
                                <TextInput

                                    // Set secureTextEntry prop to hide  
                                    //password when showPassword is false 
                                    secureTextEntry={!showPassword}
                                    value={props.values.password}
                                    onChangeText={props.handleChange('password')}
                                    style={styles.passwordInput}
                                    placeholder="Enter Password"
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
                            <Text style={globalStyles.errorText}>{props.touched.password && props.errors.password}</Text>

                            <FlatButton onPress={props.handleSubmit} text='login' />
                            <View style={styles.titleContainer}>
                                <Text style={styles.createAccountText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={(event) => {
                                    handleChangeToRegisterPage();
                                    props.handleReset(event)
                                }}>
                                    <Text style={styles.createAccountButton}>Create one</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    loginForm: {
        backgroundColor: '#eee',
        width: '80%',
        height: '80%',
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginTitle: {
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
        fontSize: 18,
        color: 'blue'
    },
    createAccountText: {
        fontSize: 18
    }
})
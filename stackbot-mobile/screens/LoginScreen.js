import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../components/buttons/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { login } from '../services/BackendApiService/userService';
import { setAuthToken } from '../services/BackendApiService/backendApi';
import { setAuthTokenForAI } from '../services/AIApiService/aiApi';

const reviewSchema = yup.object({
    email: yup.string()
        .email('Invalid Email format')
        .required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(4),
});

export default function LoginScreen({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleChangeToRegisterPage = () => {
        navigation.navigate("Register")
    }

    const handleLogin = (email, password) => {
        login(email, password)
            .then(response => {
                if(response.status === 401) {
                    alert("Bad credentials")
                    return
                }
                
                setAuthToken(response.data.token)
                setAuthTokenForAI(response.data.token)
                navigation.navigate("Houses")
            })
            .catch(error => {
                const response = error.response

                if(!response) {
                    alert("Something went wrong!")
                }

                if(response.status === 401) {
                    alert(response.data.message)
                } else {
                    alert("Something went wrong!")
                }
            })
    }

    return (
        <View style={globalStyles.container}>
            <ImageBackground source={require('../assets/auth_background.png')} style={styles.backgroundImage}>
                <View style={styles.authContainer}>
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={reviewSchema}
                            onSubmit={(values, actions) => {
                                actions.resetForm();
                                handleLogin(values.email, values.password);
                            }}
                            onReset={() => { }}
                        >
                            {props => (
                                <View>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.loginTitle}>StackBot</Text>
                                    </View>

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
        fontSize: 18,
        color: 'blue'
    },
    createAccountText: {
        fontSize: 18
    }
})
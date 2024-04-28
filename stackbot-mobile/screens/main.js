import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Buffer } from "buffer";
import { FontAwesome } from '@expo/vector-icons';

import secrets from '../secrets.json'
import * as FileSystem from 'expo-file-system';

import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

export default function Main() {

    const [recording, setRecording] = useState(null)
    const [recordingInProgress, setRecordingInProgress] = useState(false)

    const [message, setMessage] = useState('')
    const [buttonColor, setButtonColor] = useState('#ff5252'); // Default button color

    const assemblyAiApiKey = secrets.assembly_ai_api_key

    // sleep time expects milliseconds
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    } ``

    const speak = () => {
        Speech.speak(message);
    };

    async function startRecording() {
        // Requests permission when creating the recording session
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need audio recording permissions to make this work!');
            return;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        try {
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            setRecording(recording)
            setRecordingInProgress(true)
            setMessage('... Processing ...')
            await recording.startAsync();
            console.log("Recording started")
        } catch (error) {
            // Handle recording start error
            console.error('Failed to start recording', error);
        }
    }

    async function stopRecording(recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null)
        console.log('Recording stored at', uri);
        processRecording(uri)
    }

    async function processRecording(uri) {
        const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const binaryData = Buffer.from(base64Data, 'base64');

        console.log(assemblyAiApiKey)

        // Firstly upload the audio online
        fetch('https://api.assemblyai.com/v2/upload', {
            method: 'POST',
            headers: {
                'Authorization': assemblyAiApiKey,
                'Content-Type': 'application/octet-stream'
            },
            body: binaryData
        })
            .then(response => response.json())
            .then(data => {
                const audio_url = data['upload_url']

                // After upload, transcribe the audio content
                const body = JSON.stringify({
                    audio_url: audio_url
                });

                fetch('https://api.assemblyai.com/v2/transcript', {
                    method: 'POST',
                    headers: {
                        'Authorization': assemblyAiApiKey,
                        'Content-Type': 'application/json'
                    },
                    body: body
                })
                    .then(response => response.json())
                    .then(data => {
                        const transcriptId = data['id']
                        console.log(transcriptId)

                        sleep(5000).then(() => {
                            getTranscript(transcriptId)
                        })
                    })
                    .catch(err => console.error('Error:', err));
            })
            .catch(err => console.error('Error:', err));

    }

    function getTranscript(transcriptId) {
        const getUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}`
        console.log(getUrl)

        fetch(getUrl, {
            method: 'GET',
            headers: {
                'Authorization': assemblyAiApiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setRecordingInProgress(false)

                const text = data['text']
                setMessage(text)
            })
            .catch(err => console.error('Error:', err));
    }

    const handleStartRecording = async () => {
        await startRecording();
    };

    const handleStopRecording = async () => {
        if (recording) {
            await stopRecording(recording);
            console.log("Recording stopped")
            setRecording(null);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPressIn={() => {
                    setButtonColor('#ff0000');  // Change color when recording starts
                    handleStartRecording()
                }}
                onPressOut={() => {
                    setButtonColor('#ff5252');  // Change color when recording starts
                    handleStopRecording()
                }}
            >
                <View style={[styles.button, { backgroundColor: buttonColor }]}>
                    <FontAwesome name="microphone" size={30} color="#FFF" />
                </View>
            </TouchableWithoutFeedback>
            <Text style={recordingInProgress ? styles.statusTextProcessing : styles.statusTextDone}>{message}</Text>
            <TouchableOpacity
                onPress={speak}
            >
                <View>
                    <View style={[styles.button, { backgroundColor: buttonColor }]}>
                        <FontAwesome name="volume-up" size={30} color="#FFF" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff',
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusTextProcessing: {
        fontSize: 18,
        color: 'orange',
    },
    statusTextDone: {
        fontSize: 18,
        color: 'black',
    },
});

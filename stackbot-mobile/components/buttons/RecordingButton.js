import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Buffer } from "buffer";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import secrets from '../../secrets.json'
import * as FileSystem from 'expo-file-system';

import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { processText } from '../../services/AIApiService/aiService';

const RecordingButton = ({ size }) => {

    const [recording, setRecording] = useState(null)
    const [recordingInProgress, setRecordingInProgress] = useState(false)
    const [message, setMessage] = useState('')

    const assemblyAiApiKey = secrets.assembly_ai_api_key

    // sleep time expects milliseconds
    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    } ``

    const speak = (text) => {
        Speech.speak(text);
    };

    async function startRecording() {
        console.log("Test")
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
        processRecording(uri)
    }

    async function processRecording(uri) {
        const base64Data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const binaryData = Buffer.from(base64Data, 'base64');

        speak("The recording is processing, wait 5 seconds")
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

                        sleep(6000).then(() => {
                            getTranscript(transcriptId)
                        })
                    })
                    .catch(err => console.error('Error:', err));
            })
            .catch(err => console.error('Error:', err));

    }

    function getTranscript(transcriptId) {
        const getUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}`

        fetch(getUrl, {
            method: 'GET',
            headers: {
                'Authorization': assemblyAiApiKey
            }
        })
            .then(response => response.json())
            .then(data => {
                setRecordingInProgress(false)

                const text = data['text']
                setMessage(text)
                sendAIRequest(text)
            })
            .catch(err => console.error('Error:', err));
    }

    const sendAIRequest = (text) => {

        if(!text) {
            speak("The text couldn't be decoded, try again")
        }

        const processedText = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
        console.log("Text to be sent: ", processedText)

        processText(processedText)
            .then(response => {
                console.log(response.data)
                speak(response.data)
            })
            .catch(error => {
                console.log(error.response)
                speak("Something went wrong, try again")
            })
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
        <TouchableWithoutFeedback
            onPressIn={() => {
                handleStartRecording()
            }}
            onPressOut={() => {
                handleStopRecording()
            }}
        >
            <MaterialCommunityIcons name="microphone" size={size} color="black" />
        </TouchableWithoutFeedback>
    )
}

export default RecordingButton;

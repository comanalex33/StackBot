import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing icons from Expo Icons
import { AntDesign } from '@expo/vector-icons';
import StorageModel from '../../models/StorageModel';
import DeleteStorageDialog from '../dialogs/DeleteStorageDialog';
import ModifyStorageDialog from '../dialogs/ModifyStorageDialog';
import { deleteStorage } from '../../services/BackendApiService/storageService';

const HouseCard = ({ house, onPress, updateHousesList }) => {

  const houseModel = new StorageModel(house)

  const [controlsOpen, setControlsOpen] = useState(false)

  const [modifyHouseDialogVisible, setModifyHouseDialogVisible] = useState(false)
  const [deleteHouseDialogVisible, setDeleteHouseDialogVisible] = useState(false)

  const toggleControls = () => {
    setControlsOpen(!controlsOpen)
  }

  const toggleModifyHouseDialogVisible = () => {
    if (modifyHouseDialogVisible) {
      toggleControls()
    }

    setModifyHouseDialogVisible(!modifyHouseDialogVisible);
  }

  const toggleDeleteHouseDialogVisible = () => {
    if (deleteHouseDialogVisible) {
      toggleControls()
    }

    setDeleteHouseDialogVisible(!deleteHouseDialogVisible)
  }

  const handleHouseDelete = () => {
    deleteStorage(houseModel.getName())
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          alert("Something went wrong")
          return
        }

        console.log(`House ${houseModel.getName()} is deleted`)
        updateHousesList()
      })
      .catch(error => {
        const response = error.response

        if (!response) {
          alert("Something went wrong!")
        }

        if ('message' in response.data) {
          alert(`${response.status}: ${response.data.message}`)
        } else {
          alert(`${response.status}: Something went wrong!`)
        }
      })
  }

  return (
    <View>
      <TouchableOpacity onLongPress={toggleControls} onPress={onPress} style={styles.card}>
        <View style={controlsOpen ? styles.blurredContent : styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="home" size={40} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.houseName}>{houseModel.getName()}</Text>
            <Text style={styles.houseDescription}>{houseModel.getDescription()}</Text>
          </View>
        </View>
        {controlsOpen &&
          <View style={styles.controls}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={toggleModifyHouseDialogVisible}>
                <View style={styles.button} backgroundColor="blue">
                  <Text style={styles.buttonText}>Modify</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDeleteHouseDialogVisible}>
                <View style={styles.button} backgroundColor="red">
                  <Text style={styles.buttonText}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleControls} style={styles.closeButtonContainer}>
              <View style={styles.closeButton} backgroundColor="white">
                <AntDesign name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        }
      </TouchableOpacity>

      {/* Modify House Dialog */}
      <ModifyStorageDialog storage={houseModel} visible={modifyHouseDialogVisible} onClose={toggleModifyHouseDialogVisible} updateList={updateHousesList} />

      {/* Delete House Dialog */}
      <DeleteStorageDialog storage={houseModel} visible={deleteHouseDialogVisible} onClose={toggleDeleteHouseDialogVisible} onSubmit={handleHouseDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#d6d6d6'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurredContent: {
    opacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  houseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  houseDescription: {
    fontSize: 16,
  },

  // Controls
  controls: {
    margin: 15,
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginStart: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  closeButton: {
    borderRadius: 8,
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default HouseCard;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing icons from Expo Icons

const HouseCard = ({ name, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="home" size={40} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.houseName}>{name}</Text>
        <Text style={styles.houseDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
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
});

export default HouseCard;

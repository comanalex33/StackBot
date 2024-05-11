import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemDetailCard = ({ title, value }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    leftColumn: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 8,
    },
    rightColumn: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
});

export default ItemDetailCard;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing icons from Expo Icons
import { SvgXml } from 'react-native-svg';
import HouseCard from '../components/cards/HouseCard';
import FloatingAddButton from '../components/buttons/FloatingAddButton';
import AddHouseDialog from '../components/dialogs/AddHouseDialog';
import StorageModel from '../models/StorageModel';
import { getHouses } from '../services/BackendApiService/storageService';
import { useUpdate } from '../services/UpdateService/UpdateContext';
import UpdateTypes from '../services/UpdateService/UpdateTypes';

// House entry example
//  { id: '1', name: "Alex's House", type: 0, description: 'Description for House 1', parentStorageId: null } 

const HousesScreen = ({ navigation }) => {

    const { updates, cleanUpdates } = useUpdate();

    const [dialogVisible, setDialogVisible] = useState(false);

    const [houses, setHouses] = useState([])

    // Get houses when screen opens
    useEffect(() => {
        getHouses()
            .then(response => {
                setHouses(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    // Update context
    useEffect(() => {
        const latestUpdate = updates[updates.length - 1];
        if (latestUpdate && latestUpdate === UpdateTypes.TRIGGER_LOGOUT) {
            navigation.goBack()
            cleanUpdates()
        }
    }, [updates])

    // Update houses list
    const updateHousesList = () => {
        getHouses()
            .then(response => {
                setHouses(response.data)
            })
            .catch(error => console.log(error))
    }

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    };

    const handleHouseClick = (item) => {
        const house = new StorageModel(item);
        navigation.navigate("Rooms", { house: house })
    }

    const renderCard = ({ item }) => (
        <View style={styles.cardContainer}>
            <HouseCard house={item} onPress={() => handleHouseClick(item)} updateHousesList={updateHousesList} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerDescriptionContainer}>
                    <View style={styles.headerDescription}>
                        <Text style={styles.headerTitleText}>Inventory</Text>
                        <Text style={styles.headerTitleText}>Management</Text>
                        <Text style={styles.item}><Text style={styles.bullet}>•</Text> Store</Text>
                        <Text style={styles.item}><Text style={styles.bullet}>•</Text> Organize</Text>
                        <Text style={styles.item}><Text style={styles.bullet}>•</Text> Access</Text>
                    </View>
                </View>
                <View style={styles.headerImageContainer}>
                    <SvgXml xml={houseSvgXml} width="100%" height="100%" />
                </View>
            </View>
            <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="information-outline" size={25} color="black" />
                <Text style={styles.infoText}>Long press on cards to activate controls</Text>
            </View>
            <FlatList
                style={styles.content}
                data={houses}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContainer}
                numColumns={1} // Display two cards per row
            />

            <FloatingAddButton onPress={toggleDialog} />

            {/* Add House Dialog */}
            <AddHouseDialog visible={dialogVisible} onClose={toggleDialog} updateHousesList={updateHousesList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Header styles
    header: {
        flex: 0.35,
        flexDirection: 'row',
        paddingRight: 10
    },
    headerDescriptionContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    headerDescription: {
        flex: 1,
        height: '80%',
        width: '80%',
        justifyContent: 'center'
    },
    headerTitleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    headerDescriptionText: {
        marginTop: 10
    },
    headerImageContainer: {
        flex: 0.4
    },
    item: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 5,
        marginLeft: 10, // Add some space to separate bullet from text
    },
    bullet: {
        marginRight: 5, // Add space between bullet and text
        fontSize: 20, // Adjust size of the bullet point
    },
    content: {
        flex: 0.65,
        padding: 10
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 10,
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fbfc9d',
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.3,
        paddingStart: 20
    },
    infoText: {
        marginStart: 10
    }
});

const houseSvgXml = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512.221 512.221" style="enable-background:new 0 0 512.221 512.221;" xml:space="preserve">
<path style="fill:#ECF1F1;" d="M379.697,450.428c0-24.717,19.421-44.138,44.138-44.138c24.717,0,44.138,19.421,44.138,44.138
	V212.083H44.248v238.345l0,0c0-24.717,19.421-44.138,44.138-44.138s44.138,19.421,44.138,44.138
	c24.717,0,44.138,19.421,44.138,44.138c0,6.179-1.766,12.359-3.531,17.655H339.09c-2.648-5.297-3.531-11.476-3.531-17.655
	C335.559,469.848,354.979,450.428,379.697,450.428"/>
<g>
	<path style="fill:#556080;" d="M483.862,212.083H28.359c-9.71,0-15.007-12.359-7.062-19.421L224.331,12.579
		c17.655-16.772,45.903-16.772,63.559,0l203.034,180.083C497.986,199.724,493.572,212.083,483.862,212.083"/>
	<polygon style="fill:#556080;" points="53.076,35.531 159.007,35.531 159.007,0.221 53.076,0.221 	"/>
</g>
<path style="fill:#25B99A;" d="M309.076,512.221H203.145V353.324c0-29.131,23.835-52.966,52.966-52.966s52.966,23.835,52.966,52.966
	V512.221z"/>
<g>
	<polygon style="fill:#8B9BC1;" points="79.559,335.669 167.834,335.669 167.834,247.393 79.559,247.393 	"/>
	<polygon style="fill:#8B9BC1;" points="344.386,335.669 432.662,335.669 432.662,247.393 344.386,247.393 	"/>
</g>
<path style="fill:#198D71;" d="M238.455,415.117h-8.828c-5.297,0-8.828-3.531-8.828-8.828c0-5.297,3.531-8.828,8.828-8.828h8.828
	c5.297,0,8.828,3.531,8.828,8.828C247.283,411.586,242.869,415.117,238.455,415.117"/>
<polygon style="fill:#ECF1F1;" points="141.352,86.731 141.352,35.531 70.731,35.531 70.731,149.407 "/>
<path style="fill:#42C775;" d="M173.131,512.221c2.648-5.297,3.531-11.476,3.531-17.655c0-24.717-19.421-44.138-44.138-44.138
	c0-24.717-19.421-44.138-44.138-44.138s-44.138,19.421-44.138,44.138c-24.717,0-44.138,19.421-44.138,44.138
	c0,6.179,1.766,12.359,3.531,17.655h84.745H173.131z"/>
<path style="fill:#32A158;" d="M106.041,459.255c-3.531,0-7.062-1.766-7.945-5.297c0,0-1.766-3.531-9.71-3.531
	c-6.179,0-10.593,5.297-10.593,5.297c-2.648,4.414-7.945,5.297-12.359,1.766c-4.414-2.648-5.297-7.945-1.766-12.359
	c3.531-4.414,12.359-12.359,24.717-12.359c15.89,0,23.834,8.828,25.6,14.124c1.766,4.414-0.883,9.71-5.297,11.476
	C107.807,459.255,106.924,459.255,106.041,459.255"/>
<path style="fill:#42C775;" d="M508.579,512.221c2.648-5.297,3.531-11.476,3.531-17.655c0-24.717-19.421-44.138-44.138-44.138
	c0-24.717-19.421-44.138-44.138-44.138c-24.717,0-44.138,19.421-44.138,44.138c-24.717,0-44.138,19.421-44.138,44.138
	c0,6.179,1.766,12.359,3.531,17.655h84.745H508.579z"/>
<path style="fill:#32A158;" d="M441.49,459.255c-3.531,0-7.062-1.766-7.945-5.297c0,0-1.766-3.531-9.71-3.531
	c-6.179,0-10.593,5.297-10.593,5.297c-2.648,4.414-7.945,5.297-12.359,1.766c-4.414-2.648-5.297-7.945-1.766-12.359
	c3.531-4.414,12.359-12.359,24.717-12.359c15.89,0,23.835,8.828,25.6,14.124c1.766,4.414-0.883,9.71-5.297,11.476
	C443.255,459.255,442.372,459.255,441.49,459.255"/>
<g>
	<path style="fill:#6D7EA4;" d="M176.662,344.497H70.731c-5.297,0-8.828-3.531-8.828-8.828s3.531-8.828,8.828-8.828h105.931
		c5.297,0,8.828,3.531,8.828,8.828S181.959,344.497,176.662,344.497"/>
	<path style="fill:#6D7EA4;" d="M441.49,344.497H335.559c-5.297,0-8.828-3.531-8.828-8.828s3.531-8.828,8.828-8.828H441.49
		c5.297,0,8.828,3.531,8.828,8.828S446.786,344.497,441.49,344.497"/>
</g>
<g>
	<path style="fill:#F0C419;" d="M123.697,309.186c-5.297,0-8.828-3.531-8.828-8.828v-17.655c0-5.297,3.531-8.828,8.828-8.828
		c5.297,0,8.828,3.531,8.828,8.828v17.655C132.524,305.655,128.993,309.186,123.697,309.186"/>
	<path style="fill:#F0C419;" d="M388.524,300.359c-5.297,0-8.828-3.531-8.828-8.828v-8.828c0-5.297,3.531-8.828,8.828-8.828
		s8.828,3.531,8.828,8.828v8.828C397.352,296.828,393.821,300.359,388.524,300.359"/>
</g>
<path style="fill:#556080;" d="M97.214,62.014H70.731l0,0v17.655l0,0h26.483c5.297,0,8.828-3.531,8.828-8.828
	S102.51,62.014,97.214,62.014"/>
<g>
	<polygon style="fill:#E1705C;" points="79.559,282.703 167.834,282.703 167.834,247.393 79.559,247.393 	"/>
	<polygon style="fill:#E1705C;" points="344.386,282.703 432.662,282.703 432.662,247.393 344.386,247.393 	"/>
</g>
</svg>
`

export default HousesScreen;

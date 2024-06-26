import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from './styles/global';
import HousesScreen from './screens/HousesScreen';
import HousesHeader from './components/headers/HousesHeader';
import RoomsScreen from './screens/RoomsScreen';
import RoomsHeader from './components/headers/RoomsHeader';
import RoomContentScreen from './screens/RoomContentScreen';
import RoomContentHeader from './components/headers/RoomContentHeader';
import ItemsScreen from './screens/ItemsScreen';
import ItemsHeader from './components/headers/ItemsHeader';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import { UpdateProvider } from './services/UpdateService/UpdateContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UpdateProvider>
      <NavigationContainer styles={globalStyles.container}>
        <Stack.Navigator
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Houses" component={HousesScreen} options={{ header: () => <HousesHeader /> }} />
          <Stack.Screen name="Rooms" component={RoomsScreen} options={{ header: ({ route }) => <RoomsHeader route={route} /> }} />
          <Stack.Screen name="RoomContent" component={RoomContentScreen} options={{ header: ({ route }) => <RoomContentHeader route={route} /> }} />
          <Stack.Screen name="Items" component={ItemsScreen} options={{ header: ({ route }) => <ItemsHeader route={route} /> }} />
          <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UpdateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

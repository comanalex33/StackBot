import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from './styles/global';
import Main from './screens/main';
import HousesScreen from './screens/HousesScreen';
import HousesHeader from './components/headers/HousesHeader';
import RoomsScreen from './screens/RoomsScreen';
import RoomsHeader from './components/headers/RoomsHeader';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer styles={globalStyles.container}>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Houses" component={HousesScreen} options={{ header: () => <HousesHeader /> }}/>
        <Stack.Screen name="Rooms" component={RoomsScreen} options={{ header: ({ route }) => <RoomsHeader route={route}/> }}/>
      </Stack.Navigator>
    </NavigationContainer>
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

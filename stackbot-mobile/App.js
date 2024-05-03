import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import Register from './screens/register';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from './styles/global';
import Main from './screens/main';
import Houses from './screens/houses';
import HousesHeader from './components/headers/HousesHeader';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer styles={globalStyles.container}>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Houses" component={Houses} options={{ header: () => <HousesHeader /> }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

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

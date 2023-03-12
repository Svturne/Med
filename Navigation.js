import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import QrScaner from './src/screens/QrScaner';
import PatientScreen from './src/screens/PatientScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileDoctor from './src/screens/ProfileDoctor';

const Stack = createStackNavigator();
const config = {
  screens: {
    PatientScreen: 'patient',
    path: '/:id',
  },
};

const linking = {
  prefixes: ['med://'],
  config,
};

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="QrScaner" component={QrScaner} />
        <Stack.Screen name="PatientScreen" component={PatientScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

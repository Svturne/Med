import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import QrScaner from './src/screens/QrScaner';
import PatientScreen from './src/screens/PatientScreen';

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
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QrScaner"
          component={QrScaner}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatientScreen"
          component={PatientScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import QrScaner from './src/screens/QrScaner';
import PatientScreen from './src/screens/PatientScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QrScaner"
          component={QrScaner}
          options={{
            headerTitle: '',
            headerTintColor: 'white',
            headerTransparent: true,
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
        <Stack.Screen
          name="PatientScreen"
          component={PatientScreen}
          options={{
            headerTitle: '',
            headerTintColor: 'white',
            headerTransparent: true,
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

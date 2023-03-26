import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import QrScaner from './src/screens/QrScaner';
import PatientScreen from './src/screens/PatientScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileDoctor from './src/screens/ProfileDoctor';
import CreatePatient from './src/screens/CreatePatient';
import ProfilePatient from './src/screens/ProfilePatient';
import Visites from './src/screens/Visites';
import VisitesDetail from './src/screens/VisitesDetail';

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
        <Stack.Screen name="CreatePatient" component={CreatePatient} />
        <Stack.Screen name="ProfilePatient" component={ProfilePatient} />
        <Stack.Screen name="Visites" component={Visites} />
        <Stack.Screen name="VisitesDetail" component={VisitesDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React, {useEffect} from 'react';
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
import CameraScreen from './src/screens/CameraScreen';
import SplashScreen from './src/screens/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncKeys from './src/constant/AsyncKeys';
import ActionsName from './src/redux/reducers/ActionsName';
import MailPassword from './src/screens/MailPassword';
import CodePassword from './src/screens/CodePassword';

function Navigation() {
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
  const Stack = createStackNavigator();

  const isSplash = useSelector(state => state.AuthReducer.isSplash);
  const isLogin = useSelector(state => state.AuthReducer.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem(AsyncKeys.isLogin)
      .then(value => {
        if (value) {
          dispatch({type: ActionsName.connecte});
        }
      })
      .finally(() => {
        dispatch({type: ActionsName.finishSplash});
      });
  }, []);
  return (
    <NavigationContainer linking={linking}>
      {isSplash ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      ) : isLogin ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} />
          <Stack.Screen name="CreatePatient" component={CreatePatient} />
          <Stack.Screen name="ProfilePatient" component={ProfilePatient} />
          <Stack.Screen name="Visites" component={Visites} />
          <Stack.Screen name="VisitesDetail" component={VisitesDetail} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="QrScaner" component={QrScaner} />
          <Stack.Screen name="MailPassword" component={MailPassword} />
          <Stack.Screen name="CodePassword" component={CodePassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/LoginScreen';
import QrScaner from './src/screens/QrScanerScreen';
import PatientScreen from './src/screens/PatientScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileDoctor from './src/screens/ProfileDoctorScreen';
import CreatePatient from './src/screens/CreatePatientScreen';
import ProfilePatient from './src/screens/ProfilePatientScreen';
import Visites from './src/screens/VisitesScreen';
import VisitesDetail from './src/screens/VisitesDetailScreen';
import CameraScreen from './src/screens/CameraScreen';
import SplashScreen from './src/screens/SplashScreenScreen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncKeys from './src/constant/AsyncKeys';
import ActionsName from './src/redux/reducers/ActionsName';
import MailPassword from './src/screens/MailPassword';
import CodePassword from './src/screens/CodePasswordScreen';
import RestPassword from './src/screens/RestPasswordScreen';
import OfflineScreen from './src/screens/OfflineScreen';
import NetInfo from '@react-native-community/netinfo';
import ProfilePatientScreen from './src/screens/ProfilePatientScreen';
import PatientProfile from './src/screens/PatientProfile';
import PatientVisite from './src/screens/PatientVisite';
import PatientProfileScreen from './src/screens/PatientProfileScreen';
import PatientVisiteDetailScreen from './src/screens/PatientVisiteDetailScreen';

function Navigation() {
  const config = {
    screens: {
      PatientScreen: 'patient',
      path: '/:token',
    },
  };

  const linking = {
    prefixes: ['med://'],
    config,
  };

  const Stack = createStackNavigator();

  const isSplash = useSelector(state => state.AuthReducer.isSplash);
  const isLogin = useSelector(state => state.AuthReducer.isLogin);

  const isConnect = useSelector(state => state.AuthReducer.isConnect);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem(AsyncKeys.accessToken)
      .then(value => {
        if (value) {
          dispatch({type: ActionsName.connecteMed});
        }
      })
      .finally(() => {
        dispatch({type: ActionsName.finishSplash});
      });
  }, []);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch({type: ActionsName.changeStatus, payload: state.isConnected});
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer linking={linking}>
      {isSplash ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      ) : !isConnect ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OfflineScreen" component={OfflineScreen} />
        </Stack.Navigator>
      ) : isLogin == 1 ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileDoctor" component={ProfileDoctor} />
          <Stack.Screen name="CreatePatient" component={CreatePatient} />
          <Stack.Screen name="ProfilePatient" component={ProfilePatient} />
          <Stack.Screen name="Visites" component={Visites} />
          <Stack.Screen name="VisitesDetail" component={VisitesDetail} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="RestPassword" component={RestPassword} />

          <Stack.Screen
            name="ProfilePatientScreen"
            component={ProfilePatientScreen}
          />
          <Stack.Screen name="PatientScreen" component={PatientScreen} />
        </Stack.Navigator>
      ) : isLogin == 0 ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="QrScaner" component={QrScaner} />
          <Stack.Screen name="MailPassword" component={MailPassword} />
          <Stack.Screen name="CodePassword" component={CodePassword} />
          <Stack.Screen name="RestPassword" component={RestPassword} />
          <Stack.Screen name="PatientScreen" component={PatientScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="PatientProfile" component={PatientProfile} />
          <Stack.Screen name="PatientVisite" component={PatientVisite} />
          <Stack.Screen
            name="PatientProfileScreen"
            component={PatientProfileScreen}
          />
          <Stack.Screen
            name="PatientVisiteDetailScreen"
            component={PatientVisiteDetailScreen}
          />
          <Stack.Screen name="PatientScreen" component={PatientScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;

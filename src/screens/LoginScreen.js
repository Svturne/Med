import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import doctorPic from '../../assets/images/doctor.png';
import colors from '../../assets/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import fonts from '../../assets/fonts/fonts';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {showError} from '../utils/messages';
import {useDispatch} from 'react-redux';
import ActionsName from '../redux/reducers/ActionsName';
import {axiosInstance} from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncKeys from '../constant/AsyncKeys';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setsignInLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = useCallback(() => {
    if (email == '' || password == '') {
      showError('Remplissez tous les champs requis');
      return;
    }

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (regEmail.test(email) == false) {
      showError("Mauvais format d'e-mail");
      return;
    }

    setsignInLoading(true);

    axiosInstance
      .post('/medecin/login', {
        email,
        password,
      })
      .then(response => {
        console.log(response.data);
        try {
          AsyncStorage.setItem(
            AsyncKeys.accessToken,
            response.data.accessToken,
          );
          AsyncStorage.setItem(
            AsyncKeys.refreshToken,
            response.data.refreshToken,
          );
        } catch (e) {
          console.log(e);
        }
        dispatch({type: ActionsName.connecte});
      })
      .catch(error => {
        showError(error.response.data.message);
        console.log('erreur in login');
        console.log(error);
      })
      .finally(() => {
        setsignInLoading(false);
      });
  }, [email, password]);

  const handleQRPress = () => {
    navigation.navigate('QrScaner');
  };

  const resetPassword = () => {
    navigation.navigate('MailPassword');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image source={doctorPic} style={styles.image} />
        <View style={{maxWidth: 500, width: '100%', alignSelf: 'center'}}>
          <View style={styles.container}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: fonts.bold,
                fontSize: 24,
                color: colors.white,
              }}>
              Hello Doctor!
            </Text>

            <CustomInput
              nameOfInpute="Adresse email"
              value={email}
              onChangeText={setEmail}
              secure={false}
              keyboardType="email-address"
            />
            <CustomInput
              nameOfInpute="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secure={true}
            />
            <TouchableOpacity onPress={resetPassword}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 12,
                  color: colors.white,
                }}>
                Mot de passe oublié?
              </Text>
            </TouchableOpacity>
            <CustomButton
              text="Se connecter"
              color="lightgreen"
              isLoading={signInLoading}
              func={signIn}
            />
            <View style={styles.icon}>
              <Text>
                Vous êtes un patient?{' '}
                <Text style={{color: 'lightgreen'}}>
                  Scannez votre code QR ->{' '}
                </Text>
              </Text>
              <Icon
                name="qrcode-scan"
                type="material-community"
                color={colors.white}
                size={45}
                onPress={handleQRPress}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.blue,
  },
  image: {
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: colors.blue,
    flex: 1,
    padding: 16,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

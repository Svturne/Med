import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/colors';
import ActionsName from '../redux/reducers/ActionsName';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {axiosPrivate, axiosRefresh} from '../config/axios';
import {showError, showSuccess} from '../utils/messages';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncKeys from '../constant/AsyncKeys';

const ProfileDoctor = () => {
  const iconsize = 25;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleEdite, setVisibleEdit] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const name = useSelector(state => state.MedecinReducer.name);
  const profilePicture = useSelector(
    state => state.MedecinReducer.profilePicture,
  );

  const disconnect = async () => {
    await axiosRefresh.post('/medecin/logout');

    dispatch({type: ActionsName.resetMedecinData});
    dispatch({type: ActionsName.disconnect});
    AsyncStorage.removeItem(AsyncKeys.accessToken);
    AsyncStorage.removeItem(AsyncKeys.refreshToken);
  };

  const passwordPressed = () => {
    setVisibleEdit(true);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
  };

  const handleEdit = () => {
    if (oldPass === '' || newPass === '' || confirmPass === '') {
      return showError('Remplissez tous les champs requis');
    }
    if (newPass != confirmPass) {
      showError('Les deux mots de passe ne correspondant pas');
    } else {
      var regularMdp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (regularMdp.test(newPass) == false) {
        showError('Mauvais format de mot de passe');
      } else {
        axiosPrivate
          .post('/medecin/newpassword', {
            password: oldPass,
            newPassword: newPass,
          })
          .then(response => {
            console.log(response.data);
            disconnect();
          })
          .catch(error => {
            console.log('erreur in update password');
            console.log(error);
          });
      }
    }
  };

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const name = response.assets[0].fileName;
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;

        const formData = new FormData();
        formData.append('picture', {
          name,
          uri,
          type,
        });

        axiosPrivate
          .patch('/medecin/picture', formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })

          .then(response => {
            axiosPrivate.get('/medecin').then(response => {
              dispatch({
                type: ActionsName.setMedecinData,
                payload: {
                  id: response.data._id,
                  name: response.data.name,
                  email: response.data.email,
                  profilePicture: response.data.profilePicture,
                },
              });
            });

            setSelectedImage(uri);
            showSuccess('Votre photo a été upload avec succès.');
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      {profilePicture && (
        <Image
          source={{
            uri: profilePicture,
          }}
          style={styles.profilePicture}
        />
      )}
      <Text style={styles.username}>{name}</Text>
      <TouchableOpacity style={styles.button} onPress={chooseImage}>
        <Icon
          name="face-man-profile"
          type="material-community"
          color={colors.black}
          size={iconsize}
        />
        <Text style={styles.buttonText}>Modifier la photo de profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={passwordPressed}>
        <Icon
          name="form-textbox-password"
          type="material-community"
          color={colors.black}
          size={iconsize}
        />
        <Text style={styles.buttonText}>Modifier votre mot de passe</Text>
      </TouchableOpacity>
      <Dialog.Container visible={visibleEdite}>
        <Dialog.Title>Modification de votre mot de passe</Dialog.Title>

        <TextInput
          style={styles.editPass}
          onChangeText={setOldPass}
          placeholder={'Ancien mot de passe'}
          secureTextEntry={true}></TextInput>

        <TextInput
          style={styles.editPass}
          onChangeText={setNewPass}
          placeholder={'Nouveau mot de passe'}
          secureTextEntry={true}></TextInput>

        <TextInput
          style={styles.editPass}
          onChangeText={setConfirmPass}
          placeholder={'Confirmer votre mot de passe'}
          secureTextEntry={true}></TextInput>

        <Dialog.Button
          label="Annuler"
          color={colors.grey}
          onPress={handleCancelEdit}
        />
        <Dialog.Button
          label="Valider"
          bold={true}
          color={colors.blue}
          onPress={handleEdit}
        />
      </Dialog.Container>
      <TouchableOpacity style={styles.button} onPress={disconnect}>
        <Icon
          name="logout"
          type="material-community"
          color={colors.black}
          size={iconsize}
        />
        <Text style={[styles.buttonText, {color: colors.red}]}>
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,

    backgroundColor: colors.blue,
    justifyContent: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: colors.grey,
  },
  username: {
    color: colors.white,
    fontSize: 25,
    marginBottom: 50,
    fontFamily: fonts.bold,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: colors.whiteAlpha,
    borderRadius: 16,
    flexDirection: 'row',
    width: 300,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.regular,
    marginLeft: 20,
  },
  editPass: {
    backgroundColor: colors.lightblue,
    color: colors.white,
    fontFamily: fonts.bold,
    borderRadius: 16,
    paddingLeft: 16,
    marginVertical: 5,
  },
});

export default ProfileDoctor;

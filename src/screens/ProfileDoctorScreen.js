import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import colors from '../../assets/colors';
import ActionsName from '../redux/reducers/ActionsName';
import {useDispatch} from 'react-redux';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {axiosPrivate} from '../config/axios';
import {showSuccess} from '../utils/messages';

const ProfileDoctor = () => {
  const iconsize = 25;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const disconnect = () => {
    dispatch({type: ActionsName.disconnect});
  };

  const passwordPressed = () => {
    navigation.navigate('RestPassword');
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
        console.log(uri);
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
            console.log(response.data.user.profilePicture);
            setSelectedImage(uri); //TODO: Display picture
            showSuccess('Votre photo a été upload avec succès.');
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    });
  };
  // TODO: add real name
  return (
    <View style={styles.container}>
      <Image
        source={
          selectedImage
            ? {uri: selectedImage}
            : {
                uri: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
              }
        }
        style={styles.profilePicture}
      />

      <Text style={styles.username}>Mehdi Doe</Text>
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
    borderColor: 'grey',
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
});

export default ProfileDoctor;

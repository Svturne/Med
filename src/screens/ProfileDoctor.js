import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import ActionsName from '../redux/reducers/ActionsName';
import {useDispatch} from 'react-redux';

const ProfileDoctor = () => {
  const dispatch = useDispatch();

  const disconnect = () => {
    dispatch({type: ActionsName.disconnect});
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg',
        }}
        style={styles.profilePicture}
      />

      <Text style={styles.username}>Mehdi Doe</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier la photo de profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Modifier votre mot de passe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={disconnect}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.blue,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'grey',
  },
  username: {
    color: 'white',
    fontSize: 25,
    marginTop: 20,
    fontFamily: fonts.bold,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.regular,
  },
});

export default ProfileDoctor;

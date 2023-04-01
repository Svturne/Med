import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const ScanScreen = () => {
  const onSuccess = e => {
    console.log(e.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textT}>Bienvenue</Text>
      <View style={styles.cameraContainer}>
        <QRCodeScanner
          cameraStyle={styles.camera}
          onRead={onSuccess}
          showMarker={true}
          customMarker={<View style={styles.marker}></View>}
        />
      </View>
      <Text style={styles.text}>Scannez votre code QR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  textT: {
    color: 'white',
    position: 'absolute',
    fontSize: 30,
    fontFamily: fonts.semiBold,
    top: 45,
  },
  text: {
    color: 'white',
    fontFamily: fonts.regular,
    bottom: 70,
  },
  cameraContainer: {
    marginTop: 'auto',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: '90%',
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.lightblue,
    borderWidth: 2,
    borderRadius: 10,
    width: 250,
    height: 250,
  },
});

export default ScanScreen;

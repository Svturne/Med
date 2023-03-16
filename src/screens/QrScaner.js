import React, {Component} from 'react';

import {StyleSheet, Linking, View, Text} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const ScanScreen = () => {
  const onSuccess = e => {
    console.log(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onRead={onSuccess} />
      <Text style={styles.textT}>Côté patient</Text>
      <Text style={styles.text}>Scannez votre code QR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.lightblue,
  },
  textT: {
    color: 'white',
    position: 'absolute',
    fontSize: 30,
    fontFamily: fonts.semiBold,
    top: 60,
  },
  text: {
    color: 'white',
    position: 'relative',
    fontFamily: fonts.regular,
    bottom: 70,
  },
});

export default ScanScreen;

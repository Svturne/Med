import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../assets/colors';
import {Icon} from '@rneui/themed';
import fonts from '../../assets/fonts/fonts';

const OfflineScreen = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="cloud-offline-outline"
        type="ionicon"
        color={colors.white}
        size={100}
      />
      <Text style={styles.text}>Vous n'avez plus accéer à internet</Text>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: 20,
  },
});

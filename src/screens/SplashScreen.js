import {StyleSheet, Text, View, Image, Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import colors from '../../assets/colors';
import fonts from '../../assets/fonts/fonts';

const SplashScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [spinValue, opacityValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.icon, {transform: [{rotate: spin}]}]}
        source={require('../../assets/images/rounded.png')}
      />
      <Animated.Text style={[styles.title, {opacity: opacityValue}]}>
        Med
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  logo: {
    width: 100,
    height: 100,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

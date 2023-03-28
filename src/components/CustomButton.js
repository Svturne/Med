import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.func}
      style={[{backgroundColor: props.color}, styles.container]}
      disabled={props.isLoading}>
      {props.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 16,
    marginVertical: 30,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
});

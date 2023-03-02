import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = props => {
  return (
    <View style={[{backgroundColor: props.color}, styles.container]}>
      <TouchableOpacity>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    marginVertical: 30,
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
});

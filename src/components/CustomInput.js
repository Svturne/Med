import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

function CustomInput(props) {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder={props.nameOfInpute}
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secure}
        />
      </View>
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,

    borderRadius: 10,
    padding: 5,
    marginVertical: 16,
  },
});

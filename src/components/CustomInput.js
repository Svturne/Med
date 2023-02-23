import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

function CustomInput(props) {
  return (
    <View>
      <Text>{props.nameOfInpute}</Text>
      <View style={{backgroundColor: colors.green, justifyContent: 'center'}}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secure}
          style={{padding: 10}}
        />
      </View>
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({});

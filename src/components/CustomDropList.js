import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

const CustomDropList = props => {
  return (
    <View>
      <SelectList
        setSelected={props.onSelect}
        data={props.data}
        save="value"
        placeholder={props.title}
        search={false}
        boxStyles={{
          backgroundColor: colors.white,
          textColor: colors.black,
          borderRadius: 10,
          borderColor: colors.white,
          marginVertical: 16,
        }}
        dropdownStyles={{backgroundColor: colors.lightgreen}}
        dropdownTextStyles={{color: colors.black}}
        fontFamily={fonts.regular}
        inputStyles={{color: colors.black, padding: 5}}
      />
    </View>
  );
};

export default CustomDropList;

const styles = StyleSheet.create({});

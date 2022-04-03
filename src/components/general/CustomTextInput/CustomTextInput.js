import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import Colors from '../../../constants/colors';

const CustomTextInput = props => {
  return (
    <View>
      <TextInput
        style={[styles.textInputStyle, props.customStyle]}
        {...props}
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: Colors.whiteSmoke,
    color: Colors.dark,
    padding: 10,
  },
});

export {CustomTextInput};

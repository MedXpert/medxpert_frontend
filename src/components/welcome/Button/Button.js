import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../general/CustomText';
import Colors from '../../../constants/colors';

const Button = ({title, onPress, backgroundVisible = true, customStyle}) => {
  const buttonDynamicStyle = visibility => {
    if (visibility) {
      // Button for visible background
      const styles = StyleSheet.create({
        background: {
          backgroundColor: Colors.primary,
        },
      });
      return styles;
    } else {
      // Button Style for invisible background
      const styles = StyleSheet.create({
        background: {
          width: 100,
          borderRadius: 0,
        },
      });
      return styles;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        buttonDynamicStyle(backgroundVisible).background,
        customStyle ? customStyle : null,
      ]} // Call ButtonDynamicStyle function which returns style according to the value of backgroundVisible.
      activeOpacity={0.7}>
      <CustomText content={title} fontSize={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    minHeight: 60,
    width: 150,
  },
});

export {Button};

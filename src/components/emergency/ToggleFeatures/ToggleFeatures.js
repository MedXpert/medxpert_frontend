import {View, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';

import colors from '../../../constants/colors';
import {CustomText} from '../../general/CustomText';

const ToggleFeatures = ({
  largeText,
  smallText = '',
  borderRadius = {borderRadius: 30},
  onToggleChange,
  toggleFeature,
  disabled = false,
  largeTextFontColor = colors.black,
  smallTextFontColor = colors.gray,
}) => {
  return (
    <View style={[styles.toggleContainer, borderRadius]}>
      <View style={styles.text}>
        <CustomText
          content={largeText}
          fontSize={18}
          fontColor={largeTextFontColor}
        />
        <CustomText
          content={smallText}
          fontSize={12}
          fontColor={smallTextFontColor}
        />
      </View>
      <View style={styles.toggle}>
        <Switch
          disabled={disabled}
          trackColor={{false: colors.lightGray, true: colors.primary}}
          thumbColor={toggleFeature ? colors.white : colors.gray}
          onValueChange={onToggleChange}
          value={toggleFeature}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors.white,
    elevation: 1,
    marginTop: 20,
  },
  text: {
    width: '80%',
  },
  toggle: {},
});

export {ToggleFeatures};

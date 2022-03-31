import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';
import {CustomText} from '../CustomText';
import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const CustomButton = ({
  title = isRequired(),
  onPress,
  width = 100,
  height = 50,
  customStyle,
  icon,
}) => {
  // Changes the justifyContent property of the Button depending on whether there is an icon in the button or not
  const buttonIconStyle = () => {
    return icon ? {justifyContent: 'space-evenly'} : null;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {width: width, height: height},
        customStyle,
        buttonIconStyle(),
      ]}>
      <View style={styles.buttonIconContainer}>{icon}</View>
      <CustomText content={title} fontSize={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  // buttonIconContainer: {backgroundColor: 'red'},
});
export {CustomButton};

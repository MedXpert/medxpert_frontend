import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';
import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const index = ({
  content = isRequired(),
  fontSize = 14,
  fontColor = Colors.black,
  fontFamily = 'Poppins',
}) => {
  const buttonDynamicStyles = {
    fontSize: fontSize,
    color: fontColor,
    fontFamily: fontFamily,
  };

  return <Text style={[buttonDynamicStyles]}>{content}</Text>;
};

// const styles = StyleSheet.create({
//   text: {},
// });

export default index;

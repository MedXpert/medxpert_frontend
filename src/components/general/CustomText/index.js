import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';

const index = ({
  content,
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

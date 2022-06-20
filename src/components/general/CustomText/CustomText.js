import {View, Text, StyleSheet} from "react-native";
import React from "react";

import Colors from "../../../constants/colors";
import {isRequired} from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";

const CustomText = ({
  content = isRequired(),
  fontSize = 14,
  fontColor = Colors.black,
  fontWeight,
  fontFamily = "Poppins",
  customStyles = {},
}) => {
  const buttonDynamicStyles = {
    fontSize: fontSize,
    color: fontColor,
    fontFamily: fontFamily,
    fontWeight: fontWeight,
  };

  return <Text style={[buttonDynamicStyles, customStyles]}>{content}</Text>;
};

// const styles = StyleSheet.create({
//   text: {},
// });

export {CustomText};

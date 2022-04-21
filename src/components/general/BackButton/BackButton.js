import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';

const BackButton = ({onPress, width = 35, height = 35, backgroundColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        {width: width, height: height, backgroundColor: backgroundColor},
      ]}
      onPress={onPress}>
      <IonIcons
        name="chevron-back"
        size={30}
        color={colors.white}
        style={[
          styles.icon,
          {color: backgroundColor ? colors.white : colors.primary},
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 50,

    justifyContent: 'center',
  },
  icon: {alignSelf: 'center'},
});

export {BackButton};

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/colors';

const BackButton = ({onPress, backgroundColor, size = 30}) => {
  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        {width: size + 5, height: size + 5, backgroundColor: backgroundColor},
      ]}
      onPress={onPress}>
      <IonIcons
        name="arrow-back"
        size={size}
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
    alignItems: 'center',
  },
  icon: {alignSelf: 'center'},
});

export {BackButton};

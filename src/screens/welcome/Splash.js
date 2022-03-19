import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../constants/colors';
import SvgLogo from '../../assets/svg/logo/logo_blue_background.svg';

const Splash = () => {
  return (
    <View style={styles.container}>
      <SvgLogo width={200} height={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Splash;

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

import {SearchBar} from '../../general/SearchBar';
import LogoSvg from '../../../assets/svg/logo/logo_white_background.svg';

const MedXpertSearchBar = () => {
  return (
    <View style={styles.container}>
      <LogoSvg width={20} height={20} />
      <View>
        <SearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export {MedXpertSearchBar};

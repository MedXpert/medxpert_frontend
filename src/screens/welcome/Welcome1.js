import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import PageIndicator from '../../components/welcome/PageIndicator';
const Welcome1 = () => {
  return (
    <View style={{margin: 10}}>
      <PageIndicator selectedPage={1} />
    </View>
  );
};

export default Welcome1;

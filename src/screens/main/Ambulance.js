import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';

const Ambulance = () => {
  return (
    <View style={styles.container}>
      <CustomText content={'Ambulance'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Ambulance;

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';
import CustomText from '../../../components/general/CustomText';

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <CustomText content={' OR '} />
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: 150,
    height: 1,
    backgroundColor: Colors.dark,
  },
});

export default index;

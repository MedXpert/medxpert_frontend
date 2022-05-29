import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';

const AvailableDates = () => {
  return (
    <View style={styles.container}>
      <CustomText content={'Available Dates'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.secondary, padding: 10},
});

export default AvailableDates;

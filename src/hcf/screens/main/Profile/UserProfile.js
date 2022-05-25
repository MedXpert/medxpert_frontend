import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../../../../constants/colors';

const UserProfile = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.secondary},
});

export default UserProfile;

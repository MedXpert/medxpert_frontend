import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';

const Profile = () => {
  return (
    <View style={styles.container}>
      <CustomText content={'Profile'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Profile;

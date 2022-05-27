import {View, StyleSheet} from 'react-native';
import React from 'react';

import {BackButton} from '../../../../components/general/BackButton';
import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import {useNavigation} from '@react-navigation/native';

const EditHCF = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View>
          <BackButton onPress={navigation.goBack()} />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    marginTop: 20,
  },
});

export default EditHCF;

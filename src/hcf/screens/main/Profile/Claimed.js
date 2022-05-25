import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import {CustomButton} from '../../../../components/general/CustomButton';
import RenderHCF from '../../../components/profile/RenderHCF';

const Claimed = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText content={'Claimed'} fontSize={20} />
        <CustomButton
          backgroundColor={colors.lightGray}
          fontSize={15}
          width="auto"
          height="auto"
          customStyle={{paddingHorizontal: 10, paddingVertical: 5}}
          onPress={() => {}}
          title={'Pending claims'}
        />
      </View>

      <ScrollView style={styles.hcfSection}>
        <RenderHCF />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 40,
    paddingTop: 25,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hcfSection: {
    marginTop: 40,
  },
});

export default Claimed;

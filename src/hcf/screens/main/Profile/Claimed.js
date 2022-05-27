import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import {CustomButton} from '../../../../components/general/CustomButton';
import {RenderHCF} from '../../../components/profile/RenderHCF';

const Claimed = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header */}
        <CustomText content={'Claimed'} fontSize={18} />
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
        {/* Render Health Care Facility */}
        {hcfs.map(item => (
          <RenderHCF
            navigation={navigation}
            hcfName={item.name}
            key={item.name}
          />
        ))}
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
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hcfSection: {
    marginTop: 30,
  },
});

const hcfs = [
  {name: 'hcf 0'},
  {name: 'hcf 1'},
  {name: 'hcf 2'},
  {name: 'hcf 3'},
];

export default Claimed;

import {View, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import {BackButton} from '../../../../components/general/BackButton';
import IonIcons from 'react-native-vector-icons/Ionicons';

const ClaimRequest = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonPageName}>
        <View style={styles.backButton}>
          {/* <IonIcons name="arrow-back" size={30} color={colors.primary} /> */}
          <BackButton size={30} />
        </View>
        <CustomText content={'Claim Request'} fontSize={18} fontWeight="600" />
      </View>
      <View style={styles.innerContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 10,
    paddingTop: 20,
  },
  innerContainer: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  backButtonPageName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
});

export default ClaimRequest;

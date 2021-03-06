import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

import colors from '../../../../constants/colors';
import { CustomText } from '../../../../components/general/CustomText';
import { CustomButton } from '../../../../components/general/CustomButton';
import { RenderHCF } from '../../../components/profile/RenderHCF';
import { useClaimedRequest, usePendingRequest } from "../../../../hooks/claimRequest";
import Spinner from 'react-native-spinkit';

const Claimed = ({ navigation }) => {

  const pendingRequests = usePendingRequest();
  const claimedHCF = useClaimedRequest();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        {/* Header */}
        <CustomText content={'Claimed'} fontSize={18} />
      </View>

      {claimedHCF.isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner
            isVisible
            color={colors.primary}
            size={70}
            type="ThreeBounce"
            style={styles.appointmentsSpinner}
          />
        </View>
      )}
      {claimedHCF.isSuccess && (
        <ScrollView style={styles.hcfSection}>
          {claimedHCF.data.data.healthFacilities.map(item => (
            <RenderHCF
              navigation={navigation}
              hcfName={item.name}
              key={item.id}
              address={item.address}
              rating={item.total_ratings}
              images={item.images}
              type={item.facility_type}
              healthFacilityId={item.id}
            />
          ))}
        </ScrollView>
      )}
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
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  hcfSection: {
    marginTop: 10,
  },
  pendingButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 2,
  },
});

export default Claimed;

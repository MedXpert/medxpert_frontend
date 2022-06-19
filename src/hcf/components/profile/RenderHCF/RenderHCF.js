import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import IconEntypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '../../../../components/general/CustomButton';
import {IconButton} from 'react-native-paper';

const RenderHCF = ({
  navigation,
  hcfName,
  address,
  rating,
  type,
  travelTime,
}) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* HCF name */}
      <CustomText
        content={hcfName}
        fontWeight="900"
        fontSize={20}
        fontColor={colors.primary}
      />
      {/* Location and rating section  */}
      <View style={styles.locationAndRating}>
        {/* Location */}
        <View style={styles.location}>
          <IconEntypo name="location-pin" size={20} color={colors.primary} />
          <CustomText content={'Addis Ababa near to the bank'} />
        </View>
      </View>
      {/* Rating */}
      <View>
        <View style={styles.stars}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            starSize={25}
            fullStarColor={colors.golden}
          />
          <CustomText content={rating} />
        </View>
      </View>
      {/* Type Travel Time and Edit  */}
      <View style={styles.typeTravelEdit}>
        <View style={styles.typeTravel}>
          {/* Type */}
          <View style={styles.type}>
            <CustomText content={'TYPE'} fontWeight="900" fontSize={16} />
            <CustomText content={type} />
          </View>
        </View>
        {/* Edit button */}
        <View style={styles.editButtonContainer}>
          <IconButton
            icon={'square-edit-outline'}
            size={30}
            color={colors.primary}
            onPress={() => {
              navigation.push('EditHCF');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 'auto',
    width: '100%',
    backgroundColor: colors.secondary,
    padding: 10,
    elevation: 1,
    marginVertical: 10,
  },
  location: {flexDirection: 'row', marginVertical: 5},
  stars: {
    flexDirection: 'row',
    width: 170,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  locationAndRating: {
    marginTop: 15,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imageStyle: {
    width: 100,
    height: 80,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  typeTravelEdit: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    marginRight: 20,
  },
  typeTravel: {
    flexDirection: 'row',
  },
});

export {RenderHCF};

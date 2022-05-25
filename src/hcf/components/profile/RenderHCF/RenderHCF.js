import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import IconEntypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';

const RenderHCF = ({hcfName, address, rating, images, type, travelTime}) => {
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
            rating={3.5}
            starSize={25}
            fullStarColor={colors.golden}
          />
          <CustomText content={4.5} />
        </View>
      </View>
      {/* Images section  */}
      <View style={styles.imagesContainer}>
        <Image
          source={{uri: 'https://mapio.net/images-p/17493410.jpg'}}
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.imageStyle}
          loadingIndicatorSource={require('../../../../assets/img/default_load_image.png')}
        />
        <Image
          source={{uri: 'https://mapio.net/images-p/3638281.jpg'}}
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.imageStyle}
          loadingIndicatorSource={require('../../../../assets/img/default_load_image.png')}
        />
        <Image
          source={{uri: 'https://mapio.net/images-p/17493410.jpg'}}
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.imageStyle}
          loadingIndicatorSource={require('../../../../assets/img/default_load_image.png')}
        />
      </View>
      {/* Type Travel Time and Edit  */}
      <View style={styles.typeTravelEdit}>
        <View style={styles.typeTravel}>
          {/* Type */}
          <View style={styles.type}>
            <CustomText content={'TYPE'} fontWeight="900" fontSize={16} />
            <CustomText content={'Clinic'} />
          </View>
          {/* Travel time */}
          <View style={styles.travelTime}>
            <CustomText
              content={'TRAVEL TIME'}
              fontWeight="900"
              fontSize={16}
            />
            <CustomText content={'5 mins'} />
          </View>
        </View>
        {/* Edit button */}
        <View style={styles.editButton}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.editButtonTouchable}>
            <CustomText
              content={'Edit'}
              fontColor={colors.black}
              fontSize={16}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    backgroundColor: colors.secondary,
    padding: 10,
    elevation: 2,
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
  editButtonTouchable: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export {RenderHCF};

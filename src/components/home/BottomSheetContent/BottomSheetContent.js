import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import ContentLoader from 'react-native-easy-content-loader';

import StarRating from 'react-native-star-rating';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';

import {CustomText} from '../../general/CustomText';
import Colors from '../../../constants/colors';
import shadow from '../../../constants/shadow';
import colors from '../../../constants/colors';
import {useHealthCareFacilities} from '../../../hooks/healthCareFacility';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const BottomSheetContent = ({navigation}) => {
  const {data, isSuccess, isError, isLoading, status} =
    useHealthCareFacilities();

  // Render Health Facilities function
  const renderHealthFacilities = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Details', {id: item.id});
        }}>
        <View style={styles.renderContainer}>
          {/* Card Image */}
          <View style={styles.renderContainerImage}>
            <Image source={item.images[0]} style={styles.cardImage} />
          </View>

          {/* Card Content */}
          <View style={styles.renderContainerContent}>
            {/* Health facility name */}
            <CustomText
              fontColor={colors.primary}
              fontSize={16}
              content={item.name}
              customStyles={{fontWeight: '900'}}
            />

            {/* Address  */}
            <View style={styles.address}>
              <IconEntypo
                name="location-pin"
                size={20}
                color={Colors.primary}
              />
              <CustomText
                customStyles={styles.marginLeft}
                content={item.address}
                fontSize={11}
              />
            </View>

            {/* Type, Distance, Rating */}
            <View style={styles.typeDistanceRating}>
              <View style={styles.typeDistanceRatingInner}>
                <CustomText
                  content={item.type}
                  fontSize={12}
                  fontColor={Colors.gray}
                />
                <IconEntypo name="dot-single" size={18} color={colors.gray} />
                <IconIon
                  name="car-outline"
                  style={{marginRight: 5}}
                  size={15}
                  color={colors.gray}
                />
                <CustomText
                  content={item.travelTime}
                  fontSize={11}
                  color={colors.gray}
                />
              </View>

              {/* Rating */}
              <View style={styles.ratingInner}>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={1}
                  starSize={13}
                  fullStarColor={Colors.golden}
                />
                <CustomText
                  content={item.averageRating}
                  customStyles={styles.textStyle}
                  fontColor={colors.gray}
                  fontSize={10}
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <CustomText
        content={'Nearby Health Facilities'}
        customStyles={{fontWeight: '900', marginLeft: 5, marginBottom: 10}}
        fontSize={20}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Spinner
            isVisible
            color={colors.primary}
            size={50}
            type="ThreeBounce"
            style={styles.appointmentsSpinner}
          />
        </View>
      )}
      {isSuccess && (
        <FlatList
          data={data}
          horizontal
          renderItem={renderHealthFacilities}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    marginTop: 5,
  },
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  address: {flexDirection: 'row', marginTop: 5, marginLeft: -3},
  renderContainer: {
    backgroundColor: colors.secondary,
    minHeight: 250,
    width: dimensionWidth / 2 - 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    elevation: 5,
  },
  renderContainerImage: {
    flex: 1.5,
  },
  renderContainerContent: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    marginLeft: 5,
  },
  typeDistanceRating: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  typeDistanceRatingInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 12,
    flex: 1,
  },
  ratingInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {BottomSheetContent};

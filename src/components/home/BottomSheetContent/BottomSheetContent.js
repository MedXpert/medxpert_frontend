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

import StarRating from 'react-native-star-rating';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIon from 'react-native-vector-icons/Ionicons';

import {CustomText} from '../../general/CustomText';
import Colors from '../../../constants/colors';
import shadow from '../../../constants/shadow';
import colors from '../../../constants/colors';
import {color, log} from 'react-native-reanimated';
import {Title} from 'react-native-paper';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const BottomSheetContent = ({navigation}) => {
  const healthFacilities = [
    {
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      id: 1,
      address: '6 kilo , Addis Ababa, Ethiopia',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: 4.5,
      type: 'clinic',
      availability: 'Open 24 hours',
    },
    {
      name: 'Zewditu Hospital',
      images: [{id: 1, uri: 'https://mapio.net/images-p/2347273.jpg'}],
      id: 7,
      address: '6 kilo , Addis Ababa, Ethiopia',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '30 min',
      rating: 4,
      type: 'Hospital',
      availability: 'Open 24 hours',
    },
    {
      name: 'Tikur Anbesa Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/17493410.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/3638281.jpg'},
      ],
      id: 2,
      address: 'Senga tera',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: 'Senga tera Street',
      travelTime: '1 hr',
      rating: 4.8,
      type: 'Hospital',
      availability: 'Open 24 hours',
    },
    {
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      id: 6,
      address: '6 kilo , Addis Ababa, Ethiopia',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: 4.5,
      type: 'clinic',
      availability: 'Open 24 hours',
    },
  ];

  const findById = id => {
    let hf = healthFacilities.find(hospital => hospital.id === id);
    return hf;
  };

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
              content={item.name}
              customStyles={{fontWeight: '900'}}
            />

            {/* Address  */}
            <View style={styles.location}>
              <IconEntypo name="location-pin" size={18} color={Colors.black} />
              <CustomText
                customStyles={styles.marginLeft}
                content={item.address}
                fontSize={10}
              />
            </View>

            {/* Type, Distance, Rating */}
            <View style={styles.typeDistanceRating}>
              <View style={styles.typeDistanceRatingInner}>
                <CustomText content={item.type} fontColor={Colors.gray} />
                <IconEntypo name="dot-single" size={20} color={colors.gray} />
                <IconIon name="car-outline" size={20} color={colors.gray} />
              </View>

              {/* Rating */}
              <View style={styles.typeDistanceRatingInner}>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={1}
                  starSize={15}
                  fullStarColor={Colors.golden}
                />
                <CustomText
                  content={item.rating}
                  customStyles={styles.textStyle}
                  fontColor={colors.gray}
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
      <FlatList
        data={healthFacilities}
        horizontal
        renderItem={renderHealthFacilities}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {width: '100%', height: '100%'},
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    marginTop: 5,
  },
  renderContainer: {
    backgroundColor: colors.secondary,
    height: 250,
    width: dimensionWidth / 2 - 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    ...shadow,
  },
  renderContainerImage: {
    flex: 2,
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

    justifyContent: 'space-between',
  },
  typeDistanceRatingInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {BottomSheetContent};

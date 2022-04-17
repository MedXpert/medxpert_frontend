import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

import {CustomText} from '../../general/CustomText';
import Colors from '../../../constants/colors';
import shadow from '../../../constants/shadow';
import colors from '../../../constants/colors';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const BottomSheetContent = () => {
  const healthFacilities = [
    {
      id: 1,
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: '4.5',
      type: 'clinic',
      availability: 'Open 24 hours',
    },
    {
      id: 2,
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: '4.5',
      type: 'clinic',
      availability: 'Open 24 hours',
    },
    {
      id: 6,
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: '4.5',
      type: 'clinic',
      availability: 'Open 24 hours',
    },
    {
      id: 3,
      name: 'Yekatit 12 Hospital',
      images: [
        {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
        {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
        {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
        {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      street: '123 Main Street',
      travelTime: '5 min',
      rating: '4.5',
      type: 'clinic',
      availability: 'Open 24 hours',
    },
  ];

  const renderHealthFacilities = ({healthFacility}) => {
    console.log(healthFacility);
  };
  // const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <View style={styles.contentContainer}>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  renderContainer: {
    backgroundColor: colors.secondary,
    height: 200,
    width: dimensionWidth / 2 - 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    ...shadow,
  },
});

export {BottomSheetContent};

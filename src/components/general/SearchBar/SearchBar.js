import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../constants/colors';
import { CustomTextInput } from '../../general/CustomTextInput';
import LogoSvg from '../../../assets/svg/logo/logo blue no background.svg';
import { CustomText } from '../CustomText';
import { useSearchHealthCareFacility } from "../../../hooks/healthCareFacility";
import { useLoggedInUser } from "../../../hooks/authentication";
import { getDistance } from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons'
const SearchBar = ({
  containerWidth,
  elevation,
  marginHorizontal = 0,
  fontSize,
  navigation,
  currentLocation
}) => {
  const [textValue, setTextValue] = useState('');
  const search = useSearchHealthCareFacility();
  // Calls the fetchData function and searches for the key given as a parameter

  const searchPosts = async searchKey => {

    if (searchKey.length > 0) {
      search.mutate(searchKey);
    }
  };

  const getGPSFromString = (coordinate) => {
    return coordinate.substring(17, coordinate.length - 1).split(' ').map((item) => parseFloat(item));
  }

  const getDistanceFromGPS = (coordinateString, withString = false) => {
    const coordinate = getGPSFromString(coordinateString);
    const current = currentLocation.split(',')
    const distance = getDistance(
      { latitude: current[0], longitude: current[1] },
      { latitude: coordinate[0], longitude: coordinate[1] },
    );

    return withString ? distance : distance > 1000 ? `${(distance / 1000).toFixed(2)} km` : `${distance} m`;
  }

  const clearSearch = () => {
    setSearchClicked(false);
    setTextValue(' ');
  }


  const renderItem = ({ item }) => {

    return (
      <Pressable key={item.id} onPress={() => navigation.navigate('Details', { id: item.id, travelDistance: getDistanceFromGPS(item.GPSCoordinates, true) })} >
        <View style={styles.item}>
          <CustomText content={item.name} />
        </View>
      </Pressable>
    );
  };

  const listItems = () => {
    return (
      <FlatList
        data={search.data.data.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  };
  const loadingOrResults = () => {
    return search.isLoading ? (
      <View style={styles.centerNoMatch}>
        <CustomText content={'Searching please wait...'} />
      </View>
    ) : search.isSuccess && search.data && search?.data.data.data.length !== 0 ? (
      listItems()
    ) : search.isSuccess && search.data && search?.data.data.data.length === 0 ? (
      <View style={styles.centerNoMatch}>
        <CustomText content={'No match found.'} />
      </View>
    ) : null;
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            width: Dimensions.get('window').width - marginHorizontal,
          },
        ]}>
        <View style={styles.logoContainer}>
          <LogoSvg width={50} height={50} />
        </View>
        <View style={styles.innerContainer}>
          <CustomTextInput
            onChangeText={text => setTextValue(text)}
            value={textValue}
            placeholder={'Search'}
            customStyle={[styles.textInput, { fontSize: fontSize }]}
          />
        </View>

        <IconButton
          icon="magnify"
          color={Colors.primary}
          size={25}
          onPress={() => {
            searchPosts(textValue);
          }}
        />

        {/* <IconButton
          icon="magnify"
          color={Colors.primary}
          size={25}
          onPress={() => {
            searchPosts(textValue);
          }}
        /> */}
      </View>
      {search.isSuccess && (
        <View style={styles.listContainer}>{loadingOrResults()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 3,
    // width: Dimensions.get('window').width,
  },
  innerContainer: {
    // justifyContent: 'center',
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 2,
    backgroundColor: Colors.whiteSmoke,
  },
  logoContainer: {
    paddingTop: 5,
    borderRadius: 50,
  },
  listContainer: {
    backgroundColor: Colors.white,
    maxHeight: Dimensions.get('window').height / 2,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    marginTop: -10
  },
  textInput: {
    backgroundColor: Colors.white,
    paddingLeft: 10,
  },

  centerNoMatch: { flexDirection: 'row', justifyContent: 'center' }
});

export { SearchBar };

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
const SearchBar = ({
  containerWidth,
  elevation,
  marginHorizontal = 0,
  fontSize,
  navigation,
  currentLocation
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const search = useSearchHealthCareFacility();
  // Calls the fetchData function and searches for the key given as a parameter

  const searchPosts = async searchKey => {

    setSearchClicked(true);
    setFilteredData([]); // Empty the the existing list.
    search.mutate(searchKey);
    if (search.isSuccess) {
      const result = search.data.data.data
      console.log(result)
      if (result && result.length > 0) {
        setFilteredData(result);
      } else {
        setFilteredData([]);
      }
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



  const renderItem = ({ item }) => {

    return (
      <Pressable onPress={() => navigation.navigate('Details', { id: item.id, travelDistance: getDistanceFromGPS(item.GPSCoordinates, true) })} key={item.id}>
        <View style={styles.item}>
          <CustomText content={item.name} />
        </View>
      </Pressable>
    );
  };

  const listItems = () => {
    return (
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  };
  const loadingOrResults = () => {
    return search.isLoading ? (
      <ActivityIndicator />
    ) : !search.isLoading && filteredData.length !== 0 ? (
      listItems()
    ) : !search.isLoading && filteredData.length === 0 ? (
      <CustomText content={'No match found.'} />
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
      </View>
      {searchClicked && (
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
});

export { SearchBar };

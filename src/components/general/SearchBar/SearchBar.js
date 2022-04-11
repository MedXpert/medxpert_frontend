import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import axios from 'axios';

import Colors from '../../../constants/colors';
import {CustomTextInput} from '../../general/CustomTextInput';
import LogoSvg from '../../../assets/svg/logo/logo blue no background.svg';
import {CustomText} from '../CustomText';

const SearchBar = ({
  containerWidth,
  elevation,
  marginHorizontal = 0,
  fontSize,
}) => {
  const [fetchData, setFetchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [countSearchResult, setCountSearchResult] = useState(0);

  const fetchPosts = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = await res.data;
    setFetchData(data);
  };

  // Calls the fetchData function and searches for the key given as a parameter
  const searchPosts = async searchKey => {
    setSearchClicked(true);

    setIsLoading(true);
    await fetchPosts();
    setFilteredData([]); // Empty the the existing list.
    // Map each element from fetchData and store the ones that much the search key word to filteredData.
    fetchData.map((value, index) => {
      var isSearchValue = value.title.includes(searchKey);
      if (isSearchValue) {
        setCountSearchResult(countSearchResult + 1);
        setFilteredData(existingItems => [
          ...existingItems,
          {id: Math.random() * 10 + 1, title: value.title},
        ]);
      }
    });
    //If there is no result set the filteredData array to empty
    if (countSearchResult === 0) {
      setFilteredData([]);
    }
    setIsLoading(false); //Loading ends here
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <CustomText content={item.title} />
      </View>
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
    return isLoading && searchClicked ? (
      <ActivityIndicator />
    ) : !isLoading && searchClicked && filteredData.length !== 0 ? (
      listItems()
    ) : !isLoading && searchClicked && filteredData.length === 0 ? (
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
            customStyle={[styles.textInput, {fontSize: fontSize}]}
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
    backgroundColor: Colors.whiteSmoke,
    marginBottom: 5,
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
    padding: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: Colors.white,
    paddingLeft: 10,
  },
});

export {SearchBar};

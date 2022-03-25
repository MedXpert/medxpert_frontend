import {Text, View, StyleSheet, Dimensions} from 'react-native';
import React, {Component} from 'react';

import {SearchBar} from '../components/general/SearchBar/';
import Colors from '../constants/colors';
import {CustomButton} from '../components/general/CustomButton';
import {MedXpertSearchBar} from '../components/general/MedXpertSearchBar/MedXpertSearchBar';

const Home = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    margin: 10,
  },
});

export default Home;

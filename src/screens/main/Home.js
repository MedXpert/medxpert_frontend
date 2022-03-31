import {Text, View, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapboxGL from '@rnmapbox/maps';
import {PermissionsAndroid} from 'react-native';
import {requestLocationPermission} from '../../services/location/requestLocationPermission';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import SvgAmbulance from '../../assets/svg/bottomNavbar/Ambulance.svg';
import SvgProfile from '../../assets/svg/bottomNavbar/Profile.svg';
import SvgEmergency from '../../assets/svg/bottomNavbar/Emergency.svg';
import SvgHome from '../../assets/svg/bottomNavbar/Home.svg';

import {SearchBar} from '../../components/general/SearchBar';
import Colors from '../../constants/colors';
import {CustomButton} from '../../components/general/CustomButton';
import {MedXpertSearchBar} from '../../components/general/MedXpertSearchBar/MedXpertSearchBar';
import {BottomNavbar} from '../../components/general/BottomNavbar';
import {CustomText} from '../../components/general/CustomText';

const Home = () => {
  return <CustomText content={'Home'} />;
};

const styles = StyleSheet.create({});

export default Home;

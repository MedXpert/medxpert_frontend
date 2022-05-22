import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import React, {useState} from 'react';

import AuthStackScreen from './Auth';
import SplashScreen from '../screens/welcome/Splash';
import BottomNavBar from './BottomNavBar';
import NavbarWithSubScreensUser from './NavbarWithSubScreens';
// import Appointment from '../screens/main/Home/Appointment';
// import AutomationEmail from '../screens/main/Emergency/AutomationEmail';

// AsyncStorage to store user ID and other infos after logged in
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarWithSubScreensAdmin from '../hcf/routes/NavbarWithSubScreens';
import {readAsyncStorage} from '../services/readAsyncStorage';
import ClaimRequest from '../hcf/screens/main/Home/ClaimRequest';

// The main route that evaluates whether the user is logged in or not and decides where to navigate when the app starts.
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // User state value from the cache
  const [appIsLoaded, setAppIsLoaded] = useState(true); // whether the app is loading or finished loading.
  const [openingForTheFirstTime, setOpeningForTheFirstTime] = useState(false); // Whether the app is being opened for the first time.
  const [role, setRole] = useState('admin');

  // setTimeout(() => setAppIsLoaded(true), 3000);
  // setTimeout(() => setIsLoggedIn(true), 5000);

  const homeOrLogin = () => {
    if (openingForTheFirstTime && !isLoggedIn) {
      return <AuthStackScreen initialRoute={'Welcome'} />;
    } else if (!openingForTheFirstTime && !isLoggedIn) {
      return <AuthStackScreen initialRoute={'Login'} />;
    } else if (isLoggedIn) {
      // Temporarily used to store static user id
      const storeData = async () => {
        try {
          await AsyncStorage.setItem('@userId', '1');
        } catch (e) {
          // saving error
          console.warn('userId store error:  ', e);
        }
      };
      storeData();

      // Check role
      if (role === 'user') {
        return <NavbarWithSubScreensUser />;
      } else if (role === 'admin') {
        return <ClaimRequest />;
        // return <NavbarWithSubScreensAdmin />;
      }
    }
  }; // return stacks according to the state of the user.

  //Check whether the app finished loading; show the splash screen until it finishes loading; then call the homeOrLogin function.
  return appIsLoaded ? homeOrLogin() : <SplashScreen />;
};

export default Main;

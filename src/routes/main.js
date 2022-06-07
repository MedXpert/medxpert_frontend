import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage to store user ID and other infos after logged in

import SplashScreen from '../screens/welcome/Splash';
import NavigationStackUser from './NavigationStackUser';
import NavigationStackHCF from '../hcf/routes/NavigationStackHCF';
import WelcomeStackScreen from './Welcome';
import AuthStackScreen from './Auth';
import { AuthContext, WelcomeContext } from '../components/general/Context';

// The main route that evaluates whether the user is logged in or not and decides where to navigate when the app starts.
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(); // User state value from the cache  -- check if a login token exists
  const [appIsLoading, setAppIsLoading] = useState(true); // whether the app is loading or finished loading.
  const [openingForTheFirstTime, setOpeningForTheFirstTime] = useState(true); // Whether the app is being opened for the first time.
  const [role, setRole] = useState();

  // setTimeout(() => setAppIsLoading(false), 3000);
  // setTimeout(() => setIsLoggedIn(true), 5000);
  // setTimeout(() => setOpeningForTheFirstTime(false), 5000);

  // Checks if the app is being opened for the first time; when the app finishes checking this, the appIsLoading state will be set to false;
  const setOpeningForTheFirstTimeValueFunc = useCallback(async () => {
    const value = await AsyncStorage.getItem('@OpeningForTheFirstTime');
    if (value == null) {
      setOpeningForTheFirstTime(true);
    }
    if (value === 'false') {
      setOpeningForTheFirstTime(false);
    }
    // Set AppIsLoading false (Splash screen won't be displayed)
    setAppIsLoading(false);
  }, []);

  const checkLoginStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem('@accessToken');
    if (token == null) {
      setIsLoggedIn(false);
    } else if (token) {
      const userRole = await AsyncStorage.getItem('@role');
      setRole(userRole)
      setIsLoggedIn(true);
    }
  }, []);

  // value passed to the WelcomeContext
  const welcomeContext = useMemo(() => {
    return {
      setOpeningForTheFirstTimeValue: setOpeningForTheFirstTimeValueFunc,
    };
  }, [setOpeningForTheFirstTimeValueFunc]);

  // check if there is a logged in user
  const authContext = useMemo(() => {
    return {
      loginStatus: checkLoginStatus,
    };
  }, [checkLoginStatus]);

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      await setOpeningForTheFirstTimeValueFunc();
      checkLoginStatus();
      // await checkFallDetected();
      setAppIsLoading(false);
    };

    check();

    return () => {
      isMounted = false;
    };
  }, [setOpeningForTheFirstTimeValueFunc, checkLoginStatus]);
  console.log("role", role)
  const homeOrLogin = () => {
    if (openingForTheFirstTime && !isLoggedIn) {
      return (
        <WelcomeContext.Provider value={welcomeContext}>
          <WelcomeStackScreen />
        </WelcomeContext.Provider>
      );
    } else if (!openingForTheFirstTime && !isLoggedIn) {
      return (
        <AuthContext.Provider value={authContext}>
          <AuthStackScreen />
        </AuthContext.Provider>
      );
    } else if (isLoggedIn) {
      // Check role
      if (role === 'u') {
        return (
          <AuthContext.Provider value={authContext}>
            <NavigationStackUser />
          </AuthContext.Provider>
        );
      } else if (role === 'h') {
        return <AuthContext.Provider value={authContext}><NavigationStackHCF /></AuthContext.Provider>;
      }
    }
  }; // return stacks according to the state of the user.

  //Check whether the app finished loading; show the splash screen until it finishes loading; then call the homeOrLogin function.
  return appIsLoading ? <SplashScreen /> : homeOrLogin();
};

export default Main;

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {View, Text, AppState} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage to store user ID and other infos after logged in
import {FallDetectionEmitter, start} from "react-native-fall-detection-module";
import {LogBox} from "react-native";
import NetInfo from "@react-native-community/netinfo";


import SplashScreen from "../screens/welcome/Splash";
import NavigationStackUser from "./NavigationStackUser";
import NavigationStackHCF from "../HCF/routes/NavigationStackHCF";
import WelcomeStackScreen from "./Welcome";
import AuthStackScreen from "./Auth";
import {
  AuthContext,
  WelcomeContext,
  FallContext,
} from "../components/general/Context";
import FallDetected from "../screens/main/Emergency/FallDetected";
import {backgroundService} from "../services/backgroundService/backgroundService";
import Connecting from "../screens/main/Connecting";

// Ignore new NativeEmitter error
LogBox.ignoreLogs(["new NativeEventEmitter"]);

// The main route that evaluates whether the user is logged in or not and decides where to navigate when the app starts.
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(); // User state value from the cache  -- check if a login token exists
  const [appIsLoading, setAppIsLoading] = useState(true); // whether the app is loading or finished loading.
  const [openingForTheFirstTime, setOpeningForTheFirstTime] = useState(true); // Whether the app is being opened for the first time.
  const [role, setRole] = useState("user");
  const [fallDetected, setFallDetected] = useState(false);
  const [currentCounter, setCurrentCounter] = useState();
  const [aState, setAppState] = useState(AppState.currentState);
  const [isConnected, setIsConnected] = useState(false);

  // Checks if the app is being opened for the first time; when the app finishes checking this, the appIsLoading state will be set to false;
  const setOpeningForTheFirstTimeValueFunc = useCallback(async () => {
    const value = await AsyncStorage.getItem("@OpeningForTheFirstTime");
    if (value == null) {
      setOpeningForTheFirstTime(true);
    }
    if (value === "false") {
      setOpeningForTheFirstTime(false);
    }
    // Set AppIsLoading false (Splash screen won't be displayed)
  }, []);

  const checkLoginStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem("@token");
    if (token == null) {
      setIsLoggedIn(false);
    } else if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const checkFallDetected = useCallback(async () => {
    const fall = await AsyncStorage.getItem("@fallDetected");
    if (fall == null) {
      setFallDetected(false);
    } else if (fall) {
      setFallDetected(true);
    }
  }, []);

  // Welcome context value
  const welcomeContext = useMemo(() => {
    return {
      setOpeningForTheFirstTimeValue: setOpeningForTheFirstTimeValueFunc,
    };
  }, [setOpeningForTheFirstTimeValueFunc]);

  // auth context value
  const authContext = useMemo(() => {
    return {
      loginStatus: checkLoginStatus,
    };
  }, [checkLoginStatus]);

  // fall detection context value
  const fallContext = useMemo(() => {
    return {
      fallStatus: checkFallDetected,
    };
  }, [checkFallDetected]);

  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log("Connection type", state.type);
     
      setIsConnected(state.isInternetReachable);
    });

    // Unsubscribe
    // unsubscribe();
  });

  // Start listening to the fall detection events
  useEffect(() => {
    start();
  }, []);

 
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      nextAppState => {
        // console.log("Next AppState is: ", nextAppState);
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener.remove();
    };
  }, []);

  // Listen to the fall events
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      FallDetectionEmitter.addListener("fall", async newData => {
        console.log(newData);
        await AsyncStorage.setItem("@fallDetected", "true");
        // put your data processing step here
        // setFallDetected(true);
        const fallDetectionToggle = await AsyncStorage.getItem("@fallDetectionToggle");

        // If fall detection toggle is on 
        if(fallDetectionToggle){
          if(aState === "background"){
            const currentCounter = await AsyncStorage.getItem("@counting");
            if(!currentCounter){
              backgroundService();
            }
          }
          else if(aState === "active"){
            const currentCounter = await AsyncStorage.getItem("@counting");
            if(!currentCounter){
              backgroundService();
            }else{

              setCurrentCounter(currentCounter);
            }
            setFallDetected(true);
          }
        }
      });
    }

    return async () => {
      isMounted = false;
    };
  }, [aState]);

  // Listen to the fall detection events
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      await setOpeningForTheFirstTimeValueFunc();
      checkLoginStatus();
      await checkFallDetected();
      setAppIsLoading(false);
    };
    check();

    return () => {
      isMounted = false;
    };
  }, [setOpeningForTheFirstTimeValueFunc, checkLoginStatus, checkFallDetected]);

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
      // Temporarily used to store static user id
      const storeData = async () => {
        try {
          await AsyncStorage.setItem("@userId", "1");
        } catch (e) {
          // saving error
          console.warn("userId store error:  ", e);
        }
      };
      storeData();

      // Check role
      if (role === "user") {
        if (fallDetected) {
          return (
            <FallContext.Provider value={fallContext}>
              <FallDetected  duration={currentCounter ? parseInt(currentCounter) : 15}/>
            </FallContext.Provider>
          );
        } else {
          return <NavigationStackUser />;
          // return (
          //   <FallContext.Provider value={fallContext}>
          //     <FallDetected />
          //   </FallContext.Provider>
          // );
        }
      } else if (role === "admin") {
        return <NavigationStackHCF />;
      }
    }
  }; // return stacks according to the state of the user.

  //Check whether the app finished loading; show the splash screen until it finishes loading; then call the homeOrLogin function.
  return appIsLoading ? <SplashScreen /> : isConnected ? homeOrLogin() : <Connecting />;
};

export default Main;

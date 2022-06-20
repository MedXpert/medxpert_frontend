import colors from '../../constants/colors';
import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import SvgProfile from '../../assets/svg/bottomNavbar/Profile.svg';
import SvgHome from '../../assets/svg/bottomNavbar/Home.svg';
import {CustomText} from '../../components/general/CustomText';

import Home from '../screens/Home';
import Profile from '../screens/Profile';

const navigatorScreenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    // position: 'absolute',
    height: 70,
    borderTopWidth: 0,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
  },
};

// Options for Home bottom navbar tab
const homeScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? colors.primary : colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgHome width={30} height={30} stroke={activeColor} />
        <CustomText content={'HOME'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
  headerShown: false,
};

// Options for profile bottom navbar tab
const profileScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? colors.primary : colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgProfile width={30} height={30} fill={activeColor} />
        <CustomText content={'PROFILE'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
};

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={navigatorScreenOptions}>
      <Tab.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={profileScreenOptions}
      />
    </Tab.Navigator>
  );
};

// Container for Bottom Navbar and other screen
const ContStack = createStackNavigator();

const NavigationStackHCF = () => {
  return (
    <ContStack.Navigator>
      {/* Screens with Bottom Navbar (the main ones) - Home, Appointment */}
      <ContStack.Screen
        name="BottomNavbar"
        component={BottomNavbar}
        options={{headerShown: false}}
      />
      <ContStack.Group screenOptions={{headerShown: false}}>
        {/* <ContStack.Screen name="Details" component={Details} /> */}
      </ContStack.Group>
    </ContStack.Navigator>
  );
};

export default NavigationStackHCF;

import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Colors from '../constants/colors';
import Ambulance from '../screens/main/Ambulance';
import Emergency from '../screens/main/Emergency';
import Home from '../screens/main/Home';
import Profile from '../screens/main/Profile';
import SvgAmbulance from '../assets/svg/bottomNavbar/Ambulance.svg';
import SvgProfile from '../assets/svg/bottomNavbar/Profile.svg';
import SvgEmergency from '../assets/svg/bottomNavbar/Emergency.svg';
import SvgHome from '../assets/svg/bottomNavbar/Home.svg';
import {CustomText} from '../components/general/CustomText';

const Tab = createBottomTabNavigator();

// Options for Home bottom navbar tab
const homeScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgHome width={30} height={30} stroke={activeColor} />
        <CustomText content={'HOME'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
  headerShown: false,
};
// Options for Ambulance tab
const ambulanceScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgAmbulance width={30} height={30} fill={activeColor} />
        <CustomText
          content={'AMBULANCE'}
          fontSize={10}
          fontColor={activeColor}
        />
      </View>
    );
  },
};

// Options for Emergency tab
const emergencyScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgEmergency width={30} height={30} fill={activeColor} />
        <CustomText
          content={'EMERGENCY'}
          fontSize={10}
          fontColor={activeColor}
        />
      </View>
    );
  },
};

// Options for Profile tab
const profileScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgProfile width={30} height={30} fill={activeColor} />
        <CustomText content={'PROFILE'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
};
const BottomNavBar = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Tab.Screen
        name="Ambulance"
        component={Ambulance}
        options={ambulanceScreenOptions}
      />
      <Tab.Screen
        name="Emergency"
        component={Emergency}
        options={emergencyScreenOptions}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={profileScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default BottomNavBar;

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

const bottomNavBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? Colors.primary : Colors.lightGray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgHome width={30} height={30} stroke={iconColor} />
                {/* <CustomText content={'HOME'} /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ambulance"
        component={Ambulance}
        options={{
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? Colors.primary : Colors.lightGray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgAmbulance width={30} height={30} fill={iconColor} />
                {/* <CustomText content={'AMBULANCE'} /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={Emergency}
        options={{
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? Colors.primary : Colors.lightGray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgEmergency width={30} height={30} fill={iconColor} />
                {/* <CustomText content={'EMERGENCY'} /> */}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? Colors.primary : Colors.lightGray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgProfile width={30} height={30} fill={iconColor} />
                {/* <CustomText content={'PROFILE'} /> */}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomNavBar;

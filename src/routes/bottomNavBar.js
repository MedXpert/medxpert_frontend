import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Colors from '../constants/colors';
import Ambulance from '../screens/main/Ambulance';
import Emergency from '../screens/main/Emergency';
// import Home from '../screens/main/Home';
import HomeStack from './home.js';
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
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: 'absolute',
          height: 70,
          borderTopWidth: 0,
          // borderTopRightRadius: 30,
          // borderTopLeftRadius: 30,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            let iconColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgHome width={30} height={30} stroke={iconColor} />
                <CustomText
                  content={'HOME'}
                  fontSize={10}
                  fontColor={Colors.gray}
                />
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
            let iconColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgAmbulance width={30} height={30} fill={iconColor} />
                <CustomText
                  content={'AMBULANCE'}
                  fontSize={10}
                  fontColor={Colors.gray}
                />
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
            let iconColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgEmergency width={30} height={30} fill={iconColor} />
                <CustomText
                  content={'EMERGENCY'}
                  fontSize={10}
                  fontColor={Colors.gray}
                />
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
            let iconColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgProfile width={30} height={30} fill={iconColor} />
                <CustomText
                  content={'PROFILE'}
                  fontSize={10}
                  fontColor={Colors.gray}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomNavBar;

import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomNavBar from './BottomNavBar';
import HomePageSubScreens from './SubScreens/HomePageSubScreens';
import AmbulancePageSubScreens from './SubScreens/AmbulancePageSubScreens';
import EmergencyPageSubScreens from './SubScreens/EmergencyPageSubScreens';
import ProfileSubScreens from './SubScreens/ProfilePageSubScreens';
import Details from '../screens/main/Home/Details';

const TabAndSubsStack = createNativeStackNavigator();

const NavbarWithSubScreens = () => {
  const config = {
    headerShown: false,
  };
  return (
    <TabAndSubsStack.Navigator>
      <TabAndSubsStack.Screen
        name="BottomNavBar"
        component={BottomNavBar}
        options={config}
      />
      <TabAndSubsStack.Screen
        name="Details"
        component={Details}
        options={config}
      />
    </TabAndSubsStack.Navigator>
  );
};

export default NavbarWithSubScreens;

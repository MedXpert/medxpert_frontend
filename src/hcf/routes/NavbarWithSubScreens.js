import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomNavBar from './BottomNavBar';
import Details from '../screens/main/Home/Details';
import ClaimRequest from '../screens/main/Home/ClaimRequest';

const TabAndSubsStack = createNativeStackNavigator();

const NavbarWithSubScreens = () => {
  const config = {
    headerShown: false,
  };
  return (
    <TabAndSubsStack.Navigator screenOptions={config}>
      <TabAndSubsStack.Screen name="BottomNavBar" component={BottomNavBar} />
      <TabAndSubsStack.Screen name="Details" component={Details} />
      <TabAndSubsStack.Screen name="ClaimRequest" component={ClaimRequest} />
    </TabAndSubsStack.Navigator>
  );
};

export default NavbarWithSubScreens;

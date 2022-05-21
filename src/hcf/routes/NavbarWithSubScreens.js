import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomNavBar from './BottomNavBar';

const TabAndSubsStack = createNativeStackNavigator();

const NavbarWithSubScreens = () => {
  const config = {
    headerShown: false,
  };
  return (
    <TabAndSubsStack.Navigator screenOptions={config}>
      <TabAndSubsStack.Screen name="BottomNavBar" component={BottomNavBar} />
    </TabAndSubsStack.Navigator>
  );
};

export default NavbarWithSubScreens;

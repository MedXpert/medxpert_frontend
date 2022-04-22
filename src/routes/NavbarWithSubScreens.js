import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomNavBar from './BottomNavBar';
import Details from '../screens/main/Home/Details';
import Appointment from '../screens/main/Home/Appointment';

const TabAndSubsStack = createNativeStackNavigator();

const NavbarWithSubScreens = () => {
  const config = {
    headerShown: false,
  };
  const appointmentConfig = {
    headerShown: true,
  };
  return (
    <TabAndSubsStack.Navigator screenOptions={config}>
      <TabAndSubsStack.Screen name="BottomNavBar" component={BottomNavBar} />
      <TabAndSubsStack.Screen name="Details" component={Details} />
      <TabAndSubsStack.Screen
        name="Appointment"
        component={Appointment}
        options={appointmentConfig}
      />
    </TabAndSubsStack.Navigator>
  );
};

export default NavbarWithSubScreens;

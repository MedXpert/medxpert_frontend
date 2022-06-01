import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BottomNavBar from './BottomNavBar';
import Details from '../screens/main/Home/Details';
import Appointment from '../screens/main/Home/Appointment';
import AutomationEmail from '../screens/main/Emergency/AutomationEmail';
import AutomationSms from '../screens/main/Emergency/AutomationSms';
import AuthStackScreen from './Auth';

const Tab = createStackNavigator();

const NavigationStackUser = () => {
  const config = {
    headerShown: false,
  };
  // const appointmentConfig = {
  //   headerShown: true,
  // };
  return (
    <Tab.Navigator screenOptions={config}>
      <Tab.Screen name="BottomNavBar" component={BottomNavBar} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Appointment" component={Appointment} options={config} />
      <Tab.Screen name="AutomationEmail" component={AutomationEmail} />
      <Tab.Screen name="AutomationSms" component={AutomationSms} />
    </Tab.Navigator>
  );
};

export default NavigationStackUser;

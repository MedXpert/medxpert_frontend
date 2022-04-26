import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Welcome1 from '../screens/welcome/Welcome1';
import Welcome2 from '../screens/welcome/Welcome2';
import Welcome3 from '../screens/welcome/Welcome3';

// Welcome screens that will be shown for users when they open the app for the first time
const WelcomeStackScreen = () => {
  const config = {
    animation: 'slide_from_right',
  };
  const WelcomeStack = createNativeStackNavigator();
  return (
    <WelcomeStack.Navigator screenOptions={{}}>
      <WelcomeStack.Screen
        options={config}
        name="Welcome1"
        component={Welcome1}
      />
      <WelcomeStack.Screen
        name="Welcome2"
        component={Welcome2}
        options={config}
      />
      <WelcomeStack.Screen
        name="Welcome3"
        component={Welcome3}
        options={config}
      />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackScreen;

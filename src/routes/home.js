import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/main/Home';
import Details from '../screens/main/Home/Details';

// Home stack for users that are logged in. The can navigate to the home and other routes starting from here.
const HomeStackScreen = () => {
  const HomeStack = createNativeStackNavigator();
  const config = {
    headerShown: false,
  };
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} options={config} />
      <HomeStack.Screen name="Details" component={Details} options={config} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;

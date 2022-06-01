import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import Welcome from './Welcome';

// Auth stack for users that are not logged in
const AuthStackScreen = ({initialRoute}) => {
  // Configuration of each screen behavior
  const config = {
    headerShown: false,
    animation: 'none',
  };
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName={initialRoute}>
      <AuthStack.Screen name="Login" component={Login} options={config} />
      <AuthStack.Screen name="SignUp" component={SignUp} options={config} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;

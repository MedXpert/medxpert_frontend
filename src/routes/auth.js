import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import Welcome from './welcome';

// Auth stack for users that are not logged in
const AuthStackScreen = ({initialRoute}) => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName={initialRoute}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={Welcome}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';

//Auth stack for users that are not logged in 
const AuthStackScreen = () => {
    const AuthStack = createNativeStackNavigator();

    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
    );
}

export default AuthStackScreen;
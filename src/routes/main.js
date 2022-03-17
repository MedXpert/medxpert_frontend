import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import AuthStackScreen from "./auth";
import HomeStackScreen from "./home";

// The main route that evaluates whether the user is logged in or not and decides where to navigate when the app starts.
const main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // User state value from the cache 

    //return stacks according to the user state
    return (
        isLoggedIn ? <AuthStackScreen /> : <HomeStackScreen />
    );
}

export default main;
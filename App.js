import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './src/routes/main';
import Colors from './src/constants/colors';

const App = () => {
  return (
    // Navigation Container should be rendered at the root of the app
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;

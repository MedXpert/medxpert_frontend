import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {darkTheme, lightTheme} from './src/constants/themes';
import Navigator from './src/routes/main';

const App = () => {
  return (
    // Navigation Container should be rendered at the root of the app
    <NavigationContainer theme={lightTheme}>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;

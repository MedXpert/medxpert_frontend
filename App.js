import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {NavigationContainer} from '@react-navigation/native';
import {darkTheme, lightTheme} from './src/constants/themes';
import Navigator from './src/routes/main';
import FlashMessage from "react-native-flash-message";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      
      <FlashMessage position="bottom" />
      {/* Navigation Container should be rendered at the root of the app */}
      <NavigationContainer theme={lightTheme}>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

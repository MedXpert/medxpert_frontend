import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import {NavigationContainer} from '@react-navigation/native';
import {darkTheme, lightTheme} from './src/constants/themes';
import Navigator from './src/routes/main';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* Navigation Container should be rendered at the root of the app */}
      <NavigationContainer theme={lightTheme}>
        <Navigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

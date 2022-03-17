import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import Navigator from './src/routes/main'

const App = () => {
  return (
    <NavigationContainer> // Navigation Container should be rendered at the root of the app
      <Navigator />
    </NavigationContainer>
  )
}

export default App
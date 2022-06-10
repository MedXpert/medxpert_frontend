/**
 * @format
 */
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import './src/services/mirageServer';

MapboxGL.setAccessToken(
  // 'sk.eyJ1IjoibGl5dW1rIiwiYSI6ImNsMWtteG11NzAyZWgzZG9kOWpyb2x1dWMifQ.X4v8HxdCSmdrvVaCWXVjog',
  'sk.eyJ1IjoibGl5dW1rIiwiYSI6ImNsNDhxNHZpajBmMjYza3IyeTMza3BrOWgifQ.yuAXEOs-8nQJIu_hyu2qIQ',
);
// MapboxGL.setConnected(true); // because we are using localhost

// edit logging messages
// for mapboxgl
Logger.setLogCallback(log => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

PushNotification.configure({
  onNotification: function (notification) {},
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

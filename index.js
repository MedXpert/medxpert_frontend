/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import App from './App';
import {name as appName} from './app.json';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibGl5dW1rIiwiYSI6ImNsMWtteG11NzAyZWgzZG9kOWpyb2x1dWMifQ.X4v8HxdCSmdrvVaCWXVjog',
);
MapboxGL.setConnected(true); // because we are using localhost

AppRegistry.registerComponent(appName, () => App);

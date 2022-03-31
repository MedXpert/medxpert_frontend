/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import App from './App';
import {name as appName} from './app.json';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibGl5dW1rIiwiYSI6ImNsMWIwN3E5ajA0ZzMzaW96bTU2bHM1MGsifQ.h4CZp6bIa8qRyRA7GNx6aA',
);

AppRegistry.registerComponent(appName, () => App);

// Mapbox SDK related package
import MapboxGL from '@rnmapbox/maps';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const accessToken =
  'sk.eyJ1IjoibGl5dW1rIiwiYSI6ImNsMWtteG11NzAyZWgzZG9kOWpyb2x1dWMifQ.X4v8HxdCSmdrvVaCWXVjog';
const directionsClient = MapboxDirectionsFactory({accessToken});

const Home2 = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [orderLongitude, setOrderLongitude] = useState(0);
  const [orderLatitude, setOrderLatitude] = useState(0);
  const [route, setRoute] = useState(null);

  const getDirections = async (startLoc, destLoc) => {
    const reqOptions = {
      waypoints: [{coordinates: startLoc}, {coordinates: destLoc}],
      profile: 'driving',
      geometries: 'geojson',
    };
    const res = await directionsClient.getDirections(reqOptions).send();
    //const route = makeLineString(res.body.routes[0].geometry.coordinates)
    const routeLineString = makeLineString(
      res.body.routes[0].geometry.coordinates,
    );
    // console.log('Route: ', JSON.stringify(route));
    // this.setState({route: route});
    setRoute(routeLineString);
  };

  useEffect(() => {
    const {routeDestination} = {
      routeDestination: {longitude: '33.981982', latitude: '-6.851599'},
    };
    MapboxGL.setAccessToken(accessToken);
    MapboxGL.setConnected(true);
    MapboxGL.setTelemetryEnabled(true);

    let latitude, longitude;
    getDirections(
      [-6.873795, 33.990777],
      [routeDestination.longitude, routeDestination.latitude],
    );

    // GeoLocationCore.getCurrentPosition(
    //   info => {
    //     const {coords} = info;

    //     latitude = coords.latitude;
    //     longitude = coords.longitude;

    //     //this.setState({longitude: coords.longitude, latitude: coords.latitude})

    //     setLongitude(-6.873795);
    //     setLatitude(33.990777);
    //     setOrderLatitude(routeDestination.latitude);
    //     setOrderLongitude(routeDestination.longitude);

    //     console.log('your lon: ', longitude);
    //     console.log('your lat', latitude);
    //   },
    //   error => console.log(error),
    //   {
    //     enableHighAccuracy: false,
    //     //timeout: 2000,
    //     maximumAge: 3600000,
    //   },
    // );
  }, []);

  const renderRoadDirections = () => {
    return route ? (
      <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
        <MapboxGL.LineLayer
          id="routeFill"
          // aboveLayerID="customerAnnotation"
          style={{
            lineColor: '#ff8109',
            lineWidth: 3.2,
            lineCap: MapboxGL.LineJoin.Round,
            lineOpacity: 1.84,
          }}
        />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  return (
    <View style={{flex: 1}}>
      <MapboxGL.MapView
        ref={c => (this._map = c)}
        style={{flex: 1, zIndex: -10}}
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={10}
        showUserLocation={true}
        userTrackingMode={1}
        centerCoordinate={[longitude, latitude]}
        logoEnabled={true}>
        {renderRoadDirections()}
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[longitude, latitude]}
          animationMode="flyTo"
          animationDuration={1200}
        />
      </MapboxGL.MapView>
    </View>
  );
};

export default Home2;

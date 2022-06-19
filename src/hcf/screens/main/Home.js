import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  BackHandler,
  StatusBar,
  Image,
  Pressable,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { onChange } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { getDistance } from 'geolib';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import { SearchBar } from '../../../components/general/SearchBar';
import Colors from '../../../constants/colors';
import { CustomButton } from '../../components/general/CustomButton';
import { CustomText } from '../../components/general/CustomText';
import { PermissionModal } from '../../../components/permissions/PermissionModal';
import { IconButton } from 'react-native-paper';
import { MapTypeModal } from '../../../components/home/MapTypeModal';
import { BottomSheetContent } from '../../../components/home/BottomSheetContent';
import { useHealthCareFacilities } from '../../hooks/healthCareFacility';

import { requestPermissions } from '../../../services/permissions/requestPermissions';
import { LOCATION_PERMISSION_MESSAGE } from '../../../constants/string/requestPermissions/requestPermissions';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  var _map;
  var _camera;
  var bsRef = useRef();

  const streetStyleURL = MapboxGL.StyleURL.Street;
  const satelliteStyleURL = MapboxGL.StyleURL.Satellite;
  const lightStyleURL = MapboxGL.StyleURL.Light;
  const darkStyleURL = MapboxGL.StyleURL.Dark;
  const [styleUrl, setStyleUrl] = useState(streetStyleURL); // MapboxGL map style url
  const permissionName = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION; // location permission name
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); // Whether the location permission is granted
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false); // Whether the location permission is Denied
  const [locationPermissionBlocked, setLocationPermissionBlocked] =
    useState(false); //Whether the location permission is Denied
  const [userPositionLng, setUserPositionLng] = useState(0); // User's current position
  const [userPositionLat, setUserPositionLat] = useState(0); // User's current position
  const [locationFromMapboxLng, setLocationFromMapboxLng] = useState(0); // User's current position tracked from the mapboxGL userLocation - Longitude
  const [locationFromMapboxLat, setLocationFromMapboxLat] = useState(0); // User's current position tracked from the mapboxGL userLocation - Latitude
  const [mapTypeVisibility, setMapTypeVisibility] = useState(false); // MapType modal visibility
  const startValueMoveY = useRef(new Animated.Value(0)).current; // Initial value of move Y animated for the location
  const refUserLocation = useRef();
  // Exit the app and go to settings. This function is called when the 'Go to settings' button in the permission denied modal is pressed.
  const settings = () => {
    BackHandler.exitApp();
    openSettings().catch(() => console.warn('Can not open settings'));
  };

  // Checks permission
  const checkPermission = useCallback(async () => {
    const result = await requestPermissions(permissionName); // call requestPermissions function with the permissionName argument and wait for the result;

    //Set the values of location permission according to the result from 'requestPermissions' function
    if (result === RESULTS.GRANTED) {
      setLocationPermissionBlocked(false);
      setLocationPermissionDenied(false);
      setLocationPermissionGranted(true);
    } else if (result === RESULTS.DENIED) {
      setLocationPermissionGranted(false);
      setLocationPermissionBlocked(false);
      setLocationPermissionDenied(true);
    } else if (result === RESULTS.BLOCKED) {
      setLocationPermissionGranted(false);
      setLocationPermissionDenied(false);
      setLocationPermissionBlocked(true);
    }
  }, [permissionName]);

  // Will be called when the user location is updated/changed
  const userLocationUpdate = async location => {
    if (location) {
      let lng = location.coords.longitude;
      let lat = location.coords.latitude;
      // setLocationFromMapboxLng(lng);
      // setLocationFromMapboxLat(lat);

      if (!locationFromMapboxLat || !locationFromMapboxLng) {
        setLocationFromMapboxLng(lng);
        setLocationFromMapboxLat(lat);
        refUserLocation.current = { longitude: lng, latitude: lat };
      } else {
        const distance = getDistance(
          {
            latitude: refUserLocation.current.latitude,
            longitude: refUserLocation.current.longitude,
          },
          { latitude: lat, longitude: lng },
        );
        if (distance > 100) {
          setLocationFromMapboxLng(lng);
          setLocationFromMapboxLat(lat);
          refUserLocation.current = { longitude: lng, latitude: lat };
        }
      }
    }
  };

  // Set center coordinate to the current position of the user.
  const findMyLocation = async () => {
    // Use Geolocation library to get updated location of the user
    Geolocation.getCurrentPosition(
      position => {
        let lng = position.coords.longitude;
        let lat = position.coords.latitude;

        if (locationFromMapboxLat && locationFromMapboxLng) {
          setUserPositionLng(locationFromMapboxLng);
          setUserPositionLat(locationFromMapboxLat);
          // console.log('Inside mapbox User position');
        } else {
          setUserPositionLng(lng);
          setUserPositionLat(lat);
          // console.log('Third party user position');
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );

    await _camera.flyTo([userPositionLng, userPositionLat]);
  };

  // Choose the Map type that'll be displayed
  const chooseMapType = mapType => {
    if (mapType === streetStyleURL) {
      setStyleUrl(streetStyleURL);
    } else if (mapType === lightStyleURL) {
      setStyleUrl(lightStyleURL);
    } else if (mapType === darkStyleURL) {
      setStyleUrl(darkStyleURL);
    } else if (mapType === satelliteStyleURL) {
      setStyleUrl(satelliteStyleURL);
    }
    setMapTypeVisibility(false);
  };

  // locationButton animation move Y direction
  const animatedMove = (endValue, duration) => {
    Animated.timing(startValueMoveY, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  // Tracks the index of BottomSheet
  const onSheetChange = index => {
    if (index === 1) {
      animatedMove(0, 50);
    } else if (index === 0) {
      animatedMove(220, 50);
    }
  };

  useEffect(() => {
    // Call 'checkPermission' every time something in the function is changed.
    checkPermission();
    // Use another library to get the location of the user
    if (locationPermissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          let lng = position.coords.longitude;
          let lat = position.coords.latitude;
          setUserPositionLng(lng);
          setUserPositionLat(lat);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, [checkPermission, locationPermissionGranted]);

  return (
    <View style={styles.container}>
      {/* Map types modal */}
      <MapTypeModal
        mapTypeVisibility={mapTypeVisibility}
        chooseLightMapType={() => {
          chooseMapType(lightStyleURL);
        }}
        chooseDarkMapType={() => {
          chooseMapType(darkStyleURL);
        }}
        chooseStreetMapType={() => {
          chooseMapType(streetStyleURL);
        }}
        chooseSatelliteMapType={() => {
          chooseMapType(satelliteStyleURL);
        }}
        onWindowClose={() => {
          setMapTypeVisibility(false);
        }}
        close={() => {
          setMapTypeVisibility(false);
        }}
        lightStyleURL={lightStyleURL}
        darkStyleURL={darkStyleURL}
        streetStyleURL={streetStyleURL}
        satelliteStyleURL={satelliteStyleURL}
        styleUrl={styleUrl}
      />

      {/* Modal for denied permission*/}
      <PermissionModal
        TextContent={LOCATION_PERMISSION_MESSAGE.MODAL_DENIED}
        buttonLeftOnPress={() => {
          BackHandler.exitApp();
        }}
        buttonOnRightOnPress={() => {
          checkPermission(); // If button is clicked request permission again
        }}
        buttonLeftTitle={'Close App'}
        buttonRightTitle={'Give Permission'}
        modalVisibility={locationPermissionDenied}
      />

      {/* Modal for blocked permission */}
      <PermissionModal
        TextContent={LOCATION_PERMISSION_MESSAGE.MODAL_BLOCKED}
        buttonLeftOnPress={() => {
          BackHandler.exitApp();
        }}
        buttonOnRightOnPress={() => {
          settings(); // Go to permission settings
        }}
        buttonLeftTitle={'Close App'}
        buttonRightTitle={'Go to settings'}
        modalVisibility={locationPermissionBlocked}
        buttonWidth={160}
      />

      {/* MapBoxGL */}
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          styleURL={styleUrl}
          // ref={c => (_map = c)}
          ref={c => (_map = c)}
          logoEnabled={false}
          compassViewMargins={{ x: 10, y: (30 * dimensionHeight) / 100 }}
          style={styles.map}
          surfaceView>
          {/* Display user location */}
          {/* Checks if the user has granted location permission to the app. */}
          {locationPermissionGranted && (
            <>
              <MapboxGL.Camera
                zoomLevel={15}
                // animationDuration={4000}
                // followUserLevel={15}
                // followUserLocation={followUserLocation}
                // animationMode={'flyTo'}
                centerCoordinate={[userPositionLng, userPositionLat]}
              />
              <MapboxGL.UserLocation
                visible={true}
                onUpdate={userLocationUpdate}
              />
            </>
          )}
          <MapboxGL.Camera
            ref={c => (_camera = c)}
            zoomLevel={15}
            // animationMode={'flyTo'}
            // animationDuration={4000}
            // followZoomLevel={15}
            // followUserLocation={followUserLocation}
            centerCoordinate={[userPositionLng, userPositionLat]}
          />
        </MapboxGL.MapView>
      </View>

      {/* SearchBar */}
      <View style={styles.searchBarContainer}>
        {/* Display Search bar  */}
        <SearchBar fontSize={16} marginHorizontal={20} />
      </View>

      {/* Get location button */}
      <Animated.View
        style={[
          styles.locationButtonContainer,
          {
            transform: [
              {
                translateY: startValueMoveY,
              },
            ],
          },
        ]}>
        <IconButton
          // icon={locationChanged ? 'crosshairs' : 'crosshairs-gps'}
          icon={'crosshairs-gps'}
          color={Colors.secondary}
          size={30}
          onPress={findMyLocation}
        />
      </Animated.View>

      {/* Map Style modal show button */}
      <View style={styles.mapIconContainer}>
        <IconButton
          icon="map-legend"
          color={Colors.secondary}
          style={styles.mapIcon}
          size={20}
          onPress={() => {
            setMapTypeVisibility(true);
          }}
        />
      </View>

      {/* Bottom Sheet  */}
      <BottomSheet
        enableContentPanningGesture={false}
        index={1}
        onChange={onSheetChange}
        ref={bsRef}
        snapPoints={['7%', '37%', '100%']}>
        <BottomSheetContent navigation={navigation} currentLocation={`${locationFromMapboxLng},${locationFromMapboxLat}`} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    alignContent: 'center',
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  mapIconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    position: 'absolute',
    top: (15 * dimensionHeight) / 100,
    right: 10,
  },
  mapIcon: {
    color: Colors.white,
  },
  locationButtonContainer: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 310,
    right: 10,
    borderRadius: 50,
  },
  mapContainer: {
    width: dimensionWidth,
    height: dimensionHeight,
    backgroundColor: Colors.dark,
  },

  map: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 30,
  },
});

export default Home;

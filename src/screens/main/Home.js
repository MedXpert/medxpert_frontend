import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  BackHandler,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import MapboxGL from '@rnmapbox/maps';
import {PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import SvgAmbulance from '../../assets/svg/bottomNavbar/Ambulance.svg';
import SvgProfile from '../../assets/svg/bottomNavbar/Profile.svg';
import SvgEmergency from '../../assets/svg/bottomNavbar/Emergency.svg';
import SvgHome from '../../assets/svg/bottomNavbar/Home.svg';
import {SearchBar} from '../../components/general/SearchBar';
import Colors from '../../constants/colors';
import {CustomButton} from '../../components/general/CustomButton';
import {CustomText} from '../../components/general/CustomText';
import {PermissionModal} from '../../components/permissions/PermissionModal';
import {IconButton, shadow} from 'react-native-paper';

import {requestPermissions} from '../../services/permissions/requestPermissions';
import {LOCATION_PERMISSION_MESSAGE} from '../../constants/string/requestPermissions/requestPermissions';

const Home = () => {
  var _map;
  var _camera;
  const streetStyleURL = MapboxGL.StyleURL.Street;
  const satelliteStyleURL = MapboxGL.StyleURL.Satellite;
  const lightStyleURL = MapboxGL.StyleURL.Light;
  const darkStyleURL = MapboxGL.StyleURL.Dark;
  const shadow = {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };
  const permissionName = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION; //location permission name
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); // Whether the location permission is granted
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false); // Whether the location permission is Denied
  const [locationPermissionBlocked, setLocationPermissionBlocked] =
    useState(false); //Whether the location permission is Denied

  const [styleUrl, setStyleUrl] = useState(streetStyleURL);

  const [locationChanged, setLocationChanged] = useState(false); // Whether the location is changed
  const [userPositionLng, setUserPositionLng] = useState(0); // User's current position
  const [userPositionLat, setUserPositionLat] = useState(0); // User's current position
  // const [followUserLocation, setFollowUserLocation] = useState(true);
  const [locationFromMapboxLng, setLocationFromMapboxLng] = useState();
  const [locationFromMapboxLat, setLocationFromMapboxLat] = useState();

  //Exit the app and go to settings. Called when the 'Go to settings' button is pressed.
  const settings = () => {
    BackHandler.exitApp();
    openSettings().catch(() => console.warn('Can not open settings'));
  };

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
      setLocationFromMapboxLng(lng);
      setLocationFromMapboxLat(lat);
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
          console.log('Inside mapbox User position');
        } else {
          setUserPositionLng(lng);
          setUserPositionLat(lat);
          console.log('Third party user position');
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    await _camera.flyTo([userPositionLng, userPositionLat]);
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
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [checkPermission, locationPermissionGranted]);

  // Follow user position strictly

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       let lng = position.coords.longitude;
  //       let lat = position.coords.latitude;
  //       setUserPositionLng(lng);
  //       setUserPositionLat(lat);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  //   console.log(locationFromMapbox);
  // }, [locationFromMapbox]);

  return (
    <View style={styles.container}>
      {/* Modal for denied permission*/}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => {}}>
        <View style={styles.chooseMapModal}>
          <View style={styles.mapOptionsContainers}>
            <View />
            <View />
            <View />
          </View>
        </View>
      </Modal>
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
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          styleURL={styleUrl}
          // ref={c => (_map = c)}
          ref={c => (_map = c)}
          logoEnabled={false}
          compassViewMargins={{x: 10, y: Dimensions.get('window').height / 4}}
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

      <View style={styles.searchBarContainer}>
        {/* Display Search bar  */}
        <SearchBar fontSize={16} marginHorizontal={20} />
      </View>
      <View style={styles.locationButtonContainer}>
        <IconButton
          // icon={locationChanged ? 'crosshairs' : 'crosshairs-gps'}
          icon={'crosshairs-gps'}
          color={Colors.secondary}
          size={30}
          onPress={findMyLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  chooseMapModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    paddingHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 20,
    backgroundColor: Colors.secondary,
    ...shadow,
  },
  locationButtonContainer: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 80,
    right: 10,
    borderRadius: 50,
  },
  mapOptionsContainers: {
    flexDirection: 'row',
  },
  // modalView: {
  //   alignSelf: 'center',
  //   backgroundColor: Colors.secondary,
  //   marginTop: 300,
  //   paddingHorizontal: 15,
  //   borderRadius: 15,
  //   paddingVertical: 20,
  //   width: Dimensions.get('window').width - 50,
  //   shadowColor: Colors.black,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  searchBarContainer: {
    position: 'absolute',
    top: 60,
  },
  mapContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Colors.dark,
  },
  map: {
    flex: 1,
  },
});

export default Home;

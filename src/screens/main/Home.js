import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import MapboxGL from '@rnmapbox/maps';
import {PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';

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
import {IconButton} from 'react-native-paper';

import {requestPermissions} from '../../services/permissions/requestPermissions';
import {LOCATION_PERMISSION_MESSAGE} from '../../constants/string/requestPermissions/requestPermissions';

const Home = () => {
  const permissionName = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION; //location permission name
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false); // Whether the location permission is granted
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false); // Whether the location permission is Denied
  const [locationPermissionBlocked, setLocationPermissionBlocked] =
    useState(false); //Whether the location permission is Denied

  const [locationChanged, setLocationChanged] = useState(false); // Whether the location is changed
  const [userPosition, setUserPosition] = useState(); // User's current position
  const [centerCoordinate, setCenterCoordinate] = useState([]);
  const [followUserLocation, setFollowUserLocation] = useState(true);
  const [regionDidChange, setRegionDidChange] = useState(false);
  const [regionIsChanging, setRegionIsChanging] = useState(false);

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

  // Will be called when the region being displayed in the map is changing
  const onRegionIsChanging = () => {
    // console.log(followUserLocation);
    setRegionIsChanging(true);
    setLocationChanged(true);
  };

  // Will be called when the region being displayed in the map has changed
  const onRegionDidChange = () => {
    setRegionDidChange(true);
    setFollowUserLocation(false);
  };

  // Will be called when the user location is updated/changed
  const userLocationUpdate = location => {
    setUserPosition(location);
  };

  // Set center coordinate to the current position of the user.
  const findMyLocation = () => {
    setCenterCoordinate([
      userPosition.coords.longitude,
      userPosition.coords.latitude,
    ]);
    setLocationChanged(false);
  };

  useEffect(() => {
    //call 'checkPermission' every time something in the function is changed.
    checkPermission();
  }, [checkPermission]);

  return (
    <View style={styles.container}>
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
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          // ref={c => (MapboxGL.MapView._map = c)}
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Light}
          onRegionIsChanging={onRegionIsChanging}
          onRegionDidChange={onRegionDidChange}>
          {/* Display user location */}
          {/* Checks if the user has granted location permission to the app. */}
          {locationPermissionGranted && (
            <>
              {/* <MapboxGL.Camera followZoomLevel={15} followUserLocation /> */}
              <MapboxGL.UserLocation visible onUpdate={userLocationUpdate} />
            </>
          )}
          <MapboxGL.Camera
            followZoomLevel={15}
            zoomLevel={15}
            followUserLocation={followUserLocation}
            centerCoordinate={centerCoordinate}
          />
        </MapboxGL.MapView>
      </View>

      <View style={styles.searchBarContainer}>
        {/* Display Search bar  */}
        <SearchBar fontSize={16} marginHorizontal={20} />
      </View>

      <IconButton
        style={{position: 'absolute', right: 10, bottom: 80}}
        icon={locationChanged ? 'crosshairs' : 'crosshairs-gps'}
        color={Colors.primary}
        size={40}
        onPress={findMyLocation}
      />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
  },
  modalView: {
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    marginTop: 300,
    paddingHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 20,
    width: Dimensions.get('window').width - 50,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 30,
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

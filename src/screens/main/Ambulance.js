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
import {PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {io} from 'socket.io-client';

import MapboxGL from '@react-native-mapbox-gl/maps';
import Colors from '../../constants/colors';
import {CustomButton} from '../../components/general/CustomButton';
import {CustomText} from '../../components/general/CustomText';
import {IconButton} from 'react-native-paper';
import {MapTypeModal} from '../../components/home/MapTypeModal';
import {RenderDirection} from '../../components/general/RenderDirection';

import {PermissionModal} from '../../components/permissions/PermissionModal';
import {requestPermissions} from '../../services/permissions/requestPermissions';
import {LOCATION_PERMISSION_MESSAGE} from '../../constants/string/requestPermissions/requestPermissions';

const dimensionHeight = Dimensions.get('window').height;
const dimensionWidth = Dimensions.get('window').width;

// const io = require('socket.io-client/dist/socket.io');

const SOCKETIO_SERVER_URL = 'http://127.0.0.1:5000';

var userType = 'u';
var userId = 'userId' + Math.random();

const USER_TYPES = {
  USER: 'u',
  AMBULANCE: 'a',
  HEALTH_FACILITY: 'h',
};

const NAMESPACES = {
  USER: '/USER_NAMESPACE',
  AMBULANCE: '/AMBULANCE_NAMESPACE',
};
const EVENTS = {
  AMBULANCE_ONLINE: '0',
  // AMBULANCE_STATUS_CHANGE : '1',
  AMBULANCE_STATUS_CHANGED: '2',
  APPOINT_AMBULANCE: '3',
  // APPOINTMENT_REQUEST : '4', //might add amb to differentiate from hf later...
  // ACCEPT_APPOINTMENT : '5', //
  // DECLINE_APPOINTMENT : '6', //
  APPOINTMENT_ACCEPTED: '7', //
  APPOINTMENT_DECLINED: '8', //
  // LOCATION_TO_USER : '9',
  LOCATION_FROM_AMBULANCE: '10',
  LOCATION_TO_AMBULANCE: '11',
  // LOCATION_FROM_USER : '12',
  // AMBULANCE_LOCATION_UPDATE : '13',
  AMBULANCE_LOCATION_UPDATED: '14',
  AMBULANCE_OFFLINE: '15',
  ADD_EMERGENCY_CONTACTS: '16',
  REMOVE_EMERGENCY_CONTACTS: '17',
  UPDATE_EMERGENCY_CONTACTS: '18',
  LOCATION_TO_EMERGENCY_CONTACTS: '19',
  LOCATION_FROM_EMERGENCY_CONTACTS: '20',
  ALERT_NEAR_AMBULANCE: '21',
  // EMERGENCY_ALERT : '22',
  CANT_FIND_AMBULANCE: '23',
  ABORTED: '27',
  HAVE_REACHED: '28',
  FINISHED: '29',
};

switch (userType) {
  case USER_TYPES.AMBULANCE:
    var namespace = NAMESPACES.AMBULANCE;
    break;
  case USER_TYPES.USER:
    var namespace = NAMESPACES.USER;
    break;
  default:
    throw 'Invalid user_type trying to connect with socketio server.';
}

const ambuAppState = {
  // logged_in_user_id: userID,
  // user_type: USER_TYPES.USER,
  in_appointment_with: {
    ambulanceID: null, //useful?
  },
};

const LS_UPDATE_INTERVAL = 5_00;

const locationToAmbulance = (ambulanceID, lng, lat, socket) => {
  data = {
    /*ambulanceID: state.logged_in_user_id,*/ coordinates: [lng, lat],
    ambulanceID: ambulanceID,
  };
  // console.log('location to ambulance: ', data, socket);

  socket.emit(EVENTS.LOCATION_TO_AMBULANCE, data);
};

ambuAppState.streams = {
  LS: {
    key: null,
    start: (ambulanceID, lng, lat, socket) => {
      ambuAppState.streams.LS.key = setInterval(
        locationToAmbulance,
        LS_UPDATE_INTERVAL,
        ambulanceID,
        lng,
        lat,
        socket,
      );
    },
    stop: () => {
      clearInterval(ambuAppState.streams.LS.key);
    },
  },
};

var connection_url = SOCKETIO_SERVER_URL + namespace;

const Ambulance = ({navigation}) => {
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
  const [locationFromMapboxLng, setLocationFromMapboxLng] = useState(); // User's current position tracked from the mapboxGL userLocation - Longitude
  const [locationFromMapboxLat, setLocationFromMapboxLat] = useState(); // User's current position tracked from the mapboxGL userLocation - Latitude
  const [mapTypeVisibility, setMapTypeVisibility] = useState(false); // MapType modal visibility
  const [route, setRoute] = useState(null);
  const startValueMoveY = useRef(new Animated.Value(0)).current; // Initial value of move Y animated for the location
  // const [driverNameVisibility, setDriverNameVisibility] = useState(false);
  // turn on and off when ambulance is called
  // const [ambulanceCalled, setAmbulanceCalled] = useState(false);

  const [ambulanceId, setAmbulanceId] = useState(null);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);
  const [callingAmbulance, setCallingAmbulance] = useState(false);

  const socketRef = useRef();
  // Exit the app and go to settings. This function is called when the 'Go to settings' button in the permission denied modal is pressed.

  // const locationToAmbulance = useCallback(
  //   ambulanceID => {
  //     if (stream) {
  //       data = {
  //         /*ambulanceID: state.logged_in_user_id,*/ coordinates: [
  //           userPositionLng,
  //           userPositionLat,
  //         ],
  //         ambulanceID: ambulanceID,
  //       };
  //       socket.emit(EVENTS.LOCATION_TO_AMBULANCE, data);
  //     }
  //   },
  //   [userPositionLng, userPositionLat, stream],
  // );

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

  // Will be called when ambulance appointment is accepted by one of the ambulances
  const locationToAmbulance = (lng, lat) => {
    socketRef.current.emit(EVENTS.LOCATION_TO_AMBULANCE, {
      coordinates: [lng, lat],
      ambulanceId: ambulanceId,
    });
  };

  // Will be called when the user location is updated/changed
  const userLocationUpdate = async location => {
    if (location) {
      let lng = location.coords.longitude;
      let lat = location.coords.latitude;

      if (!locationFromMapboxLat || !locationFromMapboxLng) {
        setLocationFromMapboxLng(lng);
        setLocationFromMapboxLat(lat);
        refUserLocation.current = {longitude: lng, latitude: lat};
      } else {
        const distance = getDistance(
          {
            latitude: refUserLocation.current.latitude,
            longitude: refUserLocation.current.longitude,
          },
          {latitude: lat, longitude: lng},
        );
        // console.log(distance);

        // The distance limit to change the location coordiantes
        if (distance > 20) {
          setLocationFromMapboxLng(lng);
          setLocationFromMapboxLat(lat);
          if (appointmentAccepted) {
            locationToAmbulance(lng, lat); // Send user location to the ambulance every time location coordinates are changed.
          }
          refUserLocation.current = {longitude: lng, latitude: lat};
        }
      }
    }
  };

  // get current location
  const getCurrentLocation = useCallback(() => {
    return [userPositionLng, userPositionLat];
  }, [userPositionLng, userPositionLat]);

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
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    await _camera.flyTo([userPositionLng, userPositionLat]);
  };

  // Choose the Map type that'll be displayed
  // const chooseMapType = mapType => {
  //   if (mapType === streetStyleURL) {
  //     setStyleUrl(streetStyleURL);
  //   } else if (mapType === lightStyleURL) {
  //     setStyleUrl(lightStyleURL);
  //   } else if (mapType === darkStyleURL) {
  //     setStyleUrl(darkStyleURL);
  //   } else if (mapType === satelliteStyleURL) {
  //     setStyleUrl(satelliteStyleURL);
  //   }
  //   setMapTypeVisibility(false);
  // };

  const getDirections = useCallback(async (startLoc, destLoc) => {
    const res = await axios.get(
      `https://api.geoapify.com/v1/routing?waypoints=${startLoc.latitude},${startLoc.longitude}|${destLoc.latitude},${destLoc.longitude}&mode=drive&apiKey=${geoApifyAccessToken}`,
    );

    const coordinates = res.data.features[0].geometry.coordinates[0];
    const routeLineString = makeLineString(coordinates, {name: 'line 1'});
    setRoute(routeLineString);
  }, []);

  // locationButton animation move Y direction
  const animatedMove = (endValue, duration) => {
    Animated.timing(startValueMoveY, {
      toValue: endValue,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const onDriverNamePositionChange = ambuCalled => {
    if (ambuCalled) {
      animatedMove(-10, 50);
    } else if (!ambuCalled) {
      animatedMove(90, 50);
    }
  };

  useEffect(() => {
    onDriverNamePositionChange(ambulanceCalled);
  });

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

  useEffect(() => {
    socketRef.current = io(connection_url, {
      // forceNew : true,
      auth: {
        token: {
          id: userId,
          iat: '',
          expiry: '',
        },
        userID: userId,
      },
    });
    // console.log('socketref: ', socketRef.current);
    // console.log('io: ', io);

    // on Connect
    socketRef.current.on('connect', data => {
      console.log('connected hoy hoy hoy: ', data);
    });

    // When no Ambulance is found
    socketRef.current.on(EVENTS.CANT_FIND_AMBULANCE, data => {
      console.table({event: 'CANT_FIND_AMBULANCE'});
      console.log(">>>>>> Can't find ambulances. Try again");
      setCallingAmbulance(false);
      setCanNotFindAmbulance(true);
    });

    //when an ambulance is found
    socketRef.current.on(EVENTS.LOCATION_FROM_AMBULANCE, data => {
      console.log(`Ambulance at ${data.coordinates}`);
    });

    socketRef.current.on(EVENTS.APPOINTMENT_ACCEPTED, data => {
      // start LS
      // state.streams.LS.start(data.ambulanceID);
      // state.in_appointment_with.ambulanceID = data.ambulanceID;
      setAppointmentAccepted(true);
      setAmbulanceId(data.ambulanceID);
      setCallingAmbulance(false);
    });

    // on Aborted
    socketRef.current.on(EVENTS.ABORTED, data => {
      // stop LS
      // ambuAppState.streams.LS.stop();
      setAppointmentAccepted(false);

      // ambuAppState.in_appointment_with.ambulanceID = null;
      setAmbulanceId(null);

      console.log('Ambulance aborted');
    });

    // on Reached
    socketRef.current.on(EVENTS.HAVE_REACHED, data => {
      // stop LS
      // ambuAppState.streams.LS.stop();
      setAppointmentAccepted(false);

      console.log('Ambulance reached your location');
    });

    // on Finished
    socketRef.current.on(EVENTS.FINISHED, data => {
      // ambuAppState.in_appointment_with.ambulanceID = null;
      setAmbulanceId(null);
      setAppointmentAccepted(false);
      console.log('Job finished');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const callAmbulance = () => {
    setCallingAmbulance(true);
    socketRef.current.emit(
      EVENTS.ALERT_NEAR_AMBULANCE,
      {
        coordinates: [userPositionLng, userPositionLat],
        userID: userId,
      }, //,
      // (response)=>console.log(response)
    );
  };

  useEffect(() => {
    if (locationFromMapboxLng && locationFromMapboxLat) {
      getDirections(
        {longitude: locationFromMapboxLng, latitude: locationFromMapboxLat},
        {longitude: 38.763611, latitude: 9.005401},
      );
    }
  }, [getDirections, locationFromMapboxLat, locationFromMapboxLng]);

  // console.log('socket:', socket, io);
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
          compassViewMargins={{x: 10, y: (23 * dimensionHeight) / 100}}
          style={styles.map}
          surfaceView>
          {/* Display user location */}
          {/* Checks if the user has granted location permission to the app. */}
          {locationPermissionGranted && (
            <>
              <MapboxGL.Camera
                zoomLevel={15}
                centerCoordinate={[userPositionLng, userPositionLat]}
              />
              <MapboxGL.UserLocation
                visible={true}
                onUpdate={userLocationUpdate}
              />
              {route ? <RenderDirection route={route} /> : null} //If there is
              route, draw route from given source to destination
            </>
          )}
          <MapboxGL.Camera
            ref={c => (_camera = c)}
            zoomLevel={15}
            centerCoordinate={[userPositionLng, userPositionLat]}
          />
        </MapboxGL.MapView>
      </View>

      {/* status bar display only when ambulance is called */}
      {ambulanceCalled && (
        <View style={styles.statusBarContainer}>
          {/* Display arriving status  */}
          <View style={styles.statusBar}>
            <CustomText
              content="Ambulance Arriving in 2 seconds"
              fontWeight="bold"
              fontColor={Colors.primary}
              fontSize={18}
            />
          </View>
        </View>
      )}

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

      {/* Bottom View  */}
      <View style={styles.bottomView}>
        <View style={styles.bottomButtonContainer}>
          {/* trinary condition () ? true : false */}
          {ambulanceCalled ? (
            // Display if ambulance called
            <CustomButton
              onPress={e => {
                setAmbulanceCalled(false);
              }}
              width={Dimensions.get('window').width - 50}
              backgroundColor={Colors.red}
              fontColor={Colors.white}
              title="Cancel Ambulance"
            />
          ) : (
            // Display if ambulance not called
            <CustomButton
              onPress={e => {
                // setAmbulanceCalled(true);
                callAmbulance();
              }}
              width={Dimensions.get('window').width - 50}
              backgroundColor={Colors.primary}
              fontColor={Colors.white}
              title="Call Ambulance"
            />
          )}
        </View>
        {ambulanceCalled && (
          <View style={styles.driveDetailsContainer}>
            <View style={styles.driverImageContainer}>
              <Image
                style={styles.driverImage}
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                }}
              />
            </View>
            <View style={styles.driveDescription}>
              <CustomText
                content="Driver Name"
                fontSize={20}
                fontWeight="bold"
                customStyles={styles.nameGap}
              />
              <CustomText
                content="+251 960021405"
                fontSize={16}
                fontColor={Colors.gray}
              />
            </View>
          </View>
        )}
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
    top: (5 * dimensionHeight) / 100,
    right: 10,
  },
  mapIcon: {
    color: Colors.white,
  },
  locationButtonContainer: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 240,
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
  statusBarContainer: {
    position: 'absolute',
    top: 30,
  },
  statusBar: {
    flex: 1,
    backgroundColor: Colors.white,
    color: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    paddingVertical: 20,
    width: Dimensions.get('window').width,
  },

  bottomView: {
    position: 'absolute',
    bottom: 35,
    width: Dimensions.get('window').width,
  },
  bottomButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  driveDetailsContainer: {
    backgroundColor: Colors.whiteSmoke,
    flex: 1,
    flexDirection: 'row',
    height: 120,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  driverImageContainer: {
    height: 80,
    width: 80,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    marginRight: 20,
  },
  driverImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  driveDescription: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
  },
  nameGap: {paddingBottom: 3},
});

export default Ambulance;

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
  Switch,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useId,
} from "react";
import {PERMISSIONS, RESULTS, openSettings} from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import {io} from "socket.io-client";
import {lineString as makeLineString} from "@turf/helpers";
import {getDistance} from "geolib";
import axios from "axios";

import MapboxGL from "@react-native-mapbox-gl/maps";
import Colors from "../../constants/colors";
import {CustomButton} from "../../components/general/CustomButton";
import {CustomText} from "../../components/general/CustomText";
import {IconButton} from "react-native-paper";
import {MapTypeModal} from "../../components/home/MapTypeModal";
import {RenderDirection} from "../../components/general/RenderDirection";

import {PermissionModal} from "../../components/permissions/PermissionModal";
import {requestPermissions} from "../../services/permissions/requestPermissions";
import {LOCATION_PERMISSION_MESSAGE} from "../../constants/string/requestPermissions/requestPermissions";
import Spinner from "react-native-spinkit";
import colors from "../../constants/colors";

const dimensionHeight = Dimensions.get("window").height;
const dimensionWidth = Dimensions.get("window").width;

// const io = require('socket.io-client/dist/socket.io');

const SOCKETIO_SERVER_URL = "https://rts-mdx.herokuapp.com";

const geoApifyAccessToken = "87d55356e5ab47dab8be60202bb80ae3";

// TODO: change the userType, useId and ambulanceId to be dynamic
var userType = "a";
var ambulanceID = "ambulanceId" + Math.random();

const USER_TYPES = {
  USER: "u",
  AMBULANCE: "a",
  HEALTH_FACILITY: "h",
};

const AMBULANCE_STATUS = {
  FREE: "FREE",
  BUZY: "BUZY",
};

const NAMESPACES = {
  USER: "/USER_NAMESPACE",
  AMBULANCE: "/AMBULANCE_NAMESPACE",
};
const EVENTS = {
  // AMBULANCE_ONLINE : '0',
  AMBULANCE_STATUS_CHANGE: "1",
  // AMBULANCE_STATUS_CHANGED : '2',
  // APPOINT_AMBULANCE : '3',
  APPOINTMENT_REQUEST: "4", //might add amb to differentiate from hf later...
  ACCEPT_APPOINTMENT: "5", //
  DECLINE_APPOINTMENT: "6", //
  // APPOINTMENT_ACCEPTED : '7', //
  // APPOINTMENT_DECLINED : '8', //
  LOCATION_TO_USER: "9",
  // LOCATION_FROM_AMBULANCE : '10',
  // LOCATION_TO_AMBULANCE : '11',
  LOCATION_FROM_USER: "12",
  AMBULANCE_LOCATION_UPDATE: "13",
  // AMBULANCE_LOCATION_UPDATED : '14',
  // AMBULANCE_OFFLINE : '15',
  // ADD_EMERGENCY_CONTACTS : '16',
  // REMOVE_EMERGENCY_CONTACTS : '17',
  // UPDATE_EMERGENCY_CONTACTS : '18',
  // LOCATION_TO_EMERGENCY_CONTACTS : '19',
  // LOCATION_FROM_EMERGENCY_CONTACTS : '20',
  // ALERT_NEAR_AMBULANCE : '21',
  EMERGENCY_ALERT: "22",
  ABORT: "24",
  REACHED: "25",
  FINISH: "26",
};

switch (userType) {
case USER_TYPES.AMBULANCE:
  var namespace = NAMESPACES.AMBULANCE;
  break;
case USER_TYPES.USER:
  var namespace = NAMESPACES.USER;
  break;
default:
  throw "Invalid user_type trying to connect with socketio server.";
}

// const ambuAppState = {
//   // logged_in_user_id: userID,
//   // user_type: USER_TYPES.USER,
//   in_appointment_with: {
//     ambulanceID: null, //useful?
//   },
// };

// const LS_UPDATE_INTERVAL = 5_00;

// const locationToAmbulance = (ambulanceID, lng, lat, socket) => {
//   data = {
//     /*ambulanceID: state.logged_in_user_id,*/ coordinates: [lng, lat],
//     ambulanceID: ambulanceID,
//   };
//   // console.log('location to ambulance: ', data, socket);

//   socket.emit(EVENTS.LOCATION_TO_AMBULANCE, data);
// };

// ambuAppState.streams = {
//   LS: {
//     key: null,
//     start: (ambulanceID, lng, lat, socket) => {
//       ambuAppState.streams.LS.key = setInterval(
//         locationToAmbulance,
//         LS_UPDATE_INTERVAL,
//         ambulanceID,
//         lng,
//         lat,
//         socket,
//       );
//     },
//     stop: () => {
//       clearInterval(ambuAppState.streams.LS.key);
//     },
//   },
// };

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
  const [driverNameVisibility, setDriverNameVisibility] = useState(false);
  // turn on and off when ambulance is called
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);
  const [ambulanceAborted, setAmbulanceAborted] = useState();
  const [userId, setUserId] = useState();
  const [showFinishButton, setShowFinishButton] = useState(false);

  // const [ambulanceId, setAmbulanceId] = useState(null);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);
  const [callingAmbulance, setCallingAmbulance] = useState(false);
  const [canNotFindAmbulance, setCanNotFindAmbulance] = useState(false);
  const [locationFromUser, setLocationFromUser] = useState();
  const [ambulanceHasReached, setAmbulanceHasReached] = useState();
  const [isFree, setIsFree] = useState(false);
  const [isInAppointment, setIsInAppointment] = useState(false);
  const [emergencyReceived, setEmergencyReceived] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

  const refUserLocation = useRef();

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
    openSettings().catch(() => console.warn("Can not open settings"));
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
  const locationToUser = (lng, lat) => {
    socketRef.current.emit(EVENTS.LOCATION_TO_USER, {
      coordinates: [lng, lat],
      useID: userId,
    });
  };

  const ambulanceLocationUpdate = (lng, lat) => {
    socketRef.current.emit(EVENTS.AMBULANCE_LOCATION_UPDATE, {
      coordinates: [lng, lat],
      ambulanceID: ambulanceID,
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
        if (isInAppointment) {
          locationToUser(lng, lat);
          // Send user location to the ambulance every time location coordinates are changed.
          console.log("sending location to user");
        }
        if (isFree) {
          ambulanceLocationUpdate(lng, lat);
          console.log("sending location to server");
        }

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

  // get the of the given starting and ending point coordinates
  const getDirections = useCallback(async (startLoc, destLoc) => {
    const res = await axios.get(
      `https://api.geoapify.com/v1/routing?waypoints=${startLoc.latitude},${startLoc.longitude}|${destLoc.latitude},${destLoc.longitude}&mode=drive&apiKey=${geoApifyAccessToken}`,
    );

    const coordinates = res.data.features[0].geometry.coordinates[0];
    const routeLineString = makeLineString(coordinates, {name: "line 1"});
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

  // on is free pressed
  const onFreePressed = () => {
    setIsFree(true);
    const statusString = AMBULANCE_STATUS.FREE;
    socketRef.current.emit(EVENTS.AMBULANCE_STATUS_CHANGE, {
      ambulanceID: ambulanceID,
      status: statusString,
    });
  };

  // on is busy pressed
  const onBusyPressed = () => {
    setIsFree(false);
    const statusString = AMBULANCE_STATUS.BUZY;
    socketRef.current.emit(EVENTS.AMBULANCE_STATUS_CHANGE, {
      ambulanceID: ambulanceID,
      status: statusString,
    });
  };

  // on accept pressed
  const onAcceptEmergency = () => {
    onBusyPressed();
    setEmergencyReceived(false);
    socketRef.current.emit(EVENTS.ACCEPT_APPOINTMENT, {
      userID: userId,
      ambulanceID: ambulanceID,
    });
    setIsInAppointment(true);
    console.log("appointement accepted");
  };

  const onDeclineEmergency = () => {
    setEmergencyReceived(false);
    setUserId(null);
    socketRef.current.emit(EVENTS.DECLINE_APPOINTMENT, {
      userID: userId,
      coordinates: alertInfo.coordinate,
      ambulanceID: ambulanceID,
      try: alertInfo.try,
      failedAmbulances: alertInfo.failedAmbulances,
    });
  };

  const onReach = () => {
    setIsInAppointment(false);
    setShowFinishButton(true);
    socketRef.current.emit(EVENTS.REACHED, {userID: userId});
  };

  const onFinish = () => {
    setUserId(null);
    setShowFinishButton(false);
    socketRef.current.emit(EVENTS.FINISH, {userID: userId});
  };

  const onAborted = () => {
    setUserId(null);
    setIsInAppointment(false);
    socketRef.current.emit(EVENTS.ABORT, {userID: userId});
  };

  useEffect(() => {
    socketRef.current = io(connection_url, {
      // forceNew : true,
      auth: {
        token: {
          id: ambulanceID,
          iat: "",
          expiry: "",
        },
        ambulanceID: ambulanceID,
      },
    });
    // console.log('socketref: ', socketRef.current);
    // console.log('io: ', io);

    // on Connect
    socketRef.current.on("connect", data => {
      console.log("connected hoy hoy hoy: ", data, connection_url);
    });

    // When an emergency alert is emitted
    socketRef.current.on(EVENTS.EMERGENCY_ALERT, (data, ack) => {
      setEmergencyReceived(true);
      setUserId(data.userID);
      setLocationFromUser(data.coordinates);
      setAlertInfo({
        coordinates: data.coordinates,
        try: data.try,
        failedAmbulances: data.failedAmbulances,
      });
      console.table({
        event: "EMERGENCY_ALERT",
        userID: data.userID,
        coordinates: data.coordinates,
      });
    });

    // When an appointment is accepted
    socketRef.current.on(EVENTS.LOCATION_FROM_USER, data => {
      console.log(`User at ${data.coordinates}`);
      setLocationFromUser(data.coordinates);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (locationFromMapboxLng && locationFromMapboxLat && locationFromUser) {
      getDirections(
        {longitude: locationFromMapboxLng, latitude: locationFromMapboxLat},
        {longitude: locationFromUser[0], latitude: locationFromUser[1]},
      );
    }
  }, [
    getDirections,
    locationFromMapboxLat,
    locationFromMapboxLng,
    locationFromUser,
  ]);

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
        buttonLeftTitle={"Close App"}
        buttonRightTitle={"Give Permission"}
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
        buttonLeftTitle={"Close App"}
        buttonRightTitle={"Go to settings"}
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
          compassViewMargins={{x: 10, y: (40 * dimensionHeight) / 100}}
          style={styles.map}
          surfaceView>
          {/* Display user location */}
          {/* Checks if the user has granted location permission to the app. */}
          {locationPermissionGranted && (
            <>
              <MapboxGL.Camera
                zoomLevel={15}
                followUserLocation
                centerCoordinate={[userPositionLng, userPositionLat]}
              />
              <MapboxGL.UserLocation
                visible={true}
                onUpdate={userLocationUpdate}
              />
              {/* If there is route, draw route from given source to destination  */}
              {locationFromUser && userId ? (
                <MapboxGL.PointAnnotation
                  id={JSON.stringify(userId)}
                  coordinate={locationFromUser}
                />
              ) : null}
              {route && userId ? <RenderDirection route={route} /> : null}
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
      {/* Calling ambulance */}
      {emergencyReceived && !appointmentAccepted && (
        <View style={styles.statusBarContainer}>
          {/* Display arriving status  */}

          <View style={[styles.statusBar, {flexDirection: "column"}]}>
            <View style={styles.spinnerText}>
              <CustomText
                content="Emergency Call   "
                fontWeight="bold"
                fontColor={Colors.primary}
                fontSize={18}
              />
              <Spinner
                isVisible
                type="Wave"
                size={25}
                color={colors.primary}
                style={{marginTop: 5}}
              />
            </View>

            <View style={{flexDirection: "row"}}>
              <CustomButton
                title={"Accept"}
                width={150}
                onPress={onAcceptEmergency}
                customStyle={{marginRight: 5}}
                backgroundColor={colors.green}
              />
              <CustomButton
                title={"Decline"}
                width={150}
                onPress={onDeclineEmergency}
                backgroundColor={colors.red}
              />
            </View>
          </View>
        </View>
      )}
      {/* <CustomText
              content="Looking for nearby ambulances  "
              fontWeight="bold"
              fontColor={Colors.primary}
              fontSize={18}
            />
            
            <Spinner isVisible type='Wave' size={25} color={colors.primary} style={{marginTop:5}}/> */}

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
          icon={"crosshairs-gps"}
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
        {!isInAppointment && !emergencyReceived && !showFinishButton ? (
          <View style={styles.bottomButtonContainer}>
            <CustomButton
              title={"Free"}
              width={150}
              onPress={onFreePressed}
              customStyle={{borderRadius: 0}}
              backgroundColor={isFree ? colors.green : colors.secondary}
            />
            <CustomButton
              title={"Busy"}
              width={150}
              onPress={onBusyPressed}
              customStyle={{borderRadius: 0}}
              backgroundColor={!isFree ? colors.red : colors.secondary}
            />
          </View>
        ) : null}
        {isInAppointment ? (
          <View style={styles.bottomButtonContainer}>
            <CustomButton
              title={"Abort"}
              fontColor={colors.white}
              width={150}
              onPress={onAborted}
              customStyle={{marginRight: 5}}
              backgroundColor={colors.red}
            />
            <CustomButton
              title={"Reached"}
              fontColor={colors.white}
              width={150}
              onPress={onReach}
              backgroundColor={colors.primary}
            />
          </View>
        ) : null}
        {showFinishButton ? (
          <View style={styles.bottomButtonContainer}>
            <CustomButton
              title={"Finished"}
              width={150}
              onPress={onFinish}
              backgroundColor={colors.golden}
            />
          </View>
        ) : null}

        {appointmentAccepted && (
          <View style={styles.driveDetailsContainer}>
            <View style={styles.driverImageContainer}>
              <Image
                style={styles.driverImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    alignContent: "center",
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  mapIconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    position: "absolute",
    top: 130,
    right: 10,
  },
  mapIcon: {
    color: Colors.white,
  },
  locationButtonContainer: {
    backgroundColor: Colors.primary,
    position: "absolute",
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
    position: "absolute",
    top: 0,
  },
  statusBar: {
    flex: 1,
    backgroundColor: Colors.white,
    color: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    paddingVertical: 20,
    width: Dimensions.get("window").width,
  },

  bottomView: {
    position: "absolute",
    bottom: 35,
    width: Dimensions.get("window").width,
  },
  bottomButtonContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
  },
  driveDetailsContainer: {
    backgroundColor: Colors.whiteSmoke,
    flex: 1,
    flexDirection: "row",
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
    flexDirection: "column",
    paddingTop: 10,
  },
  nameGap: {paddingBottom: 3},
  spinnerText: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default Ambulance;

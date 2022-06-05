import {
  View,
  Switch,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';

import {CustomText} from '../../components/general/CustomText';
import {ToggleFeatures} from '../../components/emergency/ToggleFeatures';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
import {requestPermissions} from '../../services/permissions/requestPermissions';
import {PermissionModal} from '../../components/permissions/PermissionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Emergency = ({navigation}) => {
  const [automationToggle, setAutomationToggle] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [fallDetectionToggle, setFallDetectionToggle] = useState(false);
  const [fallDetectionToggleDisabled, setFallDetectionToggleDisabled] =
    useState(false);
  const [ambulanceServiceToggle, setAmbulanceServiceToggle] = useState(false);
  // const sendSmsPermission = PERMISSIONS.ANDROID.SEND_SMS;
  // const readSmsPermission = PERMISSIONS.ANDROID.READ_SMS;
  const [sendSmsPermissionGranted, setSendSmsPermissionGranted] =
    useState(false); // Whether the sendSms permission is granted
  const [sendSmsPermissionDenied, setSendSmsPermissionDenied] = useState(false); // Whether the sendSms permission is Denied
  const [sendSmsPermissionBlocked, setSendSmsPermissionBlocked] =
    useState(false); //Whether the sendSms permission is Denied

  const [smsPermissionBlockedModal, setSmsPermissionBlockedModal] =
    useState(false); // Whether the sendSms permission is granted
  const [smsPermissionDeniedModal, setSmsPermissionDeniedModal] =
    useState(false); // Whether the sendSms permission is granted

  // Exit the app and go to settings. This function is called when the 'Go to settings' button in the permission denied modal is pressed.
  const settings = () => {
    BackHandler.exitApp();
    openSettings().catch(() => console.warn('Can not open settings'));
  };

  const onAutomationChange = () => {
    setAutomationToggle(previousValue => !previousValue);
  };

  const onSmsToggleChange = () => {
    setSmsToggle(previousValue => !previousValue);
  };

  const onEmailToggleChange = () => {
    setEmailToggle(previousValue => !previousValue);
  };

  const onFallDetectionToggleChange = async () => {
    // setFallDetectionToggleDisabled(true);
    // await checkPermission();
    // setFallDetectionToggle(false);
    // if (sendSmsPermissionGranted && !fallDetectionToggle) {
    //   setFallDetectionToggle(previousValue => !previousValue);
    // } else if (fallDetectionToggle) {
    //   setFallDetectionToggle(previousValue => !previousValue);
    // }
    setFallDetectionToggle(previousValue => !previousValue);
  };

  const onAmbulanceToggleChange = () => {
    setAmbulanceServiceToggle(previousValue => !previousValue);
  };

  const checkPermission = useCallback(async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );

      if (result === true) {
        setSendSmsPermissionGranted(true);
        setSendSmsPermissionDenied(false);
        setSendSmsPermissionBlocked(false);
      } else if (result === false) {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
        );
        if (status === 'never_ask_again') {
          setSendSmsPermissionGranted(false);
          setSendSmsPermissionDenied(false);
          setSendSmsPermissionBlocked(true);
        } else if (status === 'denied') {
          setSendSmsPermissionGranted(false);
          setSendSmsPermissionDenied(true);
          setSendSmsPermissionBlocked(false);
        } else if (status === 'granted') {
          setSendSmsPermissionGranted(true);
          setSendSmsPermissionDenied(false);
          setSendSmsPermissionBlocked(false);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [
    setSendSmsPermissionGranted,
    setSendSmsPermissionDenied,
    setSendSmsPermissionBlocked,
  ]);

  useEffect(() => {
    var isMounted = true;
    if (isMounted) {
      const fallDetectionToggleChange = async () => {
        await checkPermission();
        if (sendSmsPermissionBlocked) {
          setFallDetectionToggleDisabled(true);
        }
      };
      fallDetectionToggleChange();
    }
    return () => {
      isMounted = false;
    };
  }, [checkPermission, fallDetectionToggleDisabled, sendSmsPermissionBlocked]);

  useEffect(() => {
    const storeToggleValues = async () => {
      await AsyncStorage.setItem(
        '@automationToggle',
        JSON.stringify(automationToggle),
      );
      await AsyncStorage.setItem('@smsToggle', JSON.stringify(smsToggle));
      await AsyncStorage.setItem('@emailToggle', JSON.stringify(emailToggle));
      await AsyncStorage.setItem(
        '@fallDetectionToggle',
        JSON.stringify(fallDetectionToggle),
      );
      await AsyncStorage.setItem(
        '@ambulanceServiceToggle',
        JSON.stringify(ambulanceServiceToggle),
      );
    };
    storeToggleValues();
  }, [
    emailToggle,
    ambulanceServiceToggle,
    automationToggle,
    fallDetectionToggle,
    smsToggle,
  ]);

  return (
    <View style={styles.container}>
      {/* Modal for denied permission*/}
      <PermissionModal
        TextContent={
          'MedXpert needs send sms permission to send emergency sms text to emergency contacts.'
        }
        buttonLeftOnPress={() => {
          // BackHandler.exitApp();
        }}
        buttonOnRightOnPress={async () => {
          await checkPermission(); // If button is clicked request permission again
        }}
        buttonLeftTitle={'Cancel'}
        buttonRightTitle={'Give Permission'}
        modalVisibility={sendSmsPermissionDenied}
      />

      {/* Modal for blocked permission */}
      <PermissionModal
        TextContent={
          'MedXpert needs send sms permission to send emergency sms text to emergency contacts. please go to settings and give send sms permission.'
        }
        buttonLeftOnPress={() => {
          BackHandler.exitApp();
        }}
        buttonOnRightOnPress={() => {
          settings(); // Go to permission settings
        }}
        buttonLeftTitle={'Close App'}
        buttonRightTitle={'Go to settings'}
        modalVisibility={sendSmsPermissionBlocked}
        buttonWidth={170}
      />
      {/* Emergency automation title and toggle */}
      <View style={styles.emergencyAutomation}>
        <View>
          <CustomText content={'Emergency automation'} fontSize={18} />
          <CustomText
            content={'Set automation for emergency purposes.'}
            fontSize={12}
          />
        </View>
        <View>
          <Switch
            trackColor={{false: colors.lightGray, true: colors.primary}}
            thumbColor={automationToggle ? colors.white : colors.gray}
            onValueChange={onAutomationChange}
            value={automationToggle}
          />
        </View>
      </View>

      {/* automation configs */}
      <ScrollView style={styles.configAutomation}>
        <View style={{marginBottom: 10}}>
          {/* Fall detection  */}
          <View style={styles.fallDetection}>
            {/* Toggle Fall detection */}
            <ToggleFeatures
              disabled={sendSmsPermissionBlocked}
              largeText={'Fall Detection'}
              largeTextFontColor={
                fallDetectionToggle ? colors.primary : colors.gray
              }
              smallText={'Send notifications when a possible fall is detected.'}
              borderRadius={{
                borderRadius: 30,
                borderBottomEndRadius: fallDetectionToggle ? 0 : 30,
              }}
              toggleFeature={fallDetectionToggle}
              onToggleChange={onFallDetectionToggleChange}
            />
            {/* configure where where to send emergency notice when possible fall is detected */}
            {fallDetectionToggle && (
              <View style={styles.fallDetectionSendTo}>
                {/* SMS toggle and Pressable */}
                <Pressable
                  onPress={() => {
                    navigation.navigate('AutomationSms');
                  }}>
                  <View
                    style={[styles.sendToSection, {borderBottomEndRadius: 0}]}>
                    <View style={styles.smsTxtIcon}>
                      <IconMaterialIcons
                        name="sms"
                        color={colors.primary}
                        style={[
                          styles.smsAndEmailIcons,
                          {
                            color: smsToggle ? colors.primary : colors.gray,
                          },
                        ]}
                        size={20}
                      />
                      <CustomText content={'SMS'} />
                    </View>
                    <Switch
                      trackColor={{
                        false: colors.lightGray,
                        true: colors.primary,
                      }}
                      thumbColor={smsToggle ? colors.white : colors.gray}
                      onValueChange={onSmsToggleChange}
                      value={smsToggle}
                    />
                  </View>
                </Pressable>
                {/* Email toggle  and Pressable*/}
                <Pressable
                  onPress={() => {
                    navigation.navigate('AutomationEmail');
                  }}>
                  <View style={styles.sendToSection}>
                    <View style={styles.emailTxtIcon}>
                      <IconMaterialIcons
                        name="email"
                        color={colors.primary}
                        style={[
                          styles.smsAndEmailIcons,
                          {
                            color: emailToggle ? colors.primary : colors.gray,
                          },
                        ]}
                        size={20}
                      />
                      <CustomText content={'email'} />
                    </View>
                    <Switch
                      trackColor={{
                        false: colors.lightGray,
                        true: colors.primary,
                      }}
                      thumbColor={emailToggle ? colors.white : colors.gray}
                      onValueChange={onEmailToggleChange}
                      value={emailToggle}
                    />
                  </View>
                </Pressable>
                <View />
              </View>
            )}
          </View>
          {/* Ambulance service */}
          <ToggleFeatures
            largeText={'Ambulance Service'}
            largeTextFontColor={
              ambulanceServiceToggle ? colors.primary : colors.gray
            }
            smallText={
              'An ambulance service for faster access to health care facilities, specially in emergency cases.'
            }
            toggleFeature={ambulanceServiceToggle}
            onToggleChange={onAmbulanceToggleChange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 10,
    paddingTop: 20,
  },
  emergencyAutomation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  configAutomation: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  sendToSection: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    marginLeft: 50,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 30,
    elevation: 0.5,
  },
  fallDetectionSendTo: {},
  smsTxtIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailTxtIcon: {
    flexDirection: 'row',
  },
  smsAndEmailIcons: {marginRight: 10},
});

export default Emergency;

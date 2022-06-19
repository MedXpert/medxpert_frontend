import {
  View,
  Switch,
  StyleSheet,
  Pressable,
  ScrollView,
  BackHandler,
  PermissionsAndroid,

} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from "react-native-permissions";

import {CustomText} from "../../components/general/CustomText";
import {ToggleFeatures} from "../../components/emergency/ToggleFeatures";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../../constants/colors";
import {requestPermissions} from "../../services/permissions/requestPermissions";
import {PermissionModal} from "../../components/permissions/PermissionModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {removeAsyncStorages} from "../../services/removeAsyncStorages";

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
    openSettings().catch(() => console.warn("Can not open settings"));
  };

  // When Emergency automation switch is toggled.
  const onAutomationChange = async newVal => {
    checkPermission();
    if(sendSmsPermissionGranted){
      setAutomationToggle(newVal);
      const automationToggleFromAsyncStorage = await AsyncStorage.getItem(
        "@automationToggle",
      );
      // If there is no automationToggle value stored in AsyncStorage and newVal is true, then store 'true' in AsyncStorage automationToggle.
      if (!automationToggleFromAsyncStorage && newVal) {
        await AsyncStorage.setItem("@automationToggle", "true");
      // Else Just remove the toggle value from AsyncStorage.
      } else {
        await removeAsyncStorages([
          "@automationToggle",
          "@fallDetectionToggle",
          "@smsToggle",
          "@emailToggle",
        ]);
        setFallDetectionToggle(false);
      }
    }
    
  };

  // When Fall Detection switch is toggled.
  const onFallDetectionToggleChange = async newVal => {
    setFallDetectionToggle(newVal);
    const fallDetectionToggleFromAsyncStorage = await AsyncStorage.getItem(
      "@fallDetectionToggle",
    );

    if (!fallDetectionToggleFromAsyncStorage && newVal) {
      await AsyncStorage.setItem(
        "@fallDetectionToggle",
        "true",
      );
    } else {
      setSmsToggle(false);
      setEmailToggle(false);
      // Remove toggle values from AsyncStorage.
      await removeAsyncStorages([
        "@smsToggle",
        "@emailToggle",
        "@fallDetectionToggle",
      ]);
    }
  };

  const onSmsToggleChange = async newVal => {
    setSmsToggle(newVal);
    const smsToggleFromAsyncStorage = await AsyncStorage.getItem("@smsToggle");
    if (!smsToggleFromAsyncStorage && newVal) {
      await AsyncStorage.setItem("@smsToggle", "true");
    } else {
      await AsyncStorage.removeItem("@smsToggle");
    }
  };

  const onEmailToggleChange = async newVal => {
    setEmailToggle(newVal);
    const emailToggleFromAsyncStorage = await AsyncStorage.getItem(
      "@emailToggle",
    );

    if (!emailToggleFromAsyncStorage && newVal) {
      await AsyncStorage.setItem("@emailToggle", "true");
    } else {
      await AsyncStorage.removeItem("@emailToggle");
    }
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
        if (status === "never_ask_again") {
          setSendSmsPermissionGranted(false);
          setSendSmsPermissionDenied(false);
          setSendSmsPermissionBlocked(true);
        } else if (status === "denied") {
          setSendSmsPermissionGranted(false);
          setSendSmsPermissionDenied(true);
          setSendSmsPermissionBlocked(false);
        } else if (status === "granted") {
          setSendSmsPermissionGranted(true);
          setSendSmsPermissionDenied(false);
          setSendSmsPermissionBlocked(false);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [
    setSendSmsPermissionGranted,
    setSendSmsPermissionDenied,
    setSendSmsPermissionBlocked,
  ]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  useEffect(() => {
    // Check automationToggle value from AsyncStorage.
    const setAutomationFromAsyncStorage = async () => {
      const automationToggleFromAsyncStorage = await AsyncStorage.getItem(
        "@automationToggle",
      );
      if (automationToggleFromAsyncStorage) {
        setAutomationToggle(true);
      } else {
        setAutomationToggle(false);
      }
    };

    // Check fallDetectionToggle value from AsyncStorage.
    const setFallDetectionFromAsyncStorage = async () => {
      console.log("inside fallDetectionToggleFromAsyncStorage");
      const fallDetectionToggleFromAsyncStorage = await AsyncStorage.getItem(
        "@fallDetectionToggle",
      );
      if (fallDetectionToggleFromAsyncStorage) {
        setFallDetectionToggle(true);
        const smsToggleFromAsyncStorage = await AsyncStorage.getItem(
          "@smsToggle",
        );
        if (smsToggleFromAsyncStorage) {
          setSmsToggle(true);
        }
        else {
          setSmsToggle(false);
        }
        const emailToggleFromAsyncStorage = await AsyncStorage.getItem(
          "@emailToggle",
        );
        // Set smsToggle and emailToggle to true if fallDetectionToggle and smsToggle and emailToggle are true.
       
        if (emailToggleFromAsyncStorage) {
          setEmailToggle(true);
        }else{
          setEmailToggle(false);
        }
      } else {
        setFallDetectionToggle(false);
        setSmsToggle(false);
        setEmailToggle(false);
        await removeAsyncStorages(["@smsToggle", "@emailToggle"]);
      }
    };

    setAutomationFromAsyncStorage();
    setFallDetectionFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (automationToggle) {
      setFallDetectionToggleDisabled(false); 
    } else {
      setFallDetectionToggle(false);
      setFallDetectionToggleDisabled(true);
    }
  }, [automationToggle]);

  return (
    <View style={styles.container}>
      {/* Modal for denied permission*/}
      <PermissionModal
        TextContent={
          "MedXpert needs send sms permission to send emergency sms text to emergency contacts."
        }
        buttonLeftTitle={"Go to Home"}
        buttonLeftOnPress={() => {
          navigation.navigate("Home");
        }}
        buttonRightTitle={"Give Permission"}
        buttonOnRightOnPress={async () => {
          await checkPermission(); // If button is clicked request permission again
        }}
        modalVisibility={sendSmsPermissionDenied}
        buttonWidth={150}
      />

      {/* Modal for blocked permission */}
      <PermissionModal
        TextContent={
          "MedXpert needs send sms permission to send emergency sms text to emergency contacts. please go to settings and give send sms permission."
        }
        buttonLeftTitle={"Go to Home"}
        buttonLeftOnPress={() => {
          navigation.navigate("Home");
        }}
        buttonRightTitle={"Go to settings"}
        buttonOnRightOnPress={() => {
          settings(); // Go to permission settings
        }}
        modalVisibility={sendSmsPermissionBlocked}
        buttonWidth={150}
        height={190}
      />
      {/* Emergency automation title and toggle */}
      <View style={styles.emergencyAutomation}>
        <View>
          <CustomText content={"Emergency automation"} fontSize={18} />
          <CustomText
            content={"Set automation for emergency purposes."}
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
              disabled={fallDetectionToggleDisabled}
              largeText={"Fall Detection"}
              largeTextFontColor={
                fallDetectionToggle ? colors.primary : colors.gray
              }
              smallText={"Send notifications when a possible fall is detected."}
              borderRadius={{
                borderRadius: 30,
                borderBottomEndRadius: fallDetectionToggle ? 0 : 30,
              }}
              value={fallDetectionToggle}
              onValueChange={onFallDetectionToggleChange}
            />
            {/* configure where where to send emergency notice when possible fall is detected */}
            {fallDetectionToggle && (
              <View style={styles.fallDetectionSendTo}>
                {/* SMS toggle and Pressable */}
                <Pressable
                  disabled={!smsToggle}
                  onPress={() => {
                    navigation.push("AutomationSms");
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
                      <CustomText content={"SMS"} />
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
                  disabled={!emailToggle}
                  onPress={() => {
                    navigation.push("AutomationEmail");
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
                      <CustomText content={"email"} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  configAutomation: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  sendToSection: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 10,
    marginLeft: 50,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 30,
    elevation: 0.5,
  },
  fallDetectionSendTo: {},
  smsTxtIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emailTxtIcon: {
    flexDirection: "row",
  },
  smsAndEmailIcons: {marginRight: 10},
});

export default Emergency;

import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Dimensions,
} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {BackButton} from "../../../components/general/BackButton";
import {CustomText} from "../../../components/general/CustomText";
import colors from "../../../constants/colors";
import {ToggleAutomation} from "../../../components/emergency/ToggleAutomation/ToggleAutomation";
import {PhoneNumber} from "../../../components/emergency/PhoneNumber/PhoneNumber";
import {AddEmergencyPhoneModal} from "../../../components/emergency/AddEmergencyPhoneModal";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useEmergencyContacts} from "../../../hooks/emergencyContact";
import LoadingPage from "../../../components/general/LoadingPage";
import {showMessage, hideMessage} from "react-native-flash-message";

const AutomationSms = ({navigation}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);

  const {data, isSuccess, isError, isLoading, status, error, refetch} =
    useEmergencyContacts({
      type: "phone",
    });

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingPage /> : null}

      {isSuccess && data && (
        <>
          <View style={{marginLeft: -10}}>
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>

          <AddEmergencyPhoneModal
            modalText={
              "Please enter a phone number to add it to emergency contacts list."
            }
            modalVisible={modalVisibility}
            onRequestClose={() => {}}
            onPressLeftButton={() => {
              setModalVisibility(false);
              refetch();
            }}
            onPressRightButton={() => {
              setModalVisibility(false);
            }}
            placeholder={"Phone number"}
          />

          {/* phone numbers section */}
          <View style={styles.phoneNumbersContainer}>
            {/* add phone number */}
            <View style={[styles.listPhoneNumber, styles.addPhoneNumber]}>
              <IconFontAwesome
                name={"phone"}
                color={colors.primary}
                size={30}
              />
              <CustomText content={"Add phone number"} fontSize={15} />
              <IconEntypo
                name={"plus"}
                color={colors.primary}
                size={30}
                style={styles.phonePlusIcon}
                onPress={() => {
                  setModalVisibility(true);
                }}
              />
            </View>
            {/* List of added phone numbers */}
            <View style={styles.listOfPhoneNumbers}>
              {data.data.emergencyContact.length > 0 ? (
                <>
                  <View>
                    <CustomText
                      content={"List of phone numbers"}
                      fontSize={15}
                    />
                  </View>
                  <ScrollView>
                    {/* phone number component */}
                    <View style={{marginBottom: 60}}>
                      {data.data.emergencyContact.map(phoneInfo => (
                        <PhoneNumber
                          key={phoneInfo.id}
                          phoneNumber={phoneInfo.phone_number}
                          name={phoneInfo.name}
                          id={phoneInfo.id}
                        />
                      ))}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <View
                  style={{
                    height: Dimensions.get("screen").height - 300,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <CustomText content={"No contact found"} fontSize={20} />
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 10,
    paddingHorizontal: 15,
  },

  phoneNumbersContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
  },
  listPhoneNumber: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  addPhoneNumber: {
    borderRadius: 5,
    borderWidth: 0.5,
  },
  phoneNumber: {
    marginTop: 12,
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },

  listOfPhoneNumbers: {
    marginTop: 35,
  },

  phoneIconAndNumber: {
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
  },
  toggle: {
    height: 60,
    marginTop: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 5,
  },
});

export default AutomationSms;

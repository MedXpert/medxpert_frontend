import {View, StyleSheet} from "react-native";
import React from "react";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useDeleteEmergencyContact} from "../../../hooks/emergencyContact/useDeleteEmergencyContact";
import colors from "../../../constants/colors";
import {CustomText} from "../../general/CustomText";
import {useEmergencyContacts} from "../../../hooks/emergencyContact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage, hideMessage} from "react-native-flash-message";

const PhoneNumber = ({phoneNumber, name, id, deletedToast}) => {
  const deleteMutation = useDeleteEmergencyContact();

  const fetchPhone = useEmergencyContacts({
    type: "phone",
  });

  return (
    <View style={[styles.phoneNumberContainer]}>
      <View style={{marginBottom: 10, marginLeft: 10}}>
        <CustomText content={name} fontSize={18} />
      </View>
      <View style={styles.nameAndNumber}>
        <View style={styles.phoneIconAndNumber}>
          <View style={styles.phoneNumberIcon}>
            <IconFontAwesome name={"phone"} color={colors.primary} size={30} />
          </View>
          <CustomText content={phoneNumber} />
        </View>
        <IconMaterialIcons
          name={"cancel"}
          color={colors.red}
          size={25}
          onPress={() => {
            deleteMutation.mutate(id);
            const addEmergencyContacts = async () => {
              let emergencyConts = await AsyncStorage.getItem(
                "@emergencyContacts",
              );
              var storeToAsyncStorage = JSON.parse(emergencyConts);

              if (fetchPhone.isSuccess && fetchPhone.data) {
                const phoneNumbers = fetchPhone.data.data.emergencyContact;
                storeToAsyncStorage = [...storeToAsyncStorage, ...phoneNumbers];
              }
              await AsyncStorage.setItem(
                "@emergencyContacts",
                JSON.stringify(storeToAsyncStorage),
              );
              const sdsd = await AsyncStorage.getItem("@emergencyContacts");
              console.log(sdsd);
            };
            addEmergencyContacts();
            showMessage({
              message: "contact deleted",
              type: "danger",
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    // flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
    padding: 10,
  },
  nameAndNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listOfPhoneNumbers: {
    marginTop: 25,
  },
  phoneIconAndNumber: {
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
  },
  phoneNumberIcon: {
    marginRight: 10,
  },
});

export {PhoneNumber};

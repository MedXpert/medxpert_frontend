import {View, StyleSheet} from "react-native";
import React from "react";

import colors from "../../../constants/colors";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CustomText} from "../../general/CustomText";
import {useDeleteEmergencyContact} from "../../../hooks/emergencyContact/useDeleteEmergencyContact";
import {useEmergencyContacts} from "../../../hooks/emergencyContact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showMessage, hideMessage} from "react-native-flash-message";

const EmailItem = ({email, name, id, deletedToast}) => {
  const deleteMutation = useDeleteEmergencyContact();

  const fetchEmail = useEmergencyContacts({
    type: "email",
  });

  return (
    <View style={styles.emailItemContainer}>
      <CustomText content={name} fontSize={18} />
      <View style={styles.nameAndEmail}>
        <View style={styles.emailIconText}>
          <IconMaterialIcons
            name="email"
            size={30}
            color={colors.primary}
            style={{marginRight: 5}}
          />
          <CustomText content={email} />
        </View>
        <IconMaterialIcons
          name={"cancel"}
          color={colors.red}
          size={25}
          onPress={() => {
            deleteMutation.mutate(id);

            if (deleteMutation.isSuccess) {
              const addEmergencyContacts = async () => {
                let emergencyConts = await AsyncStorage.getItem(
                  "@emergencyContacts",
                );
                var storeToAsyncStorage = JSON.parse(emergencyConts);

                if (fetchEmail.isSuccess && fetchEmail.data) {
                  const phoneNumbers = fetchEmail.data.data.emergencyContact;
                  storeToAsyncStorage = [
                    ...storeToAsyncStorage,
                    ...phoneNumbers,
                  ];
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
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emailItemContainer: {
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,

    marginTop: 12,

    padding: 10,
  },
  nameAndEmail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emailIconText: {
    flexDirection: "row",
  },
});

export {EmailItem};

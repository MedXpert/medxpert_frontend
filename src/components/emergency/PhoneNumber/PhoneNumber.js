import {View, StyleSheet} from "react-native";
import React from "react";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDeleteEmergencyContact } from "../../../hooks/emergencyContact/useDeleteEmergencyContact";
import colors from "../../../constants/colors";
import {CustomText} from "../../general/CustomText";

const PhoneNumber = ({phoneNumber, name, id, deletedToast}) => {

  const deleteMutation = useDeleteEmergencyContact();

  return (
    <View style={[styles.phoneNumberContainer]}>
      <View style={{marginBottom: 10, marginLeft: 10  }}>
        <CustomText content={name} fontSize={18}/>
      </View>
      <View style={styles. nameAndNumber}>
        <View style={styles.phoneIconAndNumber}>
          <View style={styles.phoneNumberIcon}>
            <IconFontAwesome name={"phone"} color={colors.primary} size={30} />
          </View>
          <CustomText content={phoneNumber} />
        </View>
        <IconMaterialIcons name={"cancel"} color={colors.red} size={25} onPress={()=> {
          deleteMutation.mutate(id);
          deletedToast();
        }} />
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
  nameAndNumber:{
    flexDirection: "row",
    justifyContent: "space-between"
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

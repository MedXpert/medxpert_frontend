import {View, Text, StyleSheet, Switch, ScrollView} from "react-native";
import React, {useState} from "react";

import {BackButton} from "../../../components/general/BackButton";
import {CustomText} from "../../../components/general/CustomText";
import colors from "../../../constants/colors";
import {ToggleAutomation} from "../../../components/emergency/ToggleAutomation";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import {EmailItem} from "../../../components/emergency/EmailItem";
import {AddEmergencyContactModal} from "../../../components/emergency/AddEmergencyContactModal";

const AutomationEmail = ({navigation}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{marginLeft: -10}}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      {/* SMS toggle section */} 
      <AddEmergencyContactModal
        modalText={
          "Please enter an email to add it to emergency contacts list."
        }
        modalVisible={modalVisibility}
        onRequestClose={() => {}}
        onPressLeftButton={() => {
          setModalVisibility(false);
        }}
        onPressRightButton={() => {}}
        placeholder={"Email"}
      />
      {/* phone numbers section */}
      <View style={styles.emailsContainer}>
        {/* add phone number */}
        <View style={[styles.listEmail, styles.addEmail]}>
          <IconMaterialIcons name="email" color={colors.primary} size={30} />
          <CustomText content={"Add Email"} fontSize={15} />
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
        <View style={styles.listOfEmails}>
          <View>
            <CustomText content={"Added Emails"} fontSize={15} />
          </View>
          <ScrollView>
            {/* phone number component */}
            <View style={{marginBottom: 60}}>
              <EmailItem email={"someemail@somesite.com"} />
              <EmailItem email={"someemail@somesite.com"} />
              <EmailItem email={"someemail@somesite.com"} />
              <EmailItem email={"someemail@somesite.com"} />
              <EmailItem email={"someemail@somesite.com"} />
            </View>
          </ScrollView>
        </View>
      </View>
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

  emailsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  listEmail: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  addEmail: {
    borderRadius: 5,
    borderWidth: 0.5,
  },
  email: {
    marginTop: 12,
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },

  listOfEmails: {
    marginTop: 35,
  },

  phoneIconAndNumber: {
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
  },
});

export default AutomationEmail;

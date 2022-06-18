import {View, Modal, StyleSheet, Dimensions, TextInput} from "react-native";
import React from "react";

import {useForm} from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CustomText} from "../../general/CustomText/CustomText";
import colors from "../../../constants/colors";
import {CustomTextInput} from "../../general/CustomTextInput";
import {CustomButton} from "../../general/CustomButton";
import {useCreateEmergencyContact} from "../../../hooks/emergencyContact/useCreateEmergencyContact";
import {CustomTextInputValidation} from "../../general/CustomTextInputValidation";
import {emailRegEx} from "../../../constants/regEx";
import {useEmergencyContacts} from "../../../hooks/emergencyContact";

const dimensionWidth = Dimensions.get("window").width;
const dimensionHeight = Dimensions.get("window").height;

function AddEmergencyEmailModal({
  modalVisible,
  onRequestClose,
  modalText,
  placeholder,
  onPressLeftButton,
  onPressRightButton,
}) {
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const addEmail = useCreateEmergencyContact();

  const fetchEmail = useEmergencyContacts({
    type: "email",
  });

  const onAdd = async data => {
    const email = {
      name: data.name,
      email: data.email,
    };
    addEmail.mutate({...email});
    reset();

    const addEmergencyContacts = async () => {
      let emergencyConts = await AsyncStorage.getItem("@emergencyContacts");
      var storeToAsyncStorage = JSON.parse(emergencyConts);
      if (fetchEmail.isSuccess && fetchEmail.data) {
        const emails = fetchEmail.data.data.emergencyContact;
        // console.log("email", emails);
        storeToAsyncStorage = [...storeToAsyncStorage, ...emails];
      }
      // if (fetchPhone.isSuccess && fetchPhone.data) {
      //   const phoneNumbers = fetchPhone.data.data.emergencyContact;
      //   storeToAsyncStorage = [...storeToAsyncStorage, ...phoneNumbers];
      // }
      await AsyncStorage.setItem(
        "@emergencyContacts",
        JSON.stringify(storeToAsyncStorage),
      );
    };
    addEmergencyContacts();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.innerFirst}>
        <View style={styles.innerSecond}>
          {/* Modal text */}
          <CustomText content={modalText} fontSize={14} />
          {/* Input text */}
          <CustomTextInputValidation
            customStyles={styles.inputs}
            label="Name"
            control={control}
            name="name"
            error={errors.name?.message}
            rules={{
              required: {
                value: true,
                message: "Name is required.",
              },
            }}
          />

          <CustomTextInputValidation
            customStyles={styles.inputs}
            label="Email"
            control={control}
            name="email"
            error={errors.email?.message}
            rules={{
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value: emailRegEx,
                message: "Please enter a valid email address",
              },
            }}
          />
          {addEmail.isError ? (
            <CustomText content={addEmail.error.message} />
          ) : null}
          {/* Modal buttons */}
          <View style={styles.modalButtons}>
            <CustomButton
              customStyle={{marginRight: 10}}
              backgroundColor={colors.lightGray}
              title="Cancel"
              height={40}
              fontSize={14}
              disabled={!!addEmail.isLoading}
              onPress={onPressLeftButton}
            />
            <CustomButton
              backgroundColor={colors.primary}
              title="Add"
              height={40}
              fontSize={14}
              disabled={!!addEmail.isLoading}
              onPress={handleSubmit(onAdd)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  innerFirst: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerSecond: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 400,
    margin: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: colors.secondary,
    color: colors.dark,
    padding: 10,
    // borderRadius: 10,
    elevation: 1,
    height: 55,
    marginTop: 25,
    width: dimensionWidth - 70,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
    width: "100%",
  },
  inputs: {
    width: 330,
    height: 60,
    backgroundColor: colors.secondary,
  },
});

export {AddEmergencyEmailModal};

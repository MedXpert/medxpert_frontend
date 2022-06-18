import {View, Modal, StyleSheet, Dimensions, TextInput} from "react-native";
import React from "react";

import {CustomText} from "../../general/CustomText/CustomText";
import colors from "../../../constants/colors";
import {CustomTextInput} from "../../general/CustomTextInput";
import {CustomButton} from "../../general/CustomButton";
import { useForm } from "react-hook-form";
import {useCreateEmergencyContact} from "../../../hooks/emergencyContact/useCreateEmergencyContact";

const dimensionWidth = Dimensions.get("window").width;
const dimensionHeight = Dimensions.get("window").height;

const AddEmergencyEmailModal = ({
  
  modalVisible,
  onRequestClose,
  modalText,
  placeholder,
  onPressLeftButton,
  onPressRightButton,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "", 
    }
  });

  const addPhone = useCreateEmergencyContact();

  const onAdd = (data) => {
    addPhone.mutate({
      name: data.name,
      phone_number: data.phoneNumber
    });
  };
  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onRequestClose}
      style={{backgroundColor: "red"}}>
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
            error={errors.name.message ? errors.name.message :  null}
            rules={{
              required: {
                value: true,
                message: "Name is required.",
              },
            }}
          />
          
          <CustomTextInputValidation
            customStyles={styles.inputs}
            label="Phone number"
            control={control}
            name="phoneNumber"
            error={errors.phoneNumber.message ? errors.phoneNumber.message : null}
            rules={{
              required: {
                value: true,
                message: "Phone number is required.",
              },
            }}
          />
          {/* Modal buttons */}
          <View style={styles.modalButtons}>
            <CustomButton
              customStyle={{marginRight: 10}}
              backgroundColor={colors.lightGray}
              title={"Cancel"}
              height={40}
              fontSize={14}
              disabled = {
                addPhone.isLoading ? true : false
              }
              onPress={onPressLeftButton}
            />
            <CustomButton
              backgroundColor={colors.primary}
              title={"Add"}
              height={40}
              fontSize={14}
              disabled ={addPhone.isLoading ? true : false}
              onPress={handleSubmit(onAdd)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    height: 250,
    margin: 10,
    padding: 20,
    alignContent: "center",
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
  },
});

export {AddEmergencyEmailModal};

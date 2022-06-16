import {
  View,
  Text,
  StyleSheet,
  Modal,
  BackHandler,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../../../constants/colors";
import {CustomButton} from "../../../components/general/CustomButton";
import {CustomText} from "../../../components/general/CustomText";

const PermissionModal = ({
  modalVisibility,
  TextContent,
  buttonFontSize = 14,
  buttonWidth = 130,
  buttonHeight = 45,
  buttonLeftTitle,
  buttonRightTitle,
  buttonLeftOnPress,
  buttonOnRightOnPress,
  height,
  onRequestClose = () => {
    BackHandler.exitApp();
  },
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisibility}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <View style={[styles.innerModal, {height: height}]}>
          <View>
            <CustomText content={TextContent} />
          </View>
          <View style={styles.buttonsContainer}>
            <CustomButton
              fontSize={buttonFontSize}
              width={buttonWidth}
              height={buttonHeight}
              title={buttonLeftTitle}
              onPress={buttonLeftOnPress}
            />
            <CustomButton
              fontSize={buttonFontSize}
              width={buttonWidth}
              height={buttonHeight}
              title={buttonRightTitle}
              onPress={buttonOnRightOnPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  modalView: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerModal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 170,
    margin: 20,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export {PermissionModal};

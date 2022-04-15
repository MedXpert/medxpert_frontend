import {
  View,
  Text,
  StyleSheet,
  Modal,
  BackHandler,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/colors';
import {CustomButton} from '../../../components/general/CustomButton';
import {CustomText} from '../../../components/general/CustomText';

const PermissionModal = ({
  modalVisibility,
  TextContent,
  buttonFontSize = 14,
  buttonWidth = 140,
  buttonHeight = 45,
  buttonLeftTitle,
  buttonRightTitle,
  buttonLeftOnPress,
  buttonOnRightOnPress,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisibility}
      onRequestClose={() => {
        BackHandler.exitApp();
      }}>
      <View style={styles.modalView}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalView: {
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    marginTop: 300,
    paddingHorizontal: 15,
    borderRadius: 15,
    paddingVertical: 20,

    width: Dimensions.get('window').width - 50,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export {PermissionModal};

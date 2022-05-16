import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../CustomText';
import colors from '../../../constants/colors';
import {CustomButton} from '../CustomButton';

const CustomModal = ({
  visibility,
  modalTitle,
  modalTitleFontSize = 17,
  modalTitleFontWeight = '900',
  modalContent,
  leftButtonTitle,
  rightButtonTitle,
  leftButtonHeight = 35,
  leftButtonFontSize = 14,
  leftButtonBackgroundColor = colors.lightGray,
  rightButtonHeight = 35,
  rightButtonFontSize = 14,
  rightButtonBackgroundColor = colors.primary,
  onPressRightButton,
  onPressLeftButton,
  otherVariables,
}) => {
  return (
    <Modal transparent visible={visibility} animationType={'fade'}>
      <View style={styles.modalStyle}>
        <View style={styles.innerModal}>
          <CustomText
            content={modalTitle}
            fontSize={modalTitleFontSize}
            fontWeight={modalTitleFontWeight}
            customStyles={styles.modalTitle}
          />
          <CustomText
            content={modalContent}
            customStyles={styles.modalContent}
          />
          <View style={styles.modalButtons}>
            <CustomButton
              customStyle={{marginRight: 10}}
              backgroundColor={leftButtonBackgroundColor}
              title={leftButtonTitle}
              height={leftButtonHeight}
              fontSize={leftButtonFontSize}
              onPress={onPressLeftButton}
            />
            <CustomButton
              backgroundColor={rightButtonBackgroundColor}
              title={rightButtonTitle}
              height={rightButtonHeight}
              fontSize={rightButtonFontSize}
              onPress={onPressRightButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 170,
    margin: 20,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
  },
  modalTitle: {alignSelf: 'flex-start'},
  modalContent: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});

export {CustomModal};

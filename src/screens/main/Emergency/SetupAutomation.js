import {View, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {CustomText} from '../../components/general/CustomText';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../../constants/colors';

const Emergency = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <View style={StyleSheet.container}>
      <View style={styles.paddingHr25}>
        <CustomText
          fontWeight="bold"
          content="Choose contact method incase of emergency"
          fontColor={colors.gray}
          customStyles={styles.textSpacing}
        />
        <CustomText
          fontWeight="bold"
          content="Choose options"
          fontSize={35}
          customStyles={styles.textSpacing}
        />
        {/* selected buttons  */}
        <View style={styles.padding20}>
          <View style={styles.alignRow}>
            <CustomButton
              title="sms"
              backgroundColor={colors.primary}
              fontColor={colors.white}
              fontWeight="bold"
              width="23%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Ambulance"
              backgroundColor={colors.primary}
              fontColor={colors.white}
              fontWeight="bold"
              width="45%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Email"
              backgroundColor={colors.white}
              fontColor={colors.dark}
              fontWeight="bold"
              width="23%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Facebook"
              backgroundColor={colors.white}
              fontColor={colors.dark}
              fontWeight="bold"
              width="45%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Telegram"
              backgroundColor={colors.white}
              fontColor={colors.dark}
              fontWeight="bold"
              width="45%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Instagram"
              backgroundColor={colors.white}
              fontColor={colors.dark}
              fontWeight="bold"
              width="45%"
              height={40}
              customStyle={styles.selectButton}
            />
            <CustomButton
              title="Whatsapp"
              backgroundColor={colors.white}
              fontColor={colors.dark}
              fontWeight="bold"
              width="45%"
              height={40}
              customStyle={styles.selectButton}
            />
          </View>
          <View style={styles.textSpacingBig}>
            <customText
              fontWeight="bold"
              content="Setup the automation to fit your need "
              fontColor={colors.gray}
              customStyle={styles.textSpacing}
            />
            <customText
              fontWeight="bold"
              content="Configure Automation"
              fontSize={40}
              customStyle={styles.textSpacing}
            />
          </View>

          
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  selectButton: {},
  alignRow: {},
  paddingHr25: {},
  padding20: {},
  textSpacing: {},
  textSpacingBig: {},
  padding15: {},
  timeBox: {},
  switchBox: {},
  previousButton: {},
  customText: {},
  sequence: {},
  sequenceText: {},
});

export default Emergency;

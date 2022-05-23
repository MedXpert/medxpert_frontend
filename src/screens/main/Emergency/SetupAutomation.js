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
            <CustomText
              fontWeight="bold"
              content="Setup the automation to fit your need "
              fontColor={colors.gray}
              customStyle={styles.textSpacing}
            />
            <CustomText
              fontWeight="bold"
              content="Configure Automation"
              fontSize={40}
              customStyle={styles.textSpacing}
            />
          </View>
        </View>
        <View style={[styles.alignRow, styles.padding15]}>
          <CustomText
            content="Emergency Sequence duration "
            fontSize={18}
            customStyle={styles.sequence}
          />
          <View style={styles.timeBox}>
            <CustomTextInput customStyle={styles.customText} />
            <CustomText
              content="sec"
              fontSize={15}
              customStyle={styles.sequenceText}
            />
          </View>
        </View>

        <View style={[styles.alignRow, styles.padding15]}>
          <CustomText
            content="Make emergency sound"
            fontSize={18}
            customStyles={styles.emergency}
          />
          <View style={styles.switchBox}>
            <Switch
              trackColor={{false: colors.lightGray, true: colors.primary}}
              thumbColor={isEnabled ? colors.white : colors.whiteSmoke}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
      {/* previous and next button */}
      <View style={styles.alignRow}>
        <CustomButton
          title="Previous"
          backgroundColor={colors.primary}
          fontColor={colors.white}
          fontSize={18}
          customStyle={styles.previousButton}
        />
        <CustomButton
          title="Next"
          backgroundColor={colors.whiteSmoke}
          fontSize={18}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  selectButton: {
    borderRadius: 40,
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paddingHr25: {paddingHorizontal: 25},
  padding20: {paddingVertical: 20},
  textSpacing: {paddingTop: 10},
  textSpacingBig: {paddingTop: 25},
  padding15: {paddingVertical: 15},
  timeBox: {
    width: '30%',
    height: 40,
    borderRadius: 5,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  switchBox: {
    width: '30%',
    height: 40,
    alignContent: 'center',
  },
  previousButton: {
    width: 150,
    height: 55,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0,
  },
  customText: {width: '50'},
  sequence: {width: '60%'},
  sequenceText: {paddingTop: 6},
  emergency: {width: '70%'},
});

export default Emergency;

import {View, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {CustomText} from '../../components/general/CustomText';
import {ToggleFeatures} from '../../components/emergency/ToggleFeatures';
import {ToggleAutomation} from '../../components/emergency/ToggleAutomation';
import colors from '../../constants/colors';

const Emergency = () => {
  const [automationToggle, setAutomationToggle] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);
  const [phoneToggle, setPhoneToggle] = useState(false);
  const [fallDetectionToggle, setFallDetectionToggle] = useState(false);
  const [ambulanceService, setAmbulanceService] = useState(false);

  const onAutomationChange = () => {
    setAutomationToggle(previousValue => !previousValue);
  };

  const onSmsToggleChange = () => {
    setSmsToggle(previousValue => !previousValue);
  };

  const onPhoneToggleChange = () => {
    setPhoneToggle(previousValue => !previousValue);
  };

  const onFallDetectionToggleChange = () => {
    setFallDetectionToggle(previousValue => !previousValue);
  };

  const onAmbulanceToggleChange = () => {
    setAmbulanceService(previousValue => !previousValue);
  };

  return (
    <View style={styles.container}>
      {/* Emergency automation title and toggle */}
      <View style={styles.emergencyAutomation}>
        <View>
          <CustomText content={'Emergency automation'} fontSize={18} />
          <CustomText
            content={'Set automation for emergency purposes.'}
            fontSize={12}
          />
        </View>
        <View>
          <Switch
            trackColor={{false: colors.lightGray, true: colors.primary}}
            thumbColor={automationToggle ? colors.white : colors.gray}
            onValueChange={onAutomationChange}
            value={automationToggle}
          />
        </View>
      </View>

      {/* automation configs */}
      <View style={styles.configAutomation}>
        {/* Fall detection  */}
        <View style={styles.fallDetection}>
          {/* Toggle Fall detection */}
          <ToggleFeatures
            largeText={'Fall Detection'}
            smallText={'Send notifications when a possible fall is detected.'}
            borderRadius={{
              borderRadius: 30,
              borderBottomEndRadius: fallDetectionToggle ? 0 : 30,
            }}
            toggleFeature={fallDetectionToggle}
            onToggleChange={onFallDetectionToggleChange}
          />
          {/* configure where where to send emergency notice when possible fall is detected */}
          {fallDetectionToggle && (
            <View style={styles.fallDetectionSendTo}>
              {/* SMS toggle */}
              <View style={[styles.sendToSection, {borderBottomEndRadius: 0}]}>
                <CustomText content={'SMS'} />
                <Switch
                  trackColor={{false: colors.lightGray, true: colors.primary}}
                  thumbColor={smsToggle ? colors.white : colors.gray}
                  onValueChange={onSmsToggleChange}
                  value={smsToggle}
                />
              </View>
              {/* Phone toggle  */}
              <View style={styles.sendToSection}>
                <CustomText content={'phone'} />
                <Switch
                  trackColor={{false: colors.lightGray, true: colors.primary}}
                  thumbColor={phoneToggle ? colors.white : colors.gray}
                  onValueChange={onPhoneToggleChange}
                  value={phoneToggle}
                />
              </View>
              <View />
            </View>
          )}
          {/* Ambulance service */}
          <ToggleFeatures
            largeText={'Ambulance Service'}
            smallText={
              'An ambulance service for faster access to health care facilities, specially in emergency cases.'
            }
            toggleFeature={ambulanceService}
            onToggleChange={onAmbulanceToggleChange}
          />
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
    paddingTop: 20,
  },
  emergencyAutomation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  configAutomation: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  sendToSection: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    marginLeft: 50,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 30,
    elevation: 0.5,
  },
  fallDetectionSendTo: {},
});

export default Emergency;

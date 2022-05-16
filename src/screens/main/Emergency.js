import {View, Switch, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';

import {CustomText} from '../../components/general/CustomText';
import {ToggleFeatures} from '../../components/emergency/ToggleFeatures';
import {ToggleAutomation} from '../../components/emergency/ToggleAutomation';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';

const Emergency = ({navigation}) => {
  const [automationToggle, setAutomationToggle] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);
  const [EmailToggle, setEmailToggle] = useState(false);
  const [fallDetectionToggle, setFallDetectionToggle] = useState(false);
  const [ambulanceService, setAmbulanceService] = useState(false);

  const onAutomationChange = () => {
    setAutomationToggle(previousValue => !previousValue);
  };

  const onSmsToggleChange = () => {
    setSmsToggle(previousValue => !previousValue);
  };

  const onEmailToggleChange = () => {
    setEmailToggle(previousValue => !previousValue);
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
      <ScrollView style={styles.configAutomation}>
        <View style={{marginBottom: 10}}>
          {/* Fall detection  */}
          <View style={styles.fallDetection}>
            {/* Toggle Fall detection */}
            <ToggleFeatures
              disabled={automationToggle}
              largeText={'Fall Detection'}
              largeTextFontColor={
                fallDetectionToggle ? colors.primary : colors.gray
              }
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
                {/* SMS toggle and Pressable */}
                <Pressable
                  onPress={() => {
                    navigation.navigate('AutomationSms');
                  }}>
                  <View
                    style={[styles.sendToSection, {borderBottomEndRadius: 0}]}>
                    <View style={styles.smsTxtIcon}>
                      <IconMaterialIcons
                        name="sms"
                        color={colors.primary}
                        style={[
                          styles.smsAndEmailIcons,
                          {
                            color: smsToggle ? colors.primary : colors.gray,
                          },
                        ]}
                        size={20}
                      />
                      <CustomText content={'SMS'} />
                    </View>
                    <Switch
                      trackColor={{
                        false: colors.lightGray,
                        true: colors.primary,
                      }}
                      thumbColor={smsToggle ? colors.white : colors.gray}
                      onValueChange={onSmsToggleChange}
                      value={smsToggle}
                    />
                  </View>
                </Pressable>
                {/* Email toggle  and Pressable*/}
                <Pressable
                  onPress={() => {
                    navigation.navigate('AutomationEmail');
                  }}>
                  <View style={styles.sendToSection}>
                    <View style={styles.emailTxtIcon}>
                      <IconMaterialIcons
                        name="email"
                        color={colors.primary}
                        style={[
                          styles.smsAndEmailIcons,
                          {
                            color: EmailToggle ? colors.primary : colors.gray,
                          },
                        ]}
                        size={20}
                      />
                      <CustomText content={'email'} />
                    </View>
                    <Switch
                      trackColor={{
                        false: colors.lightGray,
                        true: colors.primary,
                      }}
                      thumbColor={EmailToggle ? colors.white : colors.gray}
                      onValueChange={onEmailToggleChange}
                      value={EmailToggle}
                    />
                  </View>
                </Pressable>
                <View />
              </View>
            )}
          </View>
          {/* Ambulance service */}
          <ToggleFeatures
            largeText={'Ambulance Service'}
            largeTextFontColor={ambulanceService ? colors.primary : colors.gray}
            smallText={
              'An ambulance service for faster access to health care facilities, specially in emergency cases.'
            }
            toggleFeature={ambulanceService}
            onToggleChange={onAmbulanceToggleChange}
          />
        </View>
      </ScrollView>
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
  smsTxtIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailTxtIcon: {
    flexDirection: 'row',
  },
  smsAndEmailIcons: {marginRight: 10},
});

export default Emergency;

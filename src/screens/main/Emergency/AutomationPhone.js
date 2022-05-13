import {View, Text, StyleSheet, Switch, ScrollView} from 'react-native';
import React, {useState} from 'react';

import {BackButton} from '../../../components/general/BackButton';
import {CustomText} from '../../../components/general/CustomText';
import colors from '../../../constants/colors';
import ToggleAutomation from '../../../components/emergency/ToggleAutomation/ToggleAutomation';
import PhoneNumber from '../../../components/emergency/PhoneNumber/PhoneNumber';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AutomationPhone = ({navigation}) => {
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
      <ToggleAutomation text={'SMS'} />
      {/* phone numbers section */}
      <View style={styles.phoneNumbersContainer}>
        {/* add phone number */}
        <View style={[styles.listPhoneNumber, styles.addPhoneNumber]}>
          <IconFontAwesome name={'phone'} color={colors.primary} size={30} />
          <CustomText content={'Add phone number'} fontSize={15} />
          <IconEntypo
            name={'plus'}
            color={colors.primary}
            size={30}
            style={styles.phonePlusIcon}
          />
        </View>
        {/* List of added phone numbers */}
        <View style={styles.listOfPhoneNumbers}>
          <View>
            <CustomText content={'List of phone numbers'} fontSize={15} />
          </View>
          <ScrollView>
            {/* phone number component */}
            <View style={{marginBottom: 60}}>
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
              <PhoneNumber phoneNumber={'092132342'} />
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
    paddingHorizontal: 20,
  },

  phoneNumbersContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 35,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  listPhoneNumber: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  addPhoneNumber: {
    borderRadius: 5,
    borderWidth: 0.5,
  },
  phoneNumber: {
    marginTop: 12,
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },

  listOfPhoneNumbers: {
    marginTop: 35,
  },

  phoneIconAndNumber: {
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
  },
});

export default AutomationPhone;

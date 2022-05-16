import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CustomText} from '../../../components/general/CustomText';
import {CustomButton} from '../../../components/general/CustomButton';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors';

export default function App() {
    return (
      <View style={styles.container}>
        <View>
          <CustomText
            content="Click The turn on button to continue"
            fontSize={17}
            customStyles={styles.headerText}
          />
          <CustomText
            content="Emergency alert for fall detection"
            fontSize={40}
            customStyles={styles.headerText2}
          />
        </View>
        <View>
          <View style={styles.icon1}>
            <IconM name="hospital-building" color={colors.primary} size={170} />
          </View>
          <View style={styles.icon2}>
            <IconM name="run" color={colors.primary} size={130} />
          </View>
          <View style={styles.icon3}>
            <IconM name="ambulance" color="#049CE3" size={98} />
          </View>
        </View>
        <View>
  


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
        <CustomButton
          customStyle={styles.turnOnButton}
          title="Turn on"
          fontSize={20}
          fontColor={colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      shadowColor: 'black',
      flex: 3,
      alignItems: 'flex-start',
      marginLeft: 25,
      marginRight: 25,
      marginTop: 25,
      zIndex: 10,
    },
    headerText: {marginTop: 30, fontSize: 17},
    headerText2: {fontSize: 40},
    icon1: {marginTop: 50, paddingLeft: 160},
    icon2: {paddingLeft: 35, marginTop: -115},
    icon3: {paddingLeft: 130, marginTop: -30},
    turnOnButton: {
      width: 300,
      borderRadius: 20,
      marginTop: 100,
      marginLeft: 40,
    },
  });
    


import {View, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CustomText} from '../../components/general/CustomText';
import {PageIndicator} from '../../components/welcome/PageIndicator';
import Colors from '../../constants/colors';
import LocateSvg from '../../assets/svg/welcome/alarm.svg';
import {Button} from '../../components/welcome/Button';
import {WELCOME3_STRINGS} from '../../constants/string/welcome';
import {WelcomeContext} from '../../components/general/Context';

const Welcome1 = ({navigation}) => {
  const {setOpeningForTheFirstTimeValue} = useContext(WelcomeContext);
  // Set the value of the value of OpeningForTheFirstTime to 'false' in the asyncStorage.
  const storeOpeningForTheFirstTimeValue = async () => {
    try {
      await AsyncStorage.setItem('@OpeningForTheFirstTime', 'false');
    } catch (e) {
      // saving error
      console.warn('OpeningForTheFirstTime store error:  ', e);
    }
    await setOpeningForTheFirstTimeValue();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <PageIndicator selectedPage={3} />
        <View style={styles.textTop}>
          <CustomText
            content={WELCOME3_STRINGS.BRIEF_DESCRIPTION}
            fontSize={14}
            fontColor={'grey'}
          />
          <CustomText
            content={WELCOME3_STRINGS.TITLE}
            fontSize={32}
            fontFamily={'Poppins-Bold'}
          />
        </View>
        <View style={styles.alarmSvgContainer}>
          <LocateSvg width={500} height={500} />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button
          customStyle={styles.buttonCustomStyle}
          onPress={storeOpeningForTheFirstTimeValue}
          title={'Get Started'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  buttonCustomStyle: {
    borderRadius: 30,
    width: 300,
  },
  containerTop: {
    padding: 20,
  },
  textTop: {
    marginTop: 10,
  },
  alarmSvgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Welcome1;

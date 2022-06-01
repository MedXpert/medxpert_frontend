import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';
import {PageIndicator} from '../../components/welcome/PageIndicator';
import Colors from '../../constants/colors';
import LocateSvg from '../../assets/svg/welcome/setting.svg';
import {Button} from '../../components/welcome/Button';
import {WELCOME2_STRINGS} from '../../constants/string/welcome';

const Welcome1 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <PageIndicator selectedPage={2} />
        <View style={styles.textTop}>
          <CustomText
            content={WELCOME2_STRINGS.BRIEF_DESCRIPTION}
            fontSize={14}
            fontColor={'grey'}
          />
          <CustomText
            content={WELCOME2_STRINGS.TITLE}
            fontSize={32}
            fontFamily={'Poppins-Bold'}
          />
        </View>
        <View style={styles.SettingSvgContainer}>
          <LocateSvg width={500} height={500} />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button
          onPress={() => {
            navigation.navigate('Welcome3');
          }}
          title={'Next'}
        />
        <Button onPress={() => {}} backgroundVisible={false} title={'Skip'} />
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
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  containerTop: {
    padding: 20,
  },
  textTop: {
    marginTop: 10,
  },
  SettingSvgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Welcome1;
